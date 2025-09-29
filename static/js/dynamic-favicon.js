// Dynamic favicon that changes based on theme
console.log('🚀 Dynamic favicon script loading...');
(function() {
  'use strict';
  console.log('🚀 Dynamic favicon script executing...');
  
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };
  
  const STORAGE_KEY = 'theme-preference';
  
  // Generate SVG favicon as data URI
  function generateFaviconSVG(theme) {
    // Get the actual background color from CSS custom properties
    const fillColor = theme === THEMES.DARK ? 'oklch(18.5% .1 120)' : '#f7f2ed';
    
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32">
        <circle cx="16" cy="16" r="16" fill="${fillColor}"/>
      </svg>
    `.trim();
    
    return `data:image/svg+xml;base64,${btoa(svg)}`;
  }
  
  // Update favicon
  function updateFavicon(theme) {
    console.log('🎨 Updating favicon for theme:', theme);
    
    const favicon = document.querySelector('link[rel="icon"]');
    const shortcutFavicon = document.querySelector('link[rel="shortcut icon"]');
    
    const newFaviconHref = generateFaviconSVG(theme);
    console.log('🔄 New favicon href:', newFaviconHref);
    
    if (favicon) {
      favicon.href = newFaviconHref;
      console.log('✅ Updated favicon link');
    } else {
      console.log('❌ No favicon link found');
    }
    
    if (shortcutFavicon) {
      shortcutFavicon.href = newFaviconHref;
      console.log('✅ Updated shortcut favicon link');
    } else {
      console.log('❌ No shortcut favicon link found');
    }
  }
  
  // Get current theme from DOM or localStorage
  function getCurrentTheme() {
    // First check if theme class is already applied to documentElement
    const themeClass = document.documentElement.className;
    if (themeClass.includes('theme-light')) {
      return THEMES.LIGHT;
    } else if (themeClass.includes('theme-dark')) {
      return THEMES.DARK;
    }
    
    // Fallback to localStorage
    const savedTheme = localStorage.getItem(STORAGE_KEY);
    if (savedTheme === THEMES.LIGHT || savedTheme === THEMES.DARK) {
      return savedTheme;
    }
    
    // Final fallback: detect system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return THEMES.LIGHT;
    }
    
    return THEMES.DARK; // Default to dark
  }
  
  // Initialize favicon on page load
  function initFavicon() {
    console.log('🚀 Initializing dynamic favicon...');
    const currentTheme = getCurrentTheme();
    console.log('🎯 Detected theme:', currentTheme);
    updateFavicon(currentTheme);
  }
  
  // Listen for theme changes
  function setupThemeListener() {
    // Listen for storage changes (when theme is changed in another tab)
    window.addEventListener('storage', function(e) {
      if (e.key === STORAGE_KEY) {
        const newTheme = e.newValue || THEMES.DARK;
        updateFavicon(newTheme);
      }
    });
    
    // Listen for theme class changes on documentElement
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          console.log('🔄 Theme class changed, new className:', document.documentElement.className);
          const currentTheme = getCurrentTheme();
          updateFavicon(currentTheme);
        }
      });
    });
    
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
  
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      initFavicon();
      setupThemeListener();
    });
  } else {
    initFavicon();
    setupThemeListener();
  }
  
  // Expose updateFavicon function globally for manual updates
  window.updateFavicon = updateFavicon;
})();
