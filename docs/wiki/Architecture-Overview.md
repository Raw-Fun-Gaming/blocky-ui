# Architecture Overview

Understanding the design and structure of Blocky UI.

## System Architecture

Blocky UI is built with a modular, component-based architecture that emphasizes:
- **Separation of concerns**: TypeScript for logic, CSS for styling
- **Performance**: Pure CSS effects, no runtime styling calculations
- **Type safety**: Full TypeScript support with comprehensive interfaces
- **Framework agnostic**: Works with any JavaScript framework or vanilla JS

## Component Structure

### Anatomy of a Blocky Component

Every Blocky UI component follows a consistent structure:

```
┌─────────────────────────────────────┐
│   Wrapper Element                    │  ← Positioning, transforms
│  ┌───────────────────────────────┐  │
│  │  Main Element                  │  │  ← 3D styling, gradients
│  │  ┌─────────────────────────┐  │  │
│  │  │  Pseudo-element (before) │  │  │  ← Gradient overlay
│  │  └─────────────────────────┘  │  │
│  │                                │  │
│  │  Content Layer                 │  │  ← Text, interactive elements
│  │                                │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  Pseudo-element (after)  │  │  │  ← Additional effects
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Layer Breakdown

1. **Wrapper Element** (`div.blocky-*-wrapper`)
   - Handles positioning (relative, absolute)
   - Contains transforms for hover/active states
   - Manages z-index layering

2. **Main Element** (`div.blocky-*`, `button.blocky-btn`)
   - Core visual styling with CSS classes
   - Multi-layer box shadows for 3D depth
   - Gradient backgrounds
   - Border styling

3. **Gradient Overlay** (`::before` pseudo-element)
   - Radial gradient for depth perception
   - Pointer-events disabled
   - Positioned absolutely within main element

4. **Content Layer**
   - User-provided content (text, HTML)
   - Interactive elements (buttons in modals)
   - Z-index above pseudo-elements

## 3D Effect System

### Multi-layer Box Shadow

Blocky UI achieves its distinctive 3D look through carefully layered box shadows:

```css
.blocky-3d {
  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.3),           /* Base shadow - ground contact */
    0 8px 16px rgba(0, 0, 0, 0.4),        /* Far shadow - depth */
    inset 0 2px 0 rgba(255, 255, 255, 0.2), /* Top highlight - light source */
    inset 0 -2px 0 rgba(0, 0, 0, 0.3);    /* Bottom shadow - depth */
}
```

**Effect Layers:**
1. **Base shadow** (4px): Creates ground contact illusion
2. **Far shadow** (8px blur): Extends depth perception
3. **Inset top highlight**: Simulates light hitting top edge
4. **Inset bottom shadow**: Enhances depth on bottom edge

### Hover Transform

```css
.blocky-3d:hover {
  transform: translateY(-3px);  /* Lift component */
  box-shadow:
    0 6px 0 rgba(0, 0, 0, 0.3),           /* Adjusted base */
    0 12px 24px rgba(0, 0, 0, 0.5),       /* Enhanced far shadow */
    inset 0 2px 0 rgba(255, 255, 255, 0.2),
    inset 0 -2px 0 rgba(0, 0, 0, 0.3);
}
```

## CSS Architecture

### File Organization

```
src/styles/
├── blocky-ui.css          # Main entry point
├── base/
│   ├── _variables.css     # CSS custom properties
│   ├── _shared.css        # Shared component styles
│   ├── _responsive.css    # Media queries
│   └── _animations.css    # Keyframe animations
└── components/
    ├── _button.css        # BlockyButton styles
    ├── _modal.css         # BlockyModal styles
    ├── _card.css          # BlockyCard styles
    ├── _info.css          # BlockyInfo styles
    ├── _tag.css           # BlockyTag styles
    └── _page.css          # BlockyPage styles
```

### CSS Cascade Strategy

1. **Variables** → Define color palette, spacing, shadows
2. **Shared styles** → `.blocky-3d`, `.blocky-gradient`, `.blocky-disabled`
3. **Component styles** → Component-specific layouts and variants
4. **Responsive** → Mobile-first media queries
5. **Animations** → Keyframes for advanced effects

### CSS Custom Properties

```css
:root {
  /* Colors */
  --blocky-primary: #55dfff;
  --blocky-danger: #ff4444;
  --blocky-gray: rgb(100, 100, 100);

  /* 3D Effects */
  --blocky-shadow-base: 0 4px 0 rgba(0, 0, 0, 0.3);
  --blocky-shadow-far: 0 8px 16px rgba(0, 0, 0, 0.4);
  --blocky-inset-combined: inset 0 2px 0 rgba(255, 255, 255, 0.2),
                           inset 0 -2px 0 rgba(0, 0, 0, 0.3);

  /* Spacing */
  --blocky-padding-sm: 8px;
  --blocky-padding-md: 12px;
  --blocky-padding-lg: 16px;

  /* Border */
  --blocky-border-width: 3px;
  --blocky-border-radius: 6px;

  /* Z-Index Layers */
  --blocky-z-base: 0;
  --blocky-z-content: 10;
  --blocky-z-dropdown: 100;
  --blocky-z-overlay-info: 800;
  --blocky-z-overlay-modal: 900;
}
```

## TypeScript Architecture

### Component Factory Pattern

All components use a static factory method pattern:

```typescript
export class BlockyButton {
  static create(options: BlockyButtonOptions): HTMLButtonElement {
    // 1. Create wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-btn-wrapper';

    // 2. Create main element
    const button = document.createElement('button');
    button.className = `blocky-btn blocky-gradient blocky-3d ${options.variant || 'default'}`;

    // 3. Apply options
    button.textContent = options.text;
    if (options.onClick) button.addEventListener('click', options.onClick);
    if (options.disabled) button.disabled = true;

    // 4. Assemble and return
    wrapper.appendChild(button);
    return wrapper as any;  // Type assertion for API consistency
  }
}
```

### Modal Instance Pattern

Modals return instance objects for manual control:

```typescript
export interface BlockyModalInstance {
  show(): void;     // Add modal to DOM and display
  close(): void;    // Remove modal from DOM with animation
  element: HTMLDivElement;  // Access to underlying DOM element
}

export class BlockyModal {
  static create(options: BlockyModalOptions): BlockyModalInstance {
    const modal = this.createModalElement(options);

    return {
      show: () => document.body.appendChild(modal),
      close: () => {
        modal.classList.add('closing');
        setTimeout(() => modal.remove(), 300);
      },
      element: modal
    };
  }
}
```

**Benefits:**
- Intuitive API: `modal.show()` / `modal.close()`
- Better control: Users decide when to show/close
- TypeScript-friendly: Full type inference
- Modern pattern: Used by Chart.js, Bootstrap 5

### Type System

```typescript
// Core interfaces
export interface BlockyButtonOptions {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface BlockyModalOptions {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  buttons: BlockyButtonOptions[];
  onClose?: () => void;
  className?: string;
}

// Main export
export class BlockyUI {
  static createButton = BlockyButton.create;
  static createModal = BlockyModal.create;
  // ... other components
}
```

## Build Pipeline

### Rollup Configuration

```javascript
// rollup.config.js
export default [
  // JavaScript/TypeScript
  {
    input: 'src/index.ts',
    output: [
      { file: 'dist/index.esm.js', format: 'es' },    // ES Module
      { file: 'dist/index.cjs.js', format: 'cjs' },   // CommonJS
      { file: 'dist/index.umd.js', format: 'umd', name: 'BlockyUI' }  // UMD
    ],
    plugins: [
      resolve(),      // Resolve node_modules
      commonjs(),     // Convert CommonJS to ES6
      typescript(),   // Compile TypeScript
      terser()        // Minification
    ]
  },
  // CSS
  {
    input: 'src/styles/blocky-ui.css',
    output: { file: 'dist/blocky-ui.css' },
    plugins: [
      postcss({
        extract: true,
        minimize: true
      })
    ]
  },
  // Type Definitions
  {
    input: 'src/index.ts',
    output: { file: 'dist/index.d.ts' },
    plugins: [dts()]
  }
];
```

### Build Outputs

| File | Format | Purpose |
|------|--------|---------|
| `index.esm.js` | ES Module | Modern bundlers (Webpack, Rollup, Vite) |
| `index.cjs.js` | CommonJS | Node.js, older tools |
| `index.umd.js` | UMD | Browser `<script>` tags, RequireJS |
| `index.d.ts` | TypeScript | Type definitions |
| `blocky-ui.css` | CSS | Compiled and minified styles |

## Responsive Design

### Breakpoint Strategy

Mobile-first approach with 4 breakpoints:

```css
/* Mobile (default) */
.blocky-btn {
  padding: 10px 20px;
  font-size: 14px;
}

/* Small Mobile */
@media (max-width: 480px) {
  .blocky-btn {
    padding: 8px 16px;
    font-size: 13px;
  }
}

/* Mobile/Tablet */
@media (max-width: 560px) {
  .blocky-modal {
    width: 90%;
    max-width: none;
  }
}

/* Tablet */
@media (max-width: 768px) {
  .blocky-card {
    max-width: 100%;
  }
}

/* Large Tablet */
@media (max-width: 840px) {
  .blocky-page {
    padding: 20px;
  }
}
```

## Performance Optimizations

### Pure CSS Approach
- **No runtime CSS generation**: All styling in CSS files
- **Hardware acceleration**: Transform and opacity for animations
- **Reduced JavaScript**: Minimal DOM manipulation

### Efficient Animations
```css
/* Use transform and opacity (GPU-accelerated) */
.blocky-btn:hover {
  transform: translateY(-3px);  /* GPU */
  opacity: 0.95;                /* GPU */
}

/* Avoid (CPU-intensive) */
.blocky-btn:hover {
  top: -3px;        /* Triggers layout */
  width: 101%;      /* Triggers layout */
}
```

### Minimal Bundle Size
- Zero dependencies: No external libraries
- Tree-shaking support: ES Module format
- Minified output: Terser compression
- ~30KB total: JavaScript + CSS combined

## Design Patterns

### Component Isolation
All selectors scoped to `.blocky-*` prefix:

```css
/* ✅ Correct - Scoped */
.blocky-btn {
  padding: 12px;
}

/* ❌ Wrong - Global */
button {
  padding: 12px;
}
```

### Accessibility
- Semantic HTML elements
- Keyboard navigation (Tab, Enter, Escape)
- ARIA attributes where appropriate
- Focus visible styles

### Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Flexbox and Grid for layouts
- CSS Custom Properties for theming
- No IE11 support (uses modern CSS features)

## Next Steps

- [Component Reference](Component-Reference) - Detailed API documentation
- [Complete Examples](Complete-Examples) - Real-world usage examples
- [Troubleshooting](Troubleshooting) - Common issues and solutions

---

**Understanding the architecture helps you customize and extend Blocky UI effectively! 🎮**
