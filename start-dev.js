/**
 * Unified Full-Stack Development Launcher
 * Starts both Backend (Port 5000) and Frontend (Port 3001) in a single terminal
 */
const { spawn } = require("child_process");
const path = require("path");

const isWin = process.platform === "win32";
const npmCmd = isWin ? "npm.cmd" : "npm";

console.log("=========================================================");
console.log(" 🚀 Starting AgroAssist Full-Stack Platform (Dev Mode)   ");
console.log("    • Backend Service  -> http://localhost:5000          ");
console.log("    • Frontend Web App -> http://localhost:3001          ");
console.log("=========================================================\n");

const backend = spawn(npmCmd, ["run", "dev"], {
  cwd: path.join(__dirname, "backend"),
  stdio: "inherit",
  shell: true,
});

const frontend = spawn(npmCmd, ["start"], {
  cwd: path.join(__dirname, "frontend"),
  stdio: "inherit",
  shell: true,
  env: {
    ...process.env,
    PORT: "3001",
    REACT_APP_API_URL: "http://localhost:5000",
  },
});

function shutdown() {
  console.log("\n[Launcher] Shutting down Backend and Frontend services...");
  backend.kill();
  frontend.kill();
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
