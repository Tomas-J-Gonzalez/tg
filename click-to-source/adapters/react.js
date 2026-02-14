/**
 * React adapter for click-to-source
 *
 * To add source location to React/JSX elements, use one of:
 *
 * 1. @babel/plugin-transform-react-jsx-source (included in @babel/preset-react)
 *    Adds __source to elements: { fileName, lineNumber }
 *    Already enabled in development with Create React App, Vite React, Next.js.
 *
 * 2. babel-plugin-transform-react-jsx-location
 *    npm install -D babel-plugin-transform-react-jsx-location
 *    Adds data-source="path/to/file.jsx:42" to elements
 *
 * 3. babel-plugin-jsx-source-loc
 *    npm install -D babel-plugin-jsx-source-loc
 *    Adds data-source-loc="path/to/file.jsx:42:8"
 *
 * Vite: Use the click-to-source Vite plugin - it injects the script and
 * React's __source is read automatically via React Fiber.
 *
 * Next.js: Same - ensure dev mode. __source is added by default in development.
 */

module.exports = {};
