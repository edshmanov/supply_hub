import { log } from "./index";
import * as http from "http";

// Keep-alive script to ping the server periodically
// This prevents Render free instances from spinning down due to inactivity

const INTERVAL_MS = 10 * 60 * 1000; // 10 minutes

export function startKeepAlive() {
    const port = process.env.PORT || "3000";
    // Use public URL if available, otherwise localhost
    const url = process.env.RENDER_EXTERNAL_URL
        ? `${process.env.RENDER_EXTERNAL_URL}/api/health`
        : `http://localhost:${port}/api/health`;

    log(`[KeepAlive] Starting keep-alive pinger for ${url}`);

    setInterval(() => {
        log(`[KeepAlive] Pinging ${url} to keep server awake...`);

        const req = http.get(url, (res) => {
            log(`[KeepAlive] Ping successful: status ${res.statusCode}`);
        });

        req.on("error", (err) => {
            log(`[KeepAlive] Ping failed: ${err.message}`);
        });

        req.end();
    }, INTERVAL_MS);
}
