// Theme toggle functionality
(function() {
  'use strict';

  // Theme storage key
  const THEME_STORAGE_KEY = 'theme-preference';
  
  // Theme values
  const THEMES = {
    LIGHT: 'light',
    DARK: 'dark'
  };

  // Get the theme toggle button
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  // Get current theme from localStorage or default to dark
  function getCurrentTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme && Object.values(THEMES).includes(savedTheme)) {
      return savedTheme;
    }
    
    // Default to dark theme
    return THEMES.DARK;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const root = document.documentElement;
    
    // Remove existing theme classes
    root.classList.remove('theme-light', 'theme-dark');
    
    // Apply theme class
    root.classList.add(`theme-${theme}`);
    
    // Update button state
    updateButtonState(theme);
  }

  // Update button appearance based on current theme
  function updateButtonState(theme) {
    if (!themeToggle || !themeIcon || !themeLabel) return;
    
    const iconMap = {
      [THEMES.LIGHT]: 'fas fa-sun',
      [THEMES.DARK]: 'fas fa-moon'
    };
    
    const labelMap = {
      [THEMES.LIGHT]: 'Switch to dark mode',
      [THEMES.DARK]: 'Switch to light mode'
    };
    
    // Update Font Awesome icon class
    themeIcon.className = `theme-icon ${iconMap[theme]}`;
    themeLabel.textContent = labelMap[theme];
    themeToggle.setAttribute('aria-label', labelMap[theme]);
    
    // Update button pressed state for toggle button
    // When dark mode is active, button should be pressed (true)
    // When light mode is active, button should be unpressed (false)
    themeToggle.setAttribute('aria-pressed', theme === THEMES.DARK ? 'true' : 'false');
  }

  // Toggle theme
  function toggleTheme() {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT;
    
    // Save and apply new theme
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
  }

  // Initialize theme immediately to prevent flash
  function initTheme() {
    const theme = getCurrentTheme();
    applyTheme(theme);
    
    // Add click handler to toggle button
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
  }

  // Apply theme immediately to prevent flash of unstyled content
  const theme = getCurrentTheme();
  const root = document.documentElement;
  root.classList.remove('theme-light', 'theme-dark');
  root.classList.add(`theme-${theme}`);

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

})();
