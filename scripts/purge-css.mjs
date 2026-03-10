import { PurgeCSS } from "purgecss";
import fs from "node:fs/promises";
import path from "node:path";

const distDir = path.resolve("dist");
const assetsDir = path.join(distDir, "assets");
const files = await fs.readdir(assetsDir);
const cssFiles = files.filter((file) => file.endsWith(".css"));

for (const file of cssFiles) {
  const filePath = path.join(assetsDir, file);

  const result = await new PurgeCSS().purge({
    content: [
      path.join(distDir, "**/*.html"),
      path.join(assetsDir, "**/*.js")
    ],
    css: [filePath],
    safelist: ["body", "html"]
  });

  if (result[0] && result[0].css) {
    await fs.writeFile(filePath, result[0].css, "utf8");
  }
}

console.log("CSS purgado en dist/assets");
