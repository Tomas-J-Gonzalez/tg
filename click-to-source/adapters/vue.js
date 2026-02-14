/**
 * Vue adapter for click-to-source
 *
 * Vue 3 in development exposes __file and __line on component types.
 * The universal script reads these from el.__vue__ or el.__vueParentComponent.
 *
 * Vite: Use the click-to-source Vite plugin in your Vue project:
 *
 *   // vite.config.js
 *   import clickToSource from 'click-to-source/src/middleware/vite';
 *   export default {
 *     plugins: [vue(), clickToSource()],
 *   };
 *
 * No additional Vue-specific setup needed - the script detects Vue
 * component metadata automatically.
 *
 * For Vue 2 or custom setups, add data-file manually:
 *   <div data-file="src/components/MyComponent.vue:15">
 */

module.exports = {};
