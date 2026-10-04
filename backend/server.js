const dotenv = require("dotenv");
const path = require("path");
const os = require("os");

// Load environment variables from the project config file and optionally an .env file.
dotenv.config({ path: path.resolve(__dirname, ".env") });
dotenv.config({ path: path.resolve(__dirname, "config.env") });

console.log("Backend environment loaded.");

const app = require("./app");
const initializeDatabase = require("./config/schema");
const { connectDB } = require("./config/db");

const port = process.env.PORT || 2000;
const host = process.env.HOST || "0.0.0.0";

async function startServer() {
  await initializeDatabase();
  await connectDB();

  app.listen(port, host, () => {
    console.log(`App running on port ${port}...`);
    console.log(`Bound to host: ${host}`);

    const interfaces = os.networkInterfaces();
    const printed = new Set();
    console.log(
      "\nLocal network URLs (open from any device on the same Wi-Fi/LAN):",
    );

    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        if (iface.internal || iface.family !== "IPv4") continue;
        if (printed.has(iface.address)) continue;
        printed.add(iface.address);
        console.log(`  http://${iface.address}:${port}`);
      }
    }

    console.log(`  http://localhost:${port}  (this machine only)\n`);
  });
}

startServer().catch((error) => {
  console.error("Backend startup failed:", error.message);
  process.exit(1);
});
