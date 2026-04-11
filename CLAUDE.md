# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Raw Fun UI is a lightweight, themeable UI component library built with TypeScript and pure CSS. It provides casino-game-style UI components with configurable themes, gradient backgrounds, and depth effects.

**Origin**: Built as a configurable UI package that works across all games with minimal config for fast prototyping. The default blocky theme features multi-layer box-shadows for depth, gradient backgrounds with radial overlays, and bold border styling.

## Tech Stack

- **TypeScript**: Type-safe component API with full type definitions
- **Pure CSS**: No SVG generation, no runtime styling - all effects are CSS-based
- **Rollup**: Build tool for ESM, CJS, UMD, and TypeScript definitions
- **PostCSS**: CSS processing and bundling
- **Zero Dependencies**: No runtime dependencies for maximum portability

## Core Design Philosophy

### Blocky Theme Aesthetic

The library's signature look is achieved through:

1. **Multi-layer Box Shadows**: Creating 3D depth perception
   ```css
   box-shadow:
     0 4px 0 rgba(0, 0, 0, 0.3),           /* Base shadow */
     0 8px 16px rgba(0, 0, 0, 0.4),        /* Far shadow */
     inset 0 2px 0 rgba(255, 255, 255, 0.2), /* Top highlight */
     inset 0 -2px 0 rgba(0, 0, 0, 0.3);    /* Bottom shadow */
   ```

2. **Gradient Backgrounds**: Multi-stop linear gradients with transparency
   ```css
   background: linear-gradient(
     180deg,
     rgba(85, 223, 255, 0.95) 0%,
     rgba(85, 223, 255, 0.7) 50%,
     rgba(85, 223, 255, 0.5) 100%
   );
   ```

3. **Radial Overlay Effects**: Adding depth through pseudo-elements
   ```css
   ::before {
     background: radial-gradient(
       circle at center,
       rgba(255, 255, 255, 0.2) 0%,
       transparent 70%
     );
   }
   ```

4. **Backdrop Blur**: Modern glassmorphism effects
   ```css
   backdrop-filter: blur(8px);
   ```

5. **3D Hover Animations**: Y-axis transforms with enhanced shadows
   ```css
   transform: translateY(-3px);
   box-shadow: 0 6px 0 rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.5);
   ```

## Component Architecture

### File Structure

```
raw-fun-ui/
├── src/
│   ├── components/          # Component TypeScript files
│   │   ├── RfuiButton.ts
│   │   ├── RfuiModal.ts
│   │   ├── RfuiCard.ts
│   │   ├── RfuiInfo.ts
│   │   └── RfuiTag.ts
│   ├── styles/              # CSS modules
│   │   ├── base/
│   │   │   ├── _variables.css    # CSS custom properties
│   │   │   ├── _shared.css       # Shared component styles
│   │   │   └── _animations.css   # Keyframe animations
│   │   ├── components/
│   │   │   ├── _button.css
│   │   │   ├── _modal.css
│   │   │   ├── _card.css
│   │   │   ├── _info.css
│   │   │   └── _tag.css
│   │   └── raw-fun-ui.css         # Main entry point
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── index.ts                  # Main export
├── dist/                    # Build output (generated)
│   ├── index.esm.js
│   ├── index.cjs.js
│   ├── index.umd.js
│   ├── index.d.ts
│   └── raw-fun-ui.css
├── rollup.config.js         # Build configuration
├── tsconfig.json
└── package.json
```

### Component Pattern

All components follow a static factory pattern with consistent API:

```typescript
export class RfuiButton {
  static create(options: RfuiButtonOptions): HTMLButtonElement {
    // 1. Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = 'rfui-btn-wrapper';

    // 2. Create main element with blocky classes
    const button = document.createElement('button');
    button.className = `rfui-btn rfui-gradient rfui-3d ${options.variant || 'default'}`;

    // 3. Apply options
    button.textContent = options.text;
    if (options.onClick) button.addEventListener('click', options.onClick);
    if (options.disabled) button.disabled = true;

    // 4. Return wrapped element
    wrapper.appendChild(button);
    return wrapper as any; // Type assertion for API consistency
  }
}
```

### Modal Instance Pattern

Modals return an instance object with methods for manual control:

```typescript
export interface RfuiModalInstance {
  show(): void;    // Add modal to DOM and display
  close(): void;   // Remove modal from DOM with animation
  element: HTMLDivElement;  // Access to underlying DOM element
}

// Create modal - returns instance
const modal = RfuiModal.create(options);

// Manual control
modal.show();   // Display the modal
modal.close();  // Close the modal programmatically

// Convenience methods automatically show and return instances
const notification = RawFunUI.showNotification('Title', 'Message');
// Modal is already shown, instance returned for manual control if needed

const confirmation = RawFunUI.showConfirmation('Title', 'Message', onConfirm, onCancel);
// Modal is already shown
```

**Benefits of Instance Pattern**:
- ✅ Intuitive API - `modal.show()` is natural and self-documenting
- ✅ Better control - choose when to show/close
- ✅ Cleaner code - no static method imports needed
- ✅ TypeScript-friendly with RfuiModalInstance type
- ✅ Consistent with modern UI libraries (Chart.js, Bootstrap 5)

## Available Components

### 1. RfuiButton

**Purpose**: Interactive buttons with 4 color variants and 3D hover effects

**Variants**:
- `default`: Gray gradient (100, 100, 100)
- `primary`: Blue gradient (4, 123, 255)
- `secondary`: Cyan gradient (85, 223, 255)
- `danger`: Red gradient (255, 68, 68)

**Usage**:
```typescript
import { RawFunUI } from 'raw-fun-ui';

const button = RawFunUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked'),
  disabled: false
});

document.body.appendChild(button);
```

### 2. RfuiModal

**Purpose**: Overlay modals with backdrop blur, close button, and footer actions

**Features**:
- Auto-close on overlay click or Escape key
- Optional close button
- Footer with multiple action buttons
- Smooth slide-in animation

**Usage**:
```typescript
const modal = RawFunUI.createModal({
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  showCloseButton: true,
  buttons: [
    { text: 'Cancel', variant: 'default', onClick: () => {} },
    { text: 'Confirm', variant: 'primary', onClick: () => {} }
  ],
  onClose: () => console.log('Modal closed')
});

modal.show();  // Show the modal
// modal.close();  // Close programmatically
```

### 3. RfuiCard

**Purpose**: Content containers with 3D styling and optional headers

**Usage**:
```typescript
const card = RawFunUI.createCard({
  title: 'Card Title',
  content: 'Card content goes here',
  variant: 'default'
});
```

### 4. RfuiInfo

**Purpose**: Temporary notifications with auto-dismiss

**Color Variants**:
- `yellow`: Warning/info (255, 194, 1)
- `green`: Success (28, 230, 28)
- `blue`: Info (4, 123, 255)
- `purple`: Special (150, 50, 255)
- `red`: Error (255, 68, 68)

**Usage**:
```typescript
// Automatically shown
RawFunUI.showNotification(
  'Success!',
  'Your action was completed.',
  () => console.log('Notification closed')
);
```

### 5. RfuiTag

**Purpose**: Small label-style tags with compact styling

**Usage**:
```typescript
const tag = RawFunUI.createTag({
  text: '×2.5',
  variant: 'primary'
});
```

### 6. RfuiSlider

**Purpose**: Range input with snap positions and optional labels, themed per-theme

**Usage**:
```typescript
const slider = RawFunUI.createSlider({
  min: 0,
  max: 3,
  step: 1,
  value: 1,
  labels: ['Slow', 'Normal', 'Fast', 'Turbo'],
  onChange: (value) => console.log('Value:', value)
});
document.body.appendChild(slider);
```

**CSS Variables** (overridden per theme):
- `--rfui-slider-track`: Track background color
- `--rfui-slider-fill`: Filled portion color (Firefox only)
- `--rfui-slider-thumb`: Thumb border color
- `--rfui-slider-label`: Label text color
- `--rfui-slider-label-active`: Active label text color

## CSS Architecture

### CSS Custom Properties

All styling uses CSS variables for consistency and easy theming:

```css
:root {
  /* Colors */
  --rfui-primary: #55dfff;
  --rfui-danger: #ff4444;

  /* 3D Effects */
  --rfui-shadow-base: 0 4px 0 rgba(0, 0, 0, 0.3);
  --rfui-shadow-far: 0 8px 16px rgba(0, 0, 0, 0.4);

  /* Spacing */
  --rfui-padding-md: 12px;
  --rfui-border-radius: 6px;

  /* Z-Index Layers */
  --rfui-z-content: 10;
  --rfui-z-dropdown: 100;
  --rfui-z-overlay-modal: 900;
}
```

### Shared CSS Classes

**Base 3D Effect**:
```css
.rfui-3d {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  box-shadow: var(--rfui-shadow-base), var(--rfui-shadow-far), var(--rfui-inset-combined);
  backdrop-filter: blur(8px);
}
```

**Gradient Overlay**:
```css
.rfui-gradient::before {
  content: '';
  position: absolute;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}
```

**Close Button** (Shared by Modal and Info):
```css
.rfui-close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 32px;
  height: 32px;
  background: linear-gradient(180deg, rgba(255, 68, 68, 0.9) 0%, rgba(255, 68, 68, 0.7) 100%);
  z-index: 100;
}
```

### Scoped Disabled State

**IMPORTANT**: Disabled styles only affect rfui components to avoid conflicts:

```css
/* ✅ Correct - Scoped to rfui components */
.rfui-disabled,
.rfui-btn[disabled],
.rfui-btn-wrapper [disabled],
.rfui-modal-wrapper [disabled] {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* ❌ Never use - Too broad, affects all disabled elements */
[disabled] {
  opacity: 0.5;
}
```

## Development Workflow

### Local Development

1. **Setup**:
   ```bash
   npm install
   ```

2. **Watch Mode**:
   ```bash
   npm run dev
   # or
   npm run build:watch
   ```

3. **Build**:
   ```bash
   npm run build
   ```

4. **Clean**:
   ```bash
   npm run clean
   ```

### Build Output

The build process generates:
- `dist/index.esm.js` - ES Module (for modern bundlers)
- `dist/index.cjs.js` - CommonJS (for Node.js)
- `dist/index.umd.js` - UMD (for browser <script> tags)
- `dist/index.d.ts` - TypeScript type definitions
- `dist/raw-fun-ui.css` - Compiled CSS bundle

### Testing Locally in Another Project

**Method 1: File Dependency**
```json
{
  "dependencies": {
    "raw-fun-ui": "file:../raw-fun-ui"
  }
}
```

**Method 2: npm link**
```bash
# In raw-fun-ui directory
npm link

# In consuming project
npm link raw-fun-ui
```

**Vite Configuration** (Required for local development):
```typescript
export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/raw-fun-ui'
      ]
    }
  }
});
```

## Integration Guide

### Installation (Future npm package)

```bash
npm install raw-fun-ui
```

### Basic Usage

```typescript
// Import CSS (required)
import 'raw-fun-ui/styles';

// Import components
import { RawFunUI } from 'raw-fun-ui';

// Create and show components
const button = RawFunUI.createButton({ text: 'Click Me', variant: 'primary' });
const modal = RawFunUI.createModal({ title: 'Hello', content: 'World' });
modal.show();  // Show the modal

// Use convenience methods (automatically shown, returns modal instance)
RawFunUI.showNotification('Success!', 'Operation completed.');
RawFunUI.showError('Error!', 'Something went wrong.');

const confirmModal = RawFunUI.showConfirmation(
  'Confirm',
  'Are you sure?',
  () => console.log('Confirmed'),
  () => console.log('Cancelled')
);
// Modal is already shown, but you can close it programmatically
// confirmModal.close();
```

### TypeScript Support

Full type definitions are included:

```typescript
import { RfuiButtonOptions, RfuiModalOptions, RfuiModalInstance } from 'raw-fun-ui';

const buttonOptions: RfuiButtonOptions = {
  text: 'Submit',
  variant: 'primary',
  onClick: () => {},
  disabled: false
};

// Modal instance is fully typed
const modal: RfuiModalInstance = RawFunUI.createModal({
  title: 'Title',
  content: 'Content',
  buttons: []
});

modal.show();  // TypeScript autocomplete available
modal.close(); // TypeScript autocomplete available
```

## API Design Philosophy

### Factory Pattern with Instance Methods

raw-fun-ui uses a **factory method pattern** that returns instances with methods. This provides the best of both worlds:

**Modern Factory Pattern**:
```typescript
const modal = RawFunUI.createModal({});  // Factory method
modal.show();   // Instance method
modal.close();  // Instance method
```

**Why This Pattern?**

1. **Intuitive API**: `modal.show()` is natural and self-documenting
2. **Modern Standard**: Used by popular libraries (Chart.js, Bootstrap 5, Floating UI)
3. **Better Control**: Users decide when to show/close modals
4. **Cleaner Code**: No need to import static utility methods
5. **TypeScript-Friendly**: Full type inference and autocomplete support

**API Examples**:

```typescript
// Manual control - create then show when ready
const modal = RawFunUI.createModal({
  title: 'Confirm',
  content: 'Are you sure?',
  buttons: [{ text: 'OK', onClick: () => {} }]
});
modal.show();  // Show when ready
// modal.close();  // Close programmatically

// Convenience methods - automatically shown
RawFunUI.showNotification('Success!', 'Operation completed.');
RawFunUI.showError('Error!', 'Something went wrong.');
RawFunUI.showConfirmation('Confirm', 'Proceed?', onConfirm, onCancel);
```

**Convenience Methods**:

All convenience methods (`showNotification`, `showError`, `showConfirmation`) automatically show the modal and return instances:

```typescript
// Automatically shown, returns instance for manual control
const notification = RawFunUI.showNotification('Title', 'Message');
// notification.close();  // Can close programmatically if needed

// Simple one-liner for fire-and-forget notifications
RawFunUI.showError('Error!', 'Something went wrong.');
```

## Design Principles

### 1. Pure CSS, No JavaScript Styling

**✅ Correct**:
```typescript
button.className = 'rfui-btn rfui-gradient rfui-3d primary';
```

**❌ Wrong**:
```typescript
button.style.background = 'linear-gradient(...)';
button.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)';
```

All styling belongs in CSS files, not inline styles.

### 2. Consistent Naming Convention

- **Classes**: `rfui-*` prefix (e.g., `rfui-btn`, `rfui-modal`)
- **CSS Variables**: `--rfui-*` prefix (e.g., `--rfui-primary`, `--rfui-shadow-base`)
- **TypeScript**: PascalCase for classes (e.g., `RfuiButton`, `RfuiModal`)

### 3. Component Isolation

Components should not affect external elements. Scope all selectors:

```css
/* ✅ Correct - Scoped to component */
.rfui-modal-wrapper .rfui-modal-body {
  padding: 16px;
}

/* ❌ Wrong - Affects all p tags */
p {
  padding: 16px;
}
```

### 4. Responsive Design

Use the same breakpoints as the original project:

```css
@media (max-width: 840px) { /* Big Widget */ }
@media (max-width: 768px) { /* Tablet */ }
@media (max-width: 560px) { /* Mobile */ }
@media (max-width: 480px) { /* Small Mobile */ }
```

### 5. Z-Index Layering

Use defined z-index variables for consistent layering:

```css
--rfui-z-base: 0;        /* Base elements */
--rfui-z-content: 10;    /* Content within components */
--rfui-z-dropdown: 100;  /* Close buttons, dropdowns */
--rfui-z-overlay-info: 800;   /* Info overlays */
--rfui-z-overlay-modal: 900;  /* Modal overlays */
```

## Common Patterns

### Adding a New Theme

5 files need to be touched when adding a new theme:

1. **Create theme CSS**: `src/styles/themes/_your-theme.css`
   - Use `[data-rfui-theme='your-theme']` selector for all overrides
   - Theme must be SELF-CONTAINED — provide ALL visual properties (base CSS is vanilla/structural only)
   - Follow the structure of `_blocky.css`, `_fall-guys.css`, or `_animal-crossing.css` as a template
   - Override CSS variables first (colors, shadows, borders, radii, typography)
   - Then add component-specific overrides (buttons, modals, cards, info, tags, pages, dropdowns, close buttons)
   - Remember to set `::before { background: none; }` on components if suppressing radial overlays
2. **Create CSS entry**: Add `src/styles/theme-your-theme.css` that imports the theme file
3. **Import in CSS entry**: Add `@import url('./themes/_your-theme.css');` to `src/styles/raw-fun-ui.css` (after existing theme imports)
4. **Update type**: Add theme name to `RfuiTheme` union in `src/types/index.ts`
5. **Update demo**: Add option to theme dropdown in `public/demo.js` (search for the `createDropdown` options array)

**Theme architecture**:
- `vanilla` — structural base with no visual opinion (layout, sizing, typography, transitions)
- `blocky` — dark 3D blocky aesthetic with multi-layer shadows and gradient overlays
- `fall-guys` — bright cartoon style, solid black offset shadows, thick white borders, 16px radius
- `animal-crossing` — flat cozy NookPhone style, soft diffused shadows, earthy tones, 30px containers, 999px pill buttons

**CSS imports** — consumers can import only what they need:
```typescript
// All-in-one (backwards compatible, all themes included)
import 'raw-fun-ui/styles';

// Granular — only ship the theme you use
import 'raw-fun-ui/styles/vanilla';
import 'raw-fun-ui/styles/blocky';
```

### Creating a New Component

1. **Create TypeScript file**: `src/components/RfuiNewComponent.ts`
2. **Create CSS file**: `src/styles/components/_new-component.css`
3. **Define types**: Add to `src/types/index.ts`
4. **Import in main**: Add to `src/index.ts` and `src/styles/raw-fun-ui.css`

### Component Template

```typescript
import type { RfuiNewComponentOptions } from '../types';

export class RfuiNewComponent {
  static create(options: RfuiNewComponentOptions): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'rfui-new-component-wrapper';

    const element = document.createElement('div');
    element.className = 'rfui-new-component rfui-gradient rfui-3d';

    // Apply options
    if (options.className) {
      element.className += ` ${options.className}`;
    }

    wrapper.appendChild(element);
    return wrapper;
  }
}
```

### CSS Template

```css
/* ========================================
   RFUI NEW COMPONENT
   Description of component purpose
   ======================================== */

.rfui-new-component-wrapper {
  position: relative;
}

.rfui-new-component {
  padding: var(--rfui-padding-md);
  background: linear-gradient(
    180deg,
    rgba(85, 223, 255, 0.95) 0%,
    rgba(85, 223, 255, 0.7) 50%,
    rgba(85, 223, 255, 0.5) 100%
  );
  border: var(--rfui-border-width) solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--rfui-shadow-base), var(--rfui-shadow-far), var(--rfui-inset-combined);
}

.rfui-new-component:hover {
  transform: translateY(-2px);
  box-shadow: var(--rfui-shadow-hover), var(--rfui-inset-combined);
}
```

## Publishing Workflow

### Pre-publish Checklist

1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Run `npm run clean && npm run build`
4. Test build output in consuming project
5. Verify all exports work correctly
6. Check TypeScript definitions are generated

### Publishing

```bash
# Ensure you're on main branch and committed
npm run prepublishOnly  # Auto-runs on publish

# Publish to npm
npm publish

# Or publish as scoped package
npm publish --access public
```

## Troubleshooting

### Import Resolution Issues with Vite

**Problem**: `Failed to resolve import "raw-fun-ui/styles"`

**Solution**: Add raw-fun-ui path to Vite's `fs.allow`:
```typescript
export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/raw-fun-ui'
      ]
    }
  }
});
```

### CSS Not Loading

**Problem**: Styles not applied after importing

**Solution**: Ensure CSS import is before other styles:
```typescript
import 'raw-fun-ui/styles';  // Must be first
import './your-app-styles.css';
```

### TypeScript Errors

**Problem**: Cannot find module 'raw-fun-ui'

**Solution**: Rebuild to generate type definitions:
```bash
npm run build
```

## Future Enhancements

Potential additions for future versions:

1. **More Components**: Tabs, Tooltips, Dropdowns, Sliders
2. **Theming API**: Runtime theme switching
3. **Animation Library**: Pre-built entrance/exit animations
4. **Form Components**: Inputs, Checkboxes, Radio buttons with 3D styling
5. **Icon System**: Optional icon support
6. **Accessibility**: ARIA labels, keyboard navigation
7. **RTL Support**: Right-to-left language support

## Contributing Guidelines

When adding new components or modifying existing ones:

1. **Maintain Design Consistency**: All components should follow the 3D blocky aesthetic
2. **Pure CSS Only**: No inline styles, no JavaScript-generated CSS
3. **Type Safety**: All options must have TypeScript interfaces
4. **Responsive**: Test on all defined breakpoints
5. **Scoped Styles**: Never use global selectors that could affect external elements
6. **Documentation**: Update this CLAUDE.md with new patterns and usage examples

## Related Projects

- **Stack Rush**: First game to use Raw Fun UI
- **Crowd Rush**: First project to adopt the Fall Guys theme
- **Raw Fun Game Engine**: Casino game framework that raw-fun-ui integrates with
