# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.1.1] - 2026-04-19

### Fixed
- Close button vertically centered within modal header bar
- Close button glyph replaced with font-independent CSS cross (two rotated bars via `::before`/`::after`) — position no longer shifts when page font changes

### Added
- `--rfui-close-btn-bar-width` token (default `60%`) — controls bar length
- `--rfui-close-btn-bar-height` token (default `2px`) — controls stroke thickness
- `aria-label="Close"` on Modal and Page close buttons

### Changed
- Close button now lives inside `.rfui-header-bordered` in Modal (was on wrapper)

## [2.1.0] - 2026-04-09

### Added
- **Vanilla base theme**: Structural-only CSS base with no visual opinion
- **Granular CSS imports**: Import only the theme you need (`raw-fun-ui/styles/vanilla`, `raw-fun-ui/styles/blocky`, etc.)
- **Blocky theme file**: Extracted all blocky visual styles into a self-contained `_blocky.css` theme
- **Vanilla option in demo**: Theme switcher now includes "Vanilla (No Theme)" option

### Changed
- Base CSS is now vanilla (layout, sizing, typography only) — visual styles come from themes
- Fall Guys and Animal Crossing themes are now fully self-contained
- Default `RfuiTheme` is `'vanilla'` — demo defaults to blocky via `setTheme('blocky')`
- `RfuiTheme` type now includes `'vanilla'`

## [2.0.1] - 2026-04-09

### Fixed
- CI workflow checking for old `blocky-ui.css` artifact name
- Remaining "Blocky UI" branding in CSS comment headers, docs, and demo
- Broken documentation links (wiki → GitHub Pages)
- Theme dropdown label showing "Rfui" instead of "Blocky" for default theme
- Incorrectly renamed Blocky theme references in docs

## [2.0.0] - 2026-04-08

### Changed
- **BREAKING**: Rebranded from Blocky UI to Raw Fun UI with `rfui-*` prefix
- All CSS classes renamed from `blocky-*` to `rfui-*`
- All TypeScript classes renamed from `Blocky*` to `Rfui*`
- Package name changed to `raw-fun-ui`
- CSS output file renamed to `raw-fun-ui.css`

## [1.0.5] - 2025-12-27

### Added
- **RfuiDropdown Component**: New theme-aware dropdown component with:
  - 4 color variants (default, primary, secondary, danger)
  - Theme support for blocky, fall-guys, and animal-crossing themes
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
- **Theme Support**: New theming system with `RawFunUI.setTheme()` API for switching themes at runtime
- **Fall Guys Theme**: New playful theme inspired by Fall Guys aesthetic featuring:
  - Bright cyan backgrounds with solid black shadows
  - Purple gradient headers
  - Rounded corners for a softer, cartoon-like appearance
  - Playful color palette optimized for casual gaming UIs
- **RfuiTheme Type**: New TypeScript type for theme selection ('blocky' | 'fall-guys')
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
- **Component Variants**: Added `variant` property support to RfuiTag and RfuiCard components
- **ComponentVariant Type**: New shared type for component color variants (default, primary, secondary, danger)
- **Tag Variants**: RfuiTag now supports 4 color gradients matching button variants
- **Card Variants**: RfuiCard now supports 4 color gradients matching button variants

### Changed
- **Type System**: Renamed `ButtonVariant` to `ComponentVariant` for better accuracy
- **RfuiTag**: Removed `flipped` property in favor of simpler positioning

### Removed
- **RfuiTag**: Removed `flipped` property and related CSS styles

### Documentation
- Updated demo.html with tag and card variants showcase
- Updated docs/index.html (GitHub Pages) with proper tag spacing and variants
- Fixed tags section to use correct `content` property and container positioning

## [1.0.1] - 2025-01-18

### Changed
- **Package name**: Changed from `@Raw-Fun-Gaming/raw-fun-ui` to `raw-fun-ui` for better branding
- Updated all documentation to reference `raw-fun-ui`
- Updated CDN links in demo page and wiki
- Fixed `loadFallback()` function definition order in demo page

### Documentation
- Updated README.md with new package name and badges
- Updated all wiki pages with new package references
- Updated demo page (docs/index.html) with correct CDN links

## [1.0.0] - 2025-01-18

### Added

#### Core Components
- RfuiButton component with 4 color variants (default, primary, secondary, danger)
- RfuiModal component with backdrop blur and instance methods
- RfuiCard component with 3D hover effects
- RfuiInfo component with 5 color themes (yellow, green, blue, purple, red)
- RfuiTag component with gradient styling
- RfuiPage component with animated gradient borders (7 color sets)

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
