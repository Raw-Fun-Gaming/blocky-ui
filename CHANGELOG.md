# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-18

### Added

#### Core Components
- BlockyButton component with 4 color variants (default, primary, secondary, danger)
- BlockyModal component with backdrop blur and instance methods
- BlockyCard component with 3D hover effects
- BlockyInfo component with 5 color themes (yellow, green, blue, purple, red)
- BlockyTag component with gradient styling
- BlockyPage component with animated gradient borders (7 color sets)

#### Styling & Design
- Pure CSS implementation with multi-layer box shadows for 3D depth
- Gradient backgrounds with radial overlays
- Smooth hover animations with Y-axis transforms
- Backdrop blur effects (glassmorphism)
- Responsive design with 4 breakpoints (mobile-first)
- CSS custom properties for easy theming

#### Developer Experience
- Full TypeScript support with comprehensive interfaces
- Zero runtime dependencies
- ES Module, CommonJS, and UMD builds
- TypeScript declarations (.d.ts)
- Modal instance pattern for better control

#### Documentation
- Comprehensive README with 12 professional badges
- 6 detailed wiki pages (~18,000 words):
  - Home page with navigation
  - Installation & Setup guide for npm, CDN, and frameworks
  - Component Reference with full API documentation
  - Complete Examples (game menu, casino UI, settings, shop)
  - Architecture Overview with system design
  - Troubleshooting guide with common issues
- Interactive GitHub Pages demo site
- Wiki setup script and guide

#### DevOps
- GitHub Actions CI workflow (Node 18.x, 20.x)
- GitHub Actions Pages deployment workflow
- Automated build and type checking

#### Build System
- Rollup-based build pipeline
- PostCSS for CSS processing
- Multiple output formats (ESM, CJS, UMD)
- Source maps for debugging
- Minification with Terser

### Technical Details
- **Bundle Size**: ~30KB (JS + CSS combined)
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Node Version**: >=14.0.0
- **TypeScript**: ^5.0.0
