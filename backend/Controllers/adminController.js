const { randomUUID } = require("crypto");
const bcrypt = require("bcryptjs");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/CatchAsync");
const pool = require("../config/db");

const sections = new Set([
  "about",
  "careers",
  "clients",
  "company",
  "contact",
  "equipmentCategories",
  "homepage",
  "jobs",
  "media",
  "methodology",
  "newsArticles",
  "pages",
  "projects",
  "services",
  "settings",
  "sustainability",
  "teamMembers",
  "upcomingProjects",
  "values",
  "workforce",
]);

function requireSection(section) {
  if (!sections.has(section))
    throw new AppError("Unknown content section.", 404);
  return section;
}

function parseContent(value) {
  try {
    return JSON.parse(value);
  } catch (_) {
    throw new AppError("Stored content is invalid.", 500);
  }
}

async function readSections() {
  const [rows] = await pool.execute(
    "SELECT section_key, content FROM website_content",
  );
  return Object.fromEntries(
    rows.map((row) => [row.section_key, parseContent(row.content)]),
  );
}

exports.getPublicContent = catchAsync(async (_req, res) => {
  res
    .status(200)
    .json({ status: "success", data: { content: await readSections() } });
});

exports.getContent = catchAsync(async (_req, res) => {
  res
    .status(200)
    .json({ status: "success", data: { content: await readSections() } });
});

exports.replaceContent = catchAsync(async (req, res, next) => {
  const content = req.body?.content;
  if (!content || typeof content !== "object" || Array.isArray(content)) {
    return next(
      new AppError("Content must be an object keyed by section.", 400),
    );
  }
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    for (const [key, value] of Object.entries(content)) {
      requireSection(key);
      await connection.execute(
        `INSERT INTO website_content (section_key, content, updated_by)
         VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE content = VALUES(content), updated_by = VALUES(updated_by)`,
        [key, JSON.stringify(value), String(req.user.id)],
      );
    }
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  res
    .status(200)
    .json({ status: "success", data: { content: await readSections() } });
});

exports.resetContent = catchAsync(async (_req, res) => {
  await pool.execute("DELETE FROM website_content");
  res.status(200).json({ status: "success" });
});

exports.getSection = catchAsync(async (req, res) => {
  const section = requireSection(req.params.section);
  const [
    rows,
  ] = await pool.execute(
    "SELECT content FROM website_content WHERE section_key = ?",
    [section],
  );
  res.status(200).json({
    status: "success",
    data: { content: rows.length ? parseContent(rows[0].content) : null },
  });
});

exports.saveSection = catchAsync(async (req, res, next) => {
  const section = requireSection(req.params.section);
  const value = req.body?.content;
  if (value === undefined)
    return next(new AppError("Content is required.", 400));
  await pool.execute(
    `INSERT INTO website_content (section_key, content, updated_by)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE content = VALUES(content), updated_by = VALUES(updated_by)`,
    [section, JSON.stringify(value), String(req.user.id)],
  );
  res.status(200).json({ status: "success", data: { content: value } });
});

exports.addItem = catchAsync(async (req, res, next) => {
  const section = requireSection(req.params.section);
  const item = req.body?.item || req.body;
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return next(new AppError("A content item is required.", 400));
  }
  const [
    rows,
  ] = await pool.execute(
    "SELECT content FROM website_content WHERE section_key = ?",
    [section],
  );
  const list = rows.length ? parseContent(rows[0].content) : [];
  if (!Array.isArray(list))
    return next(new AppError("This section is not a list.", 409));
  const created = { ...item, id: item.id || randomUUID() };
  list.push(created);
  await pool.execute(
    `INSERT INTO website_content (section_key, content, updated_by)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE content = VALUES(content), updated_by = VALUES(updated_by)`,
    [section, JSON.stringify(list), String(req.user.id)],
  );
  res
    .status(201)
    .json({ status: "success", data: { item: created, content: list } });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const section = requireSection(req.params.section);
  const [
    rows,
  ] = await pool.execute(
    "SELECT content FROM website_content WHERE section_key = ?",
    [section],
  );
  const list = rows.length ? parseContent(rows[0].content) : [];
  if (!Array.isArray(list))
    return next(new AppError("This section is not a list.", 409));
  const index = list.findIndex((item) => String(item.id) === req.params.id);
  if (index < 0) return next(new AppError("Content item not found.", 404));
  list[index] = {
    ...list[index],
    ...(req.body?.item || req.body),
    id: list[index].id,
  };
  await pool.execute(
    "UPDATE website_content SET content = ?, updated_by = ? WHERE section_key = ?",
    [JSON.stringify(list), String(req.user.id), section],
  );
  res
    .status(200)
    .json({ status: "success", data: { item: list[index], content: list } });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const section = requireSection(req.params.section);
  const [
    rows,
  ] = await pool.execute(
    "SELECT content FROM website_content WHERE section_key = ?",
    [section],
  );
  const list = rows.length ? parseContent(rows[0].content) : [];
  if (!Array.isArray(list))
    return next(new AppError("This section is not a list.", 409));
  const remaining = list.filter((item) => String(item.id) !== req.params.id);
  if (remaining.length === list.length)
    return next(new AppError("Content item not found.", 404));
  await pool.execute(
    "UPDATE website_content SET content = ?, updated_by = ? WHERE section_key = ?",
    [JSON.stringify(remaining), String(req.user.id), section],
  );
  res.status(200).json({ status: "success", data: { content: remaining } });
});

exports.listUsers = catchAsync(async (_req, res) => {
  const [users] = await pool.execute(
    "SELECT id, name, email, role, is_active, is_super_admin FROM users ORDER BY id DESC",
  );
  res.status(200).json({ status: "success", data: { users } });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body || {};
  if (
    !name?.trim() ||
    !email?.trim() ||
    typeof password !== "string" ||
    password.length < 12
  ) {
    return next(
      new AppError(
        "Name, email, and a password of at least 12 characters are required.",
        400,
      ),
    );
  }
  const normalizedEmail = email.trim().toLowerCase();
  const [
    existing,
  ] = await pool.execute("SELECT id FROM users WHERE LOWER(email) = ?", [
    normalizedEmail,
  ]);
  if (existing.length)
    return next(
      new AppError("An account with this email already exists.", 409),
    );
  const hash = await bcrypt.hash(password, 12);
  const [
    result,
  ] = await pool.execute(
    "INSERT INTO users (name, email, role, password, is_active, is_super_admin) VALUES (?, ?, 'admin', ?, 1, 0)",
    [name.trim(), normalizedEmail, hash],
  );
  res.status(201).json({
    status: "success",
    data: {
      user: {
        id: result.insertId,
        name: name.trim(),
        email: normalizedEmail,
        role: "admin",
        is_active: 1,
        is_super_admin: 0,
      },
    },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const { name, email, is_active: isActive, password } = req.body || {};
  const [
    rows,
  ] = await pool.execute(
    "SELECT id, role, is_super_admin FROM users WHERE id = ?",
    [req.params.id],
  );
  if (!rows.length) return next(new AppError("Admin user not found.", 404));
  if (
    Number(rows[0].is_super_admin) === 1 &&
    (isActive === false || isActive === 0)
  ) {
    return next(
      new AppError("The primary administrator cannot be disabled.", 409),
    );
  }
  if (
    password !== undefined &&
    (typeof password !== "string" || password.length < 12)
  ) {
    return next(
      new AppError("A password must be at least 12 characters.", 400),
    );
  }
  const normalizedEmail = email?.trim().toLowerCase();
  if (normalizedEmail) {
    const [
      duplicates,
    ] = await pool.execute(
      "SELECT id FROM users WHERE LOWER(email) = ? AND id <> ?",
      [normalizedEmail, req.params.id],
    );
    if (duplicates.length)
      return next(
        new AppError("An account with this email already exists.", 409),
      );
  }
  if (rows[0].role === "admin" && (isActive === false || isActive === 0)) {
    const [[{ count }]] = await pool.execute(
      "SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND is_active = 1",
    );
    if (count <= 1)
      return next(
        new AppError("The last active administrator cannot be disabled.", 409),
      );
  }
  const fields = [];
  const values = [];
  if (name !== undefined) {
    fields.push("name = ?");
    values.push(String(name).trim());
  }
  if (normalizedEmail) {
    fields.push("email = ?");
    values.push(normalizedEmail);
  }
  if (isActive !== undefined) {
    fields.push("is_active = ?");
    values.push(isActive ? 1 : 0);
  }
  if (password) {
    fields.push("password = ?", "token_version = token_version + 1");
    values.push(await bcrypt.hash(password, 12));
  }
  if (!fields.length)
    return next(new AppError("No user changes were provided.", 400));
  values.push(req.params.id);
  await pool.execute(
    `UPDATE users SET ${fields.join(", ")} WHERE id = ?`,
    values,
  );
  const [
    [user],
  ] = await pool.execute(
    "SELECT id, name, email, role, is_active, is_super_admin FROM users WHERE id = ?",
    [req.params.id],
  );
  res.status(200).json({ status: "success", data: { user } });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  if (String(req.user.id) === String(req.params.id)) {
    return next(
      new AppError("You cannot delete your own administrator account.", 409),
    );
  }
  const [[{ count }]] = await pool.execute(
    "SELECT COUNT(*) AS count FROM users WHERE role = 'admin' AND is_active = 1",
  );
  const [
    users,
  ] = await pool.execute(
    "SELECT role, is_active, is_super_admin FROM users WHERE id = ?",
    [req.params.id],
  );
  if (!users.length) return next(new AppError("Admin user not found.", 404));
  if (Number(users[0].is_super_admin) === 1) {
    return next(
      new AppError("The primary administrator cannot be deleted.", 409),
    );
  }
  if (users[0].role === "admin" && users[0].is_active && count <= 1) {
    return next(
      new AppError("The last active administrator cannot be deleted.", 409),
    );
  }
  await pool.execute("DELETE FROM users WHERE id = ?", [req.params.id]);
  res.status(204).send();
});

exports.requireOwner = (req, res, next) => {
  if (Number(req.user?.is_super_admin) !== 1) {
    return next(
      new AppError(
        "Only the primary administrator can manage admin accounts.",
        403,
      ),
    );
  }
  next();
};

exports.uploadImage = (req, res, next) => {
  if (!req.file) return next(new AppError("Choose an image to upload.", 400));
  const publicBase = (
    process.env.PUBLIC_API_URL || `${req.protocol}://${req.get("host")}`
  )
    .replace(/\/api\/v1\/?$/i, "")
    .replace(/\/+$/, "");
  res.status(201).json({
    status: "success",
    data: {
      url: `${publicBase}/Uploads/${encodeURIComponent(req.file.filename)}`,
    },
  });
};
