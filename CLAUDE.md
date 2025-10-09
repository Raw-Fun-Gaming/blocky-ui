# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blocky UI is a lightweight, 3D blocky-themed UI component library built with TypeScript and pure CSS. It provides casino-game-style UI components with distinctive 3D depth effects, gradient backgrounds, and blocky aesthetics.

**Design Inspiration**: The library's visual style is inspired by the multiplierTag component from Stack Rush, featuring multi-layer box-shadows for depth, gradient backgrounds with radial overlays, and bold border styling.

## Tech Stack

- **TypeScript**: Type-safe component API with full type definitions
- **Pure CSS**: No SVG generation, no runtime styling - all effects are CSS-based
- **Rollup**: Build tool for ESM, CJS, UMD, and TypeScript definitions
- **PostCSS**: CSS processing and bundling
- **Zero Dependencies**: No runtime dependencies for maximum portability

## Core Design Philosophy

### 3D Blocky Aesthetic

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
blocky-ui/
├── src/
│   ├── components/          # Component TypeScript files
│   │   ├── BlockyButton.ts
│   │   ├── BlockyModal.ts
│   │   ├── BlockyCard.ts
│   │   ├── BlockyInfo.ts
│   │   └── BlockyTag.ts
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
│   │   └── blocky-ui.css         # Main entry point
│   ├── types/
│   │   └── index.ts              # TypeScript type definitions
│   └── index.ts                  # Main export
├── dist/                    # Build output (generated)
│   ├── index.esm.js
│   ├── index.cjs.js
│   ├── index.umd.js
│   ├── index.d.ts
│   └── blocky-ui.css
├── rollup.config.js         # Build configuration
├── tsconfig.json
└── package.json
```

### Component Pattern

All components follow a static factory pattern with consistent API:

```typescript
export class BlockyButton {
  static create(options: BlockyButtonOptions): HTMLButtonElement {
    // 1. Create wrapper element
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-btn-wrapper';

    // 2. Create main element with blocky classes
    const button = document.createElement('button');
    button.className = `blocky-btn blocky-gradient blocky-3d ${options.variant || 'default'}`;

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
export interface BlockyModalInstance {
  show(): void;    // Add modal to DOM and display
  close(): void;   // Remove modal from DOM with animation
  element: HTMLDivElement;  // Access to underlying DOM element
}

// Create modal - returns instance
const modal = BlockyModal.create(options);

// Manual control
modal.show();   // Display the modal
modal.close();  // Close the modal programmatically

// Convenience methods automatically show and return instances
const notification = BlockyUI.showNotification('Title', 'Message');
// Modal is already shown, instance returned for manual control if needed

const confirmation = BlockyUI.showConfirmation('Title', 'Message', onConfirm, onCancel);
// Modal is already shown
```

**Benefits of Instance Pattern**:
- ✅ Intuitive API - `modal.show()` is natural and self-documenting
- ✅ Better control - choose when to show/close
- ✅ Cleaner code - no static method imports needed
- ✅ TypeScript-friendly with BlockyModalInstance type
- ✅ Consistent with modern UI libraries (Chart.js, Bootstrap 5)

## Available Components

### 1. BlockyButton

**Purpose**: Interactive buttons with 4 color variants and 3D hover effects

**Variants**:
- `default`: Gray gradient (100, 100, 100)
- `primary`: Blue gradient (4, 123, 255)
- `secondary`: Cyan gradient (85, 223, 255)
- `danger`: Red gradient (255, 68, 68)

**Usage**:
```typescript
import { BlockyUI } from 'blocky-ui';

const button = BlockyUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked'),
  disabled: false
});

document.body.appendChild(button);
```

### 2. BlockyModal

**Purpose**: Overlay modals with backdrop blur, close button, and footer actions

**Features**:
- Auto-close on overlay click or Escape key
- Optional close button
- Footer with multiple action buttons
- Smooth slide-in animation

**Usage**:
```typescript
const modal = BlockyUI.createModal({
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

### 3. BlockyCard

**Purpose**: Content containers with 3D styling and optional headers

**Usage**:
```typescript
const card = BlockyUI.createCard({
  title: 'Card Title',
  content: 'Card content goes here',
  variant: 'default'
});
```

### 4. BlockyInfo

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
BlockyUI.showNotification(
  'Success!',
  'Your action was completed.',
  () => console.log('Notification closed')
);
```

### 5. BlockyTag

**Purpose**: Small label-style tags with compact styling

**Usage**:
```typescript
const tag = BlockyUI.createTag({
  text: '×2.5',
  variant: 'primary'
});
```

## CSS Architecture

### CSS Custom Properties

All styling uses CSS variables for consistency and easy theming:

```css
:root {
  /* Colors */
  --blocky-primary: #55dfff;
  --blocky-danger: #ff4444;

  /* 3D Effects */
  --blocky-shadow-base: 0 4px 0 rgba(0, 0, 0, 0.3);
  --blocky-shadow-far: 0 8px 16px rgba(0, 0, 0, 0.4);

  /* Spacing */
  --blocky-padding-md: 12px;
  --blocky-border-radius: 6px;

  /* Z-Index Layers */
  --blocky-z-content: 10;
  --blocky-z-dropdown: 100;
  --blocky-z-overlay-modal: 900;
}
```

### Shared CSS Classes

**Base 3D Effect**:
```css
.blocky-3d {
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  box-shadow: var(--blocky-shadow-base), var(--blocky-shadow-far), var(--blocky-inset-combined);
  backdrop-filter: blur(8px);
}
```

**Gradient Overlay**:
```css
.blocky-gradient::before {
  content: '';
  position: absolute;
  background: radial-gradient(circle at center, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  z-index: 1;
  pointer-events: none;
}
```

**Close Button** (Shared by Modal and Info):
```css
.blocky-close-btn {
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

**IMPORTANT**: Disabled styles only affect blocky components to avoid conflicts:

```css
/* ✅ Correct - Scoped to blocky components */
.blocky-disabled,
.blocky-btn[disabled],
.blocky-btn-wrapper [disabled],
.blocky-modal-wrapper [disabled] {
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
- `dist/blocky-ui.css` - Compiled CSS bundle

### Testing Locally in Another Project

**Method 1: File Dependency**
```json
{
  "dependencies": {
    "blocky-ui": "file:../blocky-ui"
  }
}
```

**Method 2: npm link**
```bash
# In blocky-ui directory
npm link

# In consuming project
npm link blocky-ui
```

**Vite Configuration** (Required for local development):
```typescript
export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/blocky-ui'
      ]
    }
  }
});
```

## Integration Guide

### Installation (Future npm package)

```bash
npm install blocky-ui
```

### Basic Usage

```typescript
// Import CSS (required)
import 'blocky-ui/styles';

// Import components
import { BlockyUI } from 'blocky-ui';

// Create and show components
const button = BlockyUI.createButton({ text: 'Click Me', variant: 'primary' });
const modal = BlockyUI.createModal({ title: 'Hello', content: 'World' });
modal.show();  // Show the modal

// Use convenience methods (automatically shown, returns modal instance)
BlockyUI.showNotification('Success!', 'Operation completed.');
BlockyUI.showError('Error!', 'Something went wrong.');

const confirmModal = BlockyUI.showConfirmation(
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
import { BlockyButtonOptions, BlockyModalOptions, BlockyModalInstance } from 'blocky-ui';

const buttonOptions: BlockyButtonOptions = {
  text: 'Submit',
  variant: 'primary',
  onClick: () => {},
  disabled: false
};

// Modal instance is fully typed
const modal: BlockyModalInstance = BlockyUI.createModal({
  title: 'Title',
  content: 'Content',
  buttons: []
});

modal.show();  // TypeScript autocomplete available
modal.close(); // TypeScript autocomplete available
```

## API Design Philosophy

### Factory Pattern with Instance Methods

blocky-ui uses a **factory method pattern** that returns instances with methods. This provides the best of both worlds:

**Modern Factory Pattern**:
```typescript
const modal = BlockyUI.createModal({});  // Factory method
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
const modal = BlockyUI.createModal({
  title: 'Confirm',
  content: 'Are you sure?',
  buttons: [{ text: 'OK', onClick: () => {} }]
});
modal.show();  // Show when ready
// modal.close();  // Close programmatically

// Convenience methods - automatically shown
BlockyUI.showNotification('Success!', 'Operation completed.');
BlockyUI.showError('Error!', 'Something went wrong.');
BlockyUI.showConfirmation('Confirm', 'Proceed?', onConfirm, onCancel);
```

**Convenience Methods**:

All convenience methods (`showNotification`, `showError`, `showConfirmation`) automatically show the modal and return instances:

```typescript
// Automatically shown, returns instance for manual control
const notification = BlockyUI.showNotification('Title', 'Message');
// notification.close();  // Can close programmatically if needed

// Simple one-liner for fire-and-forget notifications
BlockyUI.showError('Error!', 'Something went wrong.');
```

## Design Principles

### 1. Pure CSS, No JavaScript Styling

**✅ Correct**:
```typescript
button.className = 'blocky-btn blocky-gradient blocky-3d primary';
```

**❌ Wrong**:
```typescript
button.style.background = 'linear-gradient(...)';
button.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)';
```

All styling belongs in CSS files, not inline styles.

### 2. Consistent Naming Convention

- **Classes**: `blocky-*` prefix (e.g., `blocky-btn`, `blocky-modal`)
- **CSS Variables**: `--blocky-*` prefix (e.g., `--blocky-primary`, `--blocky-shadow-base`)
- **TypeScript**: PascalCase for classes (e.g., `BlockyButton`, `BlockyModal`)

### 3. Component Isolation

Components should not affect external elements. Scope all selectors:

```css
/* ✅ Correct - Scoped to component */
.blocky-modal-wrapper .blocky-modal-body {
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
--blocky-z-base: 0;        /* Base elements */
--blocky-z-content: 10;    /* Content within components */
--blocky-z-dropdown: 100;  /* Close buttons, dropdowns */
--blocky-z-overlay-info: 800;   /* Info overlays */
--blocky-z-overlay-modal: 900;  /* Modal overlays */
```

## Common Patterns

### Creating a New Component

1. **Create TypeScript file**: `src/components/BlockyNewComponent.ts`
2. **Create CSS file**: `src/styles/components/_new-component.css`
3. **Define types**: Add to `src/types/index.ts`
4. **Import in main**: Add to `src/index.ts` and `src/styles/blocky-ui.css`

### Component Template

```typescript
import type { BlockyNewComponentOptions } from '../types';

export class BlockyNewComponent {
  static create(options: BlockyNewComponentOptions): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-new-component-wrapper';

    const element = document.createElement('div');
    element.className = 'blocky-new-component blocky-gradient blocky-3d';

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
   BLOCKY NEW COMPONENT
   Description of component purpose
   ======================================== */

.blocky-new-component-wrapper {
  position: relative;
}

.blocky-new-component {
  padding: var(--blocky-padding-md);
  background: linear-gradient(
    180deg,
    rgba(85, 223, 255, 0.95) 0%,
    rgba(85, 223, 255, 0.7) 50%,
    rgba(85, 223, 255, 0.5) 100%
  );
  border: var(--blocky-border-width) solid rgba(255, 255, 255, 0.3);
  box-shadow: var(--blocky-shadow-base), var(--blocky-shadow-far), var(--blocky-inset-combined);
}

.blocky-new-component:hover {
  transform: translateY(-2px);
  box-shadow: var(--blocky-shadow-hover), var(--blocky-inset-combined);
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

**Problem**: `Failed to resolve import "blocky-ui/styles"`

**Solution**: Add blocky-ui path to Vite's `fs.allow`:
```typescript
export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/blocky-ui'
      ]
    }
  }
});
```

### CSS Not Loading

**Problem**: Styles not applied after importing

**Solution**: Ensure CSS import is before other styles:
```typescript
import 'blocky-ui/styles';  // Must be first
import './your-app-styles.css';
```

### TypeScript Errors

**Problem**: Cannot find module 'blocky-ui'

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

- **Stack Rush**: Original project where the blocky aesthetic was born
- **Planet Blue Invasion**: Project that used cosmic-ui-lite (predecessor)
- **fuR Gaming Engine**: Casino game framework that blocky-ui integrates with
