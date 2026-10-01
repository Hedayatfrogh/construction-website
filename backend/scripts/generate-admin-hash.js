// scripts/generate-admin-hash.js
// Usage:  node scripts/generate-admin-hash.js "<password>"
// Prints a bcryptjs hash that can be pasted into config.env as
// ADMIN_PASSWORD_HASH=...
//
// Cost factor 12 matches what authController.js + hashPassword.js use.

const bcrypt = require("bcryptjs");

const password = process.argv[2];
if (!password) {
  console.error("Usage: node scripts/generate-admin-hash.js \"<password>\"");
  process.exit(1);
}

bcrypt
  .hash(password, 12)
  .then((hash) => {
    console.log("Password:", password);
    console.log("Hash:    ", hash);
    console.log("\nAdd to config.env:");
    console.log(`ADMIN_PASSWORD_HASH=${hash}`);
  })
  .catch((err) => {
    console.error("Error generating hash:", err);
    process.exit(1);
  });