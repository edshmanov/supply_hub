import { build } from "esbuild";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const clientDir = path.resolve(__dirname, "../client");
const serverDir = path.resolve(__dirname, "../server");
const outDir = path.resolve(__dirname, "../dist");

// Ensure dist directory exists
if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true });
}
fs.mkdirSync(outDir);

const packageJsonPath = path.resolve(__dirname, "../package.json");
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));
const dependencies = [
    ...Object.keys(packageJson.dependencies || {}),
    ...Object.keys(packageJson.devDependencies || {}),
    ...Object.keys(packageJson.peerDependencies || {}),
];

console.log("Building client...");
execSync("npx vite build", { stdio: "inherit", cwd: path.resolve(__dirname, "..") });

console.log("Building server...");
build({
    entryPoints: [path.resolve(serverDir, "index.ts")],
    bundle: true,
    platform: "node",
    target: "node18",
    outfile: path.resolve(outDir, "index.cjs"),
    external: [...dependencies, "vite", "esbuild", "lightningcss"], // Exclude all deps + dev tools that might creep in
    format: "cjs",
    sourcemap: true,
}).catch(() => process.exit(1));

// Copy public files if needed (Vite handles this usually for client)
console.log("Build complete!");
