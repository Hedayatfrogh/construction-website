const bcrypt = require("bcryptjs");
const pool = require("./db");

async function ensureColumn(table, column, definition) {
  const [columns] = await pool.execute(
    `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = ? AND COLUMN_NAME = ?`,
    [table, column],
  );
  if (columns.length === 0) {
    await pool.execute(
      `ALTER TABLE \`${table}\` ADD COLUMN \`${column}\` ${definition}`,
    );
  }
}

async function initializeDatabase() {
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(254) NOT NULL,
      role VARCHAR(40) NOT NULL DEFAULT 'user',
      password VARCHAR(255) NOT NULL,
      is_active TINYINT(1) NOT NULL DEFAULT 1,
      is_super_admin TINYINT(1) NOT NULL DEFAULT 0,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY users_email_unique (email)
    )
  `);
  await ensureColumn("users", "is_active", "TINYINT(1) NOT NULL DEFAULT 1");
  await ensureColumn(
    "users",
    "is_super_admin",
    "TINYINT(1) NOT NULL DEFAULT 0",
  );
  await ensureColumn("users", "token_version", "INT NOT NULL DEFAULT 0");

  const [emailIndexes] = await pool.execute(
    `SELECT INDEX_NAME FROM INFORMATION_SCHEMA.STATISTICS
     WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'users'
       AND INDEX_NAME = 'users_email_unique'`,
  );
  if (emailIndexes.length === 0) {
    const [duplicates] = await pool.execute(
      "SELECT LOWER(email) AS email FROM users GROUP BY LOWER(email) HAVING COUNT(*) > 1 LIMIT 1",
    );
    if (duplicates.length) {
      throw new Error(
        "Duplicate user emails must be resolved before enabling unique admin accounts.",
      );
    }
    await pool.execute(
      "ALTER TABLE users ADD UNIQUE KEY users_email_unique (email)",
    );
  }

  await pool.execute(`
    CREATE TABLE IF NOT EXISTS website_content (
      section_key VARCHAR(100) NOT NULL PRIMARY KEY,
      content LONGTEXT NOT NULL,
      updated_by VARCHAR(64) NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
  `);
  await pool.execute(`
    CREATE TABLE IF NOT EXISTS password_resets (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id VARCHAR(64) NOT NULL,
      token_hash CHAR(64) NOT NULL UNIQUE,
      expires_at DATETIME NOT NULL,
      used_at DATETIME NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX password_resets_user_id (user_id),
      INDEX password_resets_expires_at (expires_at)
    )
  `);

  const configuredPassword = process.env.ADMIN_PASSWORD;
  const legacyPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!configuredPassword && !legacyPasswordHash) return;
  if (configuredPassword && configuredPassword.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters long.");
  }

  if (
    legacyPasswordHash &&
    !configuredPassword &&
    !/^\$2[aby]\$\d\d\$/.test(legacyPasswordHash)
  ) {
    throw new Error("ADMIN_PASSWORD_HASH is not a valid bcrypt hash.");
  }
  const passwordHash = configuredPassword
    ? await bcrypt.hash(configuredPassword, 12)
    : legacyPasswordHash;
  const email = (
    process.env.ADMIN_EMAIL ||
    process.env.ADMIN_USERNAME ||
    "admin@sms.af"
  )
    .trim()
    .toLowerCase();
  const [
    admins,
  ] = await pool.execute(
    "SELECT id, token_version FROM users WHERE LOWER(email) = ? LIMIT 1",
    [email],
  );
  if (admins.length > 0) {
    if (Number(admins[0].token_version) === 0) {
      await pool.execute(
        "UPDATE users SET name = ?, role = 'admin', password = ?, is_super_admin = 1, token_version = 1 WHERE id = ?",
        [process.env.ADMIN_NAME || "SMS Admin", passwordHash, admins[0].id],
      );
      console.log(
        `Legacy administrator credentials synchronized for ${email}.`,
      );
    } else {
      console.log("Initial admin already exists; no account was created.");
    }
    return;
  }

  await pool.execute(
    "INSERT INTO users (name, email, role, password, is_active, is_super_admin, token_version) VALUES (?, ?, 'admin', ?, 1, 1, 1)",
    [process.env.ADMIN_NAME || "SMS Admin", email, passwordHash],
  );
  console.log(`Initial administrator created for ${email}.`);
}

module.exports = initializeDatabase;
