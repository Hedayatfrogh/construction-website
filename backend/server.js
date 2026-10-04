const dotenv = require("dotenv");
const path = require("path");
const os = require("os");

// Load config.env with absolute path
dotenv.config({ path: path.resolve(__dirname, "config.env") });

console.log("Backend environment loaded.");

const app = require("./app");
const initializeDatabase = require("./config/schema");

const port = process.env.PORT || 2000;
// Bind explicitly to 0.0.0.0 so the server is reachable from other devices
// on the same local network (LAN), not just from localhost.
const host = process.env.HOST || "0.0.0.0";

async function startServer() {
  await initializeDatabase();
  app.listen(port, host, () => {
    console.log(`App running on port ${port}...`);
    console.log(`Bound to host: ${host}`);

    // Print every LAN URL the server is reachable at so users on the
    // same Wi-Fi can open it directly from their phone / other PC.
    const interfaces = os.networkInterfaces();
    const printed = new Set();
    console.log(
      "\nLocal network URLs (open from any device on the same Wi-Fi/LAN):",
    );
    for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name] || []) {
        // Skip internal (loopback) and non-IPv4 addresses
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
