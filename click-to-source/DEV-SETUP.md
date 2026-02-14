# Debugging click-to-source

If nothing opens when you Ctrl+Alt+Click:

1. **Start the bridge from your project root** (tg folder):
   ```
   node click-to-source/src/bridge.js
   ```
   You should see: "click-to-source bridge running at http://localhost:9473"

2. **Use Hugo development mode** so the script loads:
   ```
   hugo server
   ```
   Or: `HUGO_ENV=development hugo server`

3. **Open DevTools** (F12) → Console. Add `?cts-debug=1` to the URL for verbose logs. When you Ctrl+Alt+Click:
   - "Opening: vscode://file/..." = it worked, Cursor should open the file
   - "No project root. Is the bridge running?" = bridge not running or wrong port
   - "No source found for: ..." = no data-file or @source on that element

4. **Run bridge from project root** – `process.cwd()` must be your tg folder so paths like `themes/hc-starter/layouts/...` resolve correctly.
