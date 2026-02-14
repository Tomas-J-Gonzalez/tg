# Click-to-Source for Cursor

Universal Ctrl+Alt+Click (Win/Linux) or Cmd+Alt+Click (Mac) any element in a localhost preview to open the corresponding source file in Cursor at the matching line.

**Dev-only**: Runs only on `localhost` or `127.0.0.1`. Fails silently if source cannot be resolved.

## Quick Start

### Static sites (HTML, Hugo, Liquid, etc.)

1. Start the bridge server from your project root:
   ```bash
   npx click-to-source
   ```
2. Add to your HTML template (before `</body>`):
   ```html
   <script src="http://localhost:9473/script.js" data-bridge="http://localhost:9473"></script>
   ```
3. Add source hints to elements: `data-file="path/to/file.html:42"` or `<!-- @source path/to/file:10 -->`
4. Ctrl+Alt+Click (or Cmd+Alt+Click on Mac) any element with source info

### React / Vite

```js
// vite.config.js
import clickToSource from './click-to-source/src/middleware/vite.js';
export default {
  plugins: [react(), clickToSource()],
};
```

React adds `__source` metadata automatically in dev. No extra setup.

### Vue / Vite

```js
// vite.config.js
import clickToSource from './click-to-source/src/middleware/vite.js';
export default {
  plugins: [vue(), clickToSource()],
};
```

Vue 3 exposes `__file` and `__line` in development.

### Express / Connect

```js
const clickToSource = require('./click-to-source/src/middleware/generic.js');
app.use(clickToSource({ projectRoot: __dirname }));
```

### Hugo

1. Add partial `themes/your-theme/layouts/partials/click-to-source.html`:
   ```html
   {{ if eq hugo.Environment "development" }}
   <script src="http://localhost:9473/script.js" data-bridge="http://localhost:9473"></script>
   {{ end }}
   ```
2. Include in `baseof.html` before `</body>`: `{{ partial "click-to-source.html" . }}`
3. Run `node click-to-source/src/bridge.js` (or `npx click-to-source`) from project root alongside `hugo server`
4. Add `<!-- @source path/to/file.html:line -->` comments in layouts for source hints

## Source resolution priority

The script finds source info in this order:

1. `data-file` – `data-file="src/App.jsx:42"`
2. `data-source` – `data-source="components/Button.tsx:15"`
3. `data-source-loc` – from babel-plugin-jsx-source-loc
4. React Fiber – `__source` on component (automatic in dev)
5. Vue – `__file`, `__line` on component (automatic in dev)
6. HTML comment – `<!-- @source path/to/file.ext:line -->` before element

## Adding source info manually

For static HTML or templates without framework metadata:

```html
<!-- @source layouts/header.html:5 -->
<header>...</header>
```

Or on the element:

```html
<div data-file="content/about.md:10">...</div>
```

### Shopify / Liquid

```liquid
{% comment %}@source snippets/header.liquid:5{% endcomment %}
<header>...</header>
```

### EJS / Blade

```html
<!-- @source views/header.ejs:5 -->
<header>...</header>
```

## Configuration

- **Bridge port**: `CLICK_TO_SOURCE_PORT=9473` (default)
- **URI scheme**: Uses `cursor://file/` (Cursor accepts `vscode://` too)

## Requirements

- Cursor (or VS Code) installed and registered as handler for `cursor://` or `vscode://`
- Run from project root so the bridge knows the workspace path
