// authController.js
const AppError = require("../utils/AppError");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/CatchAsync");
const pool = require("../config/db");
const bcrypt = require("bcryptjs");
const { createHash, randomBytes } = require("crypto");
const nodemailer = require("nodemailer");

// Helper: is the request coming from a local / LAN context? (plain HTTP,
// no TLS, so we must NOT use `Secure` cookies and should use `Lax` for
// `SameSite` so the cookie is sent on cross-origin requests from the LAN).
const isLocalOrigin = (origin) => {
  if (!origin) return true; // no Origin header (e.g. curl)
  if (origin.includes("localhost") || origin.includes("127.0.0.1")) return true;
  // RFC1918 IPv4 private ranges
  const m = origin.match(
    /https?:\/\/(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})/,
  );
  if (m) {
    const a = Number(m[1]);
    const b = Number(m[2]);
    if (a === 10) return true;
    if (a === 172 && b >= 16 && b <= 31) return true;
    if (a === 192 && b === 168) return true;
    if (a === 127) return true;
  }
  // IPv6 loopback / link-local / unique-local
  if (origin.includes("://[::1]")) return true;
  if (origin.includes("://[fe80")) return true;
  if (origin.includes("://[fc") || origin.includes("://[fd")) return true;
  return false;
};

const signToken = (id, role, tokenVersion) => {
  return jwt.sign({ id, role, tokenVersion }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(
    user.id,
    user.role,
    user.tokenVersion ?? user.token_version ?? 0,
  );
  const origin = req.headers.origin || "no origin";
  const localOrigin = isLocalOrigin(origin);

  // Determine cookie name based on origin
  let cookieName = "jwt";
  if (origin.includes("azadnoori.com")) {
    cookieName = "jwt_azadnoori";
  } else if (
    origin.includes("sparktrust.tech") ||
    origin.includes("sparktrust.ca")
  ) {
    cookieName = "jwt_sparktrust";
  }

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: localOrigin ? false : true,
    sameSite: localOrigin ? "Lax" : "None",
    path: "/",
  };

  res.cookie(cookieName, token, cookieOptions);

  delete user.password;
  delete user.tokenVersion;
  delete user.token_version;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

exports.logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (
    typeof email !== "string" ||
    !email.trim() ||
    typeof password !== "string" ||
    !password
  ) {
    return next(new AppError("Please provide your email and password!", 400));
  }
  const normalizedEmail = email.trim().toLowerCase();

  let rows;
  try {
    [
      rows,
    ] = await pool.execute(
      "SELECT id, email, name, role, password, is_active, is_super_admin, token_version FROM users WHERE LOWER(email) = ?",
      [normalizedEmail],
    );
  } catch (err) {
    console.error("[logIn] MySQL lookup failed:", err.code || "database error");
    return next(
      new AppError(
        "Login is temporarily unavailable because the database could not be reached.",
        503,
      ),
    );
  }

  const row = rows[0];
  if (
    !row ||
    row.role !== "admin" ||
    Number(row.is_active) !== 1 ||
    !(await bcrypt.compare(password, row.password))
  ) {
    return next(new AppError("Invalid email or password.", 401));
  }

  createSendToken(
    {
      id: row.id,
      email: row.email,
      name: row.name,
      role: row.role,
      is_super_admin: row.is_super_admin,
      tokenVersion: row.token_version,
    },
    200,
    req,
    res,
  );
});

exports.logout = (req, res) => {
  const origin = req.headers.origin || "no origin";
  const localOrigin = isLocalOrigin(origin);
  let cookieName = "jwt";
  if (origin.includes("azadnoori.com")) {
    cookieName = "jwt_azadnoori";
  } else if (
    origin.includes("sparktrust.tech") ||
    origin.includes("sparktrust.ca")
  ) {
    cookieName = "jwt_sparktrust";
  }

  res.cookie(cookieName, "", {
    expires: new Date(0),
    httpOnly: true,
    secure: localOrigin ? false : true,
    sameSite: localOrigin ? "Lax" : "None",
    path: "/",
  });
  res.status(200).json({ status: "success" });
};

exports.protect = async (req, res, next) => {
  try {
    let token;
    const origin = req.headers.origin || "no origin";
    let cookieName = "jwt";
    if (origin.includes("azadnoori.com")) {
      cookieName = "jwt_azadnoori";
    } else if (
      origin.includes("sparktrust.tech") ||
      origin.includes("sparktrust.ca")
    ) {
      cookieName = "jwt_sparktrust";
    }

    if (req.headers.authorization?.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies?.[cookieName]) {
      token = req.cookies[cookieName];
    }

    if (!token) {
      return next(
        new AppError("You are not logged in. Please sign in to continue.", 401),
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const [
      rows,
    ] = await pool.execute(
      "SELECT id, email, name, role, is_active, is_super_admin, token_version FROM users WHERE id = ?",
      [decoded.id],
    );
    if (rows.length === 0 || Number(rows[0].is_active) !== 1) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401),
      );
    }

    req.user = rows[0];
    if (Number(decoded.tokenVersion) !== Number(req.user.token_version)) {
      return next(
        new AppError("Your session has expired. Please sign in again.", 401),
      );
    }
    next();
  } catch (err) {
    return next(
      new AppError(
        "Your session is invalid or has expired. Please sign in again.",
        401,
      ),
    );
  }
};

exports.getMe = catchAsync(async (req, res, next) => {
  if (!req.user || !req.user.id) {
    return next(new AppError("No authenticated user found.", 401));
  }
  res.status(200).json({
    status: "success",
    data: {
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name,
        role: req.user.role,
        is_super_admin: req.user.is_super_admin,
      },
    },
  });
});

exports.changePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body || {};
  if (
    typeof currentPassword !== "string" ||
    !currentPassword ||
    typeof newPassword !== "string" ||
    newPassword.length < 12
  ) {
    return next(
      new AppError(
        "Enter your current password and a new password of at least 12 characters.",
        400,
      ),
    );
  }
  const [[user]] = await pool.execute(
    "SELECT password FROM users WHERE id = ?",
    [req.user.id],
  );
  if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError("Current password is incorrect.", 401));
  }
  const hash = await bcrypt.hash(newPassword, 12);
  await pool.execute(
    "UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?",
    [hash, req.user.id],
  );
  const [
    [updatedUser],
  ] = await pool.execute(
    "SELECT id, email, name, role, is_super_admin, token_version FROM users WHERE id = ?",
    [req.user.id],
  );
  createSendToken(
    { ...updatedUser, tokenVersion: updatedUser.token_version },
    200,
    req,
    res,
  );
});

exports.forgotPassword = catchAsync(async (req, res) => {
  const genericMessage =
    "If an active administrator account exists, reset instructions have been sent.";
  const email =
    typeof req.body?.email === "string"
      ? req.body.email.trim().toLowerCase()
      : "";
  const smtpReady =
    process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS;
  if (!email) {
    return res
      .status(400)
      .json({ status: "fail", message: "Email is required." });
  }
  if (!smtpReady) {
    return res.status(503).json({
      status: "error",
      message:
        "Password recovery is not configured. Contact the site administrator.",
    });
  }
  const [
    users,
  ] = await pool.execute(
    "SELECT id, email FROM users WHERE LOWER(email) = ? AND role = 'admin' AND is_active = 1 LIMIT 1",
    [email],
  );
  if (!users.length)
    return res.status(200).json({ status: "success", message: genericMessage });

  const rawToken = randomBytes(32).toString("hex");
  const tokenHash = createHash("sha256")
    .update(rawToken)
    .digest("hex");
  const expiresAt = new Date(Date.now() + 30 * 60 * 1000);
  await pool.execute(
    "DELETE FROM password_resets WHERE user_id = ? AND used_at IS NULL",
    [String(users[0].id)],
  );
  await pool.execute(
    "INSERT INTO password_resets (user_id, token_hash, expires_at) VALUES (?, ?, ?)",
    [String(users[0].id), tokenHash, expiresAt],
  );

  try {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT || 587),
      secure: Number(process.env.EMAIL_PORT) === 465,
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    const resetUrl = new URL(
      "/reset-password",
      process.env.FRONTEND_URL ||
        "https://construction-website-xi-ten.vercel.app",
    );
    resetUrl.searchParams.set("token", rawToken);
    await transport.sendMail({
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: users[0].email,
      subject: "SMS administrator password reset",
      text: `Use this one-time link within 30 minutes to reset your password: ${resetUrl.toString()}`,
    });
  } catch (error) {
    await pool.execute("DELETE FROM password_resets WHERE token_hash = ?", [
      tokenHash,
    ]);
    console.error(
      "Password reset email delivery failed:",
      error.code || "mail error",
    );
  }
  res.status(200).json({ status: "success", message: genericMessage });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token, newPassword } = req.body || {};
  if (
    typeof token !== "string" ||
    !token ||
    typeof newPassword !== "string" ||
    newPassword.length < 12
  ) {
    return next(
      new AppError(
        "A valid reset link and a password of at least 12 characters are required.",
        400,
      ),
    );
  }
  const tokenHash = createHash("sha256")
    .update(token)
    .digest("hex");
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();
    const [resets] = await connection.execute(
      `SELECT pr.id, pr.user_id FROM password_resets pr
       JOIN users u ON u.id = pr.user_id
       WHERE pr.token_hash = ? AND pr.used_at IS NULL AND pr.expires_at > NOW()
         AND u.role = 'admin' AND u.is_active = 1 FOR UPDATE`,
      [tokenHash],
    );
    if (!resets.length) {
      await connection.rollback();
      return next(
        new AppError("This password reset link is invalid or expired.", 400),
      );
    }
    const passwordHash = await bcrypt.hash(newPassword, 12);
    await connection.execute(
      "UPDATE users SET password = ?, token_version = token_version + 1 WHERE id = ?",
      [passwordHash, resets[0].user_id],
    );
    await connection.execute(
      "UPDATE password_resets SET used_at = NOW() WHERE id = ?",
      [resets[0].id],
    );
    await connection.commit();
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
  res
    .status(200)
    .json({ status: "success", message: "Password reset successfully." });
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError("You do not have permission to perform this action", 403),
      );
    }
    next();
  };
};
