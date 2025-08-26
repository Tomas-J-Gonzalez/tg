// Theme toggle functionality
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const STORAGE_KEY = 'theme-preference';

// Track if theme has been applied to prevent double application
let themeApplied = false;

// Apply theme immediately to prevent flicker
function applyThemeImmediately() {
  // Only apply if theme hasn't been applied yet
  if (themeApplied) return;
  
  const savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
  document.documentElement.className = `theme-${savedTheme}`;
  themeApplied = true;
}

// Only apply theme if it hasn't been applied yet
if (!document.documentElement.className.includes('theme-')) {
  applyThemeImmediately();
} else {
  // Theme already applied by inline script
  themeApplied = true;
}

// Track if theme has been initialized to prevent double initialization
let themeInitialized = false;

function initTheme() {
  // Prevent double initialization - only check local flag
  if (themeInitialized) return;
  themeInitialized = true;

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (!themeToggle || !themeIcon || !themeLabel) return;

  const iconMap = {
    [THEMES.LIGHT]: 'fas fa-sun',
    [THEMES.DARK]: 'fas fa-moon'
  };

  const labelMap = {
    [THEMES.LIGHT]: 'Light mode',
    [THEMES.DARK]: 'Dark mode'
  };

  function updateTheme(theme) {
    document.documentElement.className = `theme-${theme}`;
    localStorage.setItem(STORAGE_KEY, theme);
    
    themeIcon.className = `theme-icon ${iconMap[theme]}`;
    themeLabel.textContent = labelMap[theme];
    themeToggle.setAttribute('aria-label', labelMap[theme]);
    themeToggle.setAttribute('aria-pressed', theme === THEMES.DARK ? 'true' : 'false');
  }

  // Set initial state based on current theme class
  const currentThemeClass = document.documentElement.className;
  let savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
  
  // If theme class is already set, use that instead of localStorage
  if (currentThemeClass.includes('theme-light')) {
    savedTheme = THEMES.LIGHT;
  } else if (currentThemeClass.includes('theme-dark')) {
    savedTheme = THEMES.DARK;
  }
  
  updateTheme(savedTheme);

  // Handle toggle click
  themeToggle.addEventListener('click', () => {
    const currentTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    updateTheme(newTheme);
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
