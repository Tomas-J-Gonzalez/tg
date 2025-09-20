// Theme toggle functionality with smooth transitions
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
  // Prevent double initialization
  if (themeInitialized) return;
  themeInitialized = true;

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');

  if (!themeToggle || !themeIcon || !themeLabel) return;

  const iconMap = {
    [THEMES.LIGHT]: 'iconoir-sun-light',
    [THEMES.DARK]: 'iconoir-half-moon'
  };

  const labelMap = {
    [THEMES.LIGHT]: 'Light mode',
    [THEMES.DARK]: 'Dark mode'
  };

  function updateTheme(theme) {
    // Add transition class for smooth animation
    document.documentElement.classList.add('theme-transitioning');
    
    // Update theme class
    document.documentElement.className = `theme-${theme} theme-transitioning`;
    localStorage.setItem(STORAGE_KEY, theme);
    
    // Update UI elements with smooth transitions
    themeIcon.className = `theme-icon ${iconMap[theme]}`;
    themeLabel.textContent = labelMap[theme];
    themeToggle.setAttribute('aria-label', `Switch to ${theme === THEMES.DARK ? 'light' : 'dark'} mode`);
    themeToggle.setAttribute('aria-pressed', theme === THEMES.DARK ? 'true' : 'false');
    
    // Add button press animation
    themeToggle.classList.add('theme-switching');
    
    // Remove transition class after animation completes
    setTimeout(() => {
      document.documentElement.classList.remove('theme-transitioning');
      themeToggle.classList.remove('theme-switching');
    }, 300);
    
    // Announce theme change to screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = `Switched to ${theme} mode`;
    document.body.appendChild(announcement);
    
    // Remove announcement after it's been read
    setTimeout(() => {
      if (document.body.contains(announcement)) {
        document.body.removeChild(announcement);
      }
    }, 1000);
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
  
  // Only update UI elements, don't change the theme class again
  themeIcon.className = `theme-icon ${iconMap[savedTheme]}`;
  themeLabel.textContent = labelMap[savedTheme];
  themeToggle.setAttribute('aria-label', `Switch to ${savedTheme === THEMES.DARK ? 'light' : 'dark'} mode`);
  themeToggle.setAttribute('aria-pressed', savedTheme === THEMES.DARK ? 'true' : 'false');

  // Handle toggle click with smooth transition
  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Prevent rapid clicking during transition
    if (themeToggle.classList.contains('theme-switching')) return;
    
    const currentTheme = localStorage.getItem(STORAGE_KEY) || THEMES.DARK;
    const newTheme = currentTheme === THEMES.DARK ? THEMES.LIGHT : THEMES.DARK;
    updateTheme(newTheme);
  });

  // Add keyboard support
  themeToggle.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      themeToggle.click();
    }
  });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}
