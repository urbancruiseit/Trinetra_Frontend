import http from "node:http";
import next from "next";

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const hostname = "0.0.0.0";

console.log(`[server] starting — NODE_ENV=${process.env.NODE_ENV} PORT=${port} dev=${dev}`);

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

try {
  await app.prepare();
  console.log("[server] next.js prepared");

  http
    .createServer((req, res) => {
      handle(req, res);
    })
    .listen(port, hostname, (err) => {
      if (err) {
        console.error("[server] listen failed:", err);
        process.exit(1);
      }
      console.log(`[server] ready on http://${hostname}:${port}`);
    });
} catch (err) {
  console.error("[server] fatal:", err);
  process.exit(1);
}
