# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.5] - 2025-12-27

### Added
- **BlockyDropdown Component**: New theme-aware dropdown component with:
  - 4 color variants (default, primary, secondary, danger)
  - Theme support for both blocky and fall-guys themes
  - Custom CSS dropdown arrow for consistent cross-browser appearance
  - Optional label support
  - Disabled state handling
  - TypeScript type definitions

### Changed
- **Demo Refactoring**: Separated demo.html into modular files for better organization:
  - Extracted CSS to `demo.css` (275 lines)
  - Extracted JavaScript to `demo.js` (456 lines)
  - Clean HTML structure in `demo.html` (216 lines)
- **Demo Enhancements**: Added professional presentation elements:
  - Animated gradient header with glow effects
  - Key Features section with 6 feature cards
  - Quick Installation section with styled code blocks
  - Professional footer with navigation links
  - Grid pattern background overlay
- **GitHub Pages**: Consolidated `docs/index.html` to redirect to `demo.html` for single source of truth

### Documentation
- Improved demo page organization and maintainability
- Added comprehensive section comments in demo.js
- Enhanced visual presentation with animated elements

## [1.0.4] - 2025-12-17

### Added
- **Theme Support**: New theming system with `BlockyUI.setTheme()` API for switching themes at runtime
- **Fall Guys Theme**: New playful theme inspired by Fall Guys aesthetic featuring:
  - Bright cyan backgrounds with solid black shadows
  - Purple gradient headers
  - Rounded corners for a softer, cartoon-like appearance
  - Playful color palette optimized for casual gaming UIs
- **BlockyTheme Type**: New TypeScript type for theme selection ('blocky' | 'fall-guys')
- **Themes Directory**: New `src/styles/themes/` directory for theme CSS files

### Documentation
- Updated README.md with theme usage examples
- Added theme features list and available themes documentation
- Updated file structure documentation to include themes directory

## [1.0.3] - 2025-01-18

### Changed
- Fixed repository URL format in package.json

## [1.0.2] - 2025-01-18

### Added
- **Component Variants**: Added `variant` property support to BlockyTag and BlockyCard components
- **ComponentVariant Type**: New shared type for component color variants (default, primary, secondary, danger)
- **Tag Variants**: BlockyTag now supports 4 color gradients matching button variants
- **Card Variants**: BlockyCard now supports 4 color gradients matching button variants

### Changed
- **Type System**: Renamed `ButtonVariant` to `ComponentVariant` for better accuracy
- **BlockyTag**: Removed `flipped` property in favor of simpler positioning

### Removed
- **BlockyTag**: Removed `flipped` property and related CSS styles

### Documentation
- Updated demo.html with tag and card variants showcase
- Updated docs/index.html (GitHub Pages) with proper tag spacing and variants
- Fixed tags section to use correct `content` property and container positioning

## [1.0.1] - 2025-01-18

### Changed
- **Package name**: Changed from `@Raw-Fun-Gaming/blocky-ui` to `blocky-ui-lite` for better branding
- Updated all documentation to reference `blocky-ui-lite`
- Updated CDN links in demo page and wiki
- Fixed `loadFallback()` function definition order in demo page

### Documentation
- Updated README.md with new package name and badges
- Updated all wiki pages with new package references
- Updated demo page (docs/index.html) with correct CDN links

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
