import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const clickToSource = require("../../src/middleware/vite.js");

export default defineConfig({
  plugins: [vue(), clickToSource()],
});
