const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, "../config.env") });

const initializeDatabase = require("../config/schema");

initializeDatabase()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Admin seed failed:", error.message);
    process.exit(1);
  });
