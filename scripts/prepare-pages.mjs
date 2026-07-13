import { access, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const serverEntry = fileURLToPath(
  new URL("../dist/server/index.js", import.meta.url),
);
const clientDirectory = fileURLToPath(
  new URL("../dist/client/", import.meta.url),
);
const pagesEntry = fileURLToPath(
  new URL("../dist/client/_worker.js", import.meta.url),
);
const pagesRoutes = fileURLToPath(
  new URL("../dist/client/_routes.json", import.meta.url),
);

await Promise.all([access(serverEntry), access(clientDirectory)]);

// Wrangler bundles this adapter with the generated vinext server tree. Pages
// supplies the ASSETS binding used by vinext to serve the client build.
await writeFile(
  pagesEntry,
  'export { default } from "../server/index.js";\n',
  "utf8",
);

// Advanced-mode Pages Workers otherwise receive every request. Keep immutable
// build output and owner-approved public files on Pages' static-asset path so a
// server route cannot turn a valid stylesheet or image into a 404 response.
await writeFile(
  pagesRoutes,
  `${JSON.stringify(
    {
      version: 1,
      include: ["/*"],
      exclude: [
        "/assets/*",
        "/brand/*",
        "/diagrams/*",
        "/visuals/*",
        "/favicon.ico",
        "/boho-digital-services-social-v2.png",
      ],
    },
    null,
    2,
  )}\n`,
  "utf8",
);

console.log("Prepared dist/client for Cloudflare Pages advanced mode.");
