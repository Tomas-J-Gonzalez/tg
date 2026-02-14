# Examples

## Static HTML

```bash
cd examples/static-html
# Terminal 1: bridge
node ../../src/bridge.js
# Terminal 2: serve
npx serve .
# Open http://localhost:3000, Ctrl+Alt+Click elements
```

## React (Vite)

```bash
cd examples/react-vite
npm install
npm run dev
# Open http://localhost:5173, Ctrl+Alt+Click elements
```

## Vue (Vite)

```bash
cd examples/vue-vite
npm install
npm run dev
# Open http://localhost:5173, Ctrl+Alt+Click elements
```

## Hugo

See the parent project (`tg`) - a partial is included in the theme. Run `node click-to-source/src/bridge.js` alongside `hugo server`.
