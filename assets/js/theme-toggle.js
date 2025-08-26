// Theme toggle functionality
const THEMES = {
  LIGHT: 'light',
  DARK: 'dark'
};

const STORAGE_KEY = 'theme-preference';

// Apply theme immediately to prevent flicker
function applyThemeImmediately() {
  const savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
  document.documentElement.className = `theme-${savedTheme}`;
}

// Only apply theme if it hasn't been applied yet (prevents double application)
if (!document.documentElement.className.includes('theme-')) {
  applyThemeImmediately();
}

function initTheme() {
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

  // Set initial state
  const savedTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
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
