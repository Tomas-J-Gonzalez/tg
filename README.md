# Tomás González - Personal Website

A Hugo site for Tomás González's personal website with theme toggle, lazy loading, and responsive design.

## 🚀 Quick Start

### Local Development
```bash
# Start local development server
./scripts/dev.sh

# Or manually:
hugo server --config config.development.toml --bind 0.0.0.0 --port 1313
```

### Production Build
```bash
# Build for production
./scripts/build.sh

# Or manually:
hugo --minify --cleanDestinationDir
```

## 🌍 Environment Configuration

### Local Development (`config.development.toml`)
- **Base URL**: `http://localhost:1313/`
- **Environment**: Development
- **Features**: Hot reload, fast rendering

### Production (`config.toml`)
- **Base URL**: `https://tomasjgonzalez.com/`
- **Environment**: Production
- **Features**: Minified assets, optimized for deployment

## ✨ Features

### 🎨 Theme Toggle
- **Mary UI Button Circle Component** with Font Awesome icons
- **Persistent theme switching** (dark/light mode)
- **Accessible** with proper ARIA attributes
- **Smooth animations** and hover effects

### 🖼️ Image Optimization
- **Lazy loading** with lazySizes.js
- **Cloudinary integration** for responsive images
- **Next-gen formats** (WebP, AVIF) with fallbacks
- **Responsive srcsets** for optimal performance

### 📱 Responsive Design
- **Mobile-first approach**
- **Fluid typography** with Utopia
- **CUBE CSS methodology**
- **Accessibility compliant** (WCAG)

### 🔧 Technical Stack
- **Hugo** - Static site generator
- **SCSS** - CSS preprocessing
- **Font Awesome 5 Free** - Vector icons
- **Cloudinary** - Image hosting and optimization

## 📁 Project Structure

```
tg/
├── assets/
│   ├── js/
│   │   ├── theme-toggle.js    # Theme switching logic
│   │   └── lazysizes.js       # Lazy loading library
│   └── scss/
│       ├── base/
│       │   └── _button.scss   # Button styles (including Mary UI)
│       └── utilities/
│           └── _theme-toggle.scss  # Theme-specific styles
├── content/
│   ├── writing/               # Blog posts
│   └── portfolio/             # Portfolio projects
├── themes/hc-starter/
│   └── layouts/
│       ├── partials/
│       │   ├── header.html    # Navigation with theme toggle
│       │   └── head.html      # Head section with Font Awesome
│       └── _default/
│           └── baseof.html    # Base template with JS loading
├── config.toml               # Production configuration
├── config.development.toml   # Local development configuration
└── scripts/
    ├── dev.sh               # Development server script
    └── build.sh             # Production build script
```

## 🎯 Key Components

### Theme Toggle Button
```html
<button id="theme-toggle" class="btn btn-circle btn-ghost" type="button" role="switch" aria-pressed="true">
  <i id="theme-icon" class="theme-icon fas fa-moon"></i>
  <span id="theme-label" class="theme-label sr-only">Dark mode</span>
</button>
```

### Image with Lazy Loading
```html
<img data-src="image.jpg" class="lazyload" alt="Description">
```

## 🔧 Configuration

### Environment Variables
- `HUGO_ENV=development` - Local development
- `HUGO_ENV=production` - Production build

### Base URL Management
- **Local**: `http://localhost:1313/`
- **Production**: `https://tomasjgonzalez.com/`

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Set build command: `./scripts/build.sh`
3. Set publish directory: `public`
4. Deploy automatically on push

### Manual Deployment
```bash
# Build for production
./scripts/build.sh

# Upload public/ directory to your hosting provider
```

## 🐛 Troubleshooting

### Theme Toggle Not Working
1. Check if Font Awesome is loading
2. Verify JavaScript is not blocked
3. Check browser console for errors
4. Ensure CSS is properly compiled

### Images Not Loading
1. Verify Cloudinary URL is correct
2. Check lazySizes.js is loaded
3. Ensure proper `data-src` attributes
4. Check network tab for failed requests

### Links Pointing to Wrong Environment
1. Use `config.development.toml` for local development
2. Use `config.toml` for production builds
3. Ensure proper base URL configuration

## 📝 Content Management

### Creating New Writing Posts
```bash
# Create new writing post
hugo new writing/YYYY-MM-DD-post-title.md
```

### Creating New Portfolio Projects
```bash
# Create new portfolio project
hugo new portfolio/project-name/index.md
```

### Post Front Matter
```yaml
---
title: "Post Title"
date: 2024-01-01T00:00:00+00:00
draft: false
description: "Post description"
slug: "post-slug"
topics: ["Topic1", "Topic2"]
syndicate: "false"
---
```

### Portfolio Project Front Matter
```yaml
---
title: "Project Title"
date: 2024-01-01T00:00:00+00:00
draft: false
description: "Project description"
slug: "project-slug"
topics: ["UX Design", "Web Development"]
image: "project-thumbnail.jpg"
image_alt: "Project screenshot"
client: "Client Name"
role: "Experience Designer"
duration: "3 months"
tools: ["Figma", "Miro", "Illustrator"]
live_url: "https://project-url.com"
github_url: "https://github.com/username/project"
---
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally with `./scripts/dev.sh`
5. Submit a pull request

## 📄 License

This project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 (CC BY-NC-SA 4.0) license.

## 🔗 Links

- **Live Site**: [tomasjgonzalez.com](https://tomasjgonzalez.com/)

