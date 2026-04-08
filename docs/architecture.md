---
title: Architecture Overview
layout: default
nav_order: 4
---

# Architecture Overview

Understanding the design and structure of Blocky UI.

## System Architecture

Blocky UI is built with a modular, component-based architecture that emphasizes:
- **Separation of concerns**: TypeScript for logic, CSS for styling
- **Performance**: Pure CSS effects, no runtime styling calculations
- **Type safety**: Full TypeScript support with comprehensive interfaces
- **Framework agnostic**: Works with any JavaScript framework or vanilla JS

## Component Structure

Every Blocky UI component follows a consistent structure:

```
┌─────────────────────────────────────┐
│   Wrapper Element                    │  ← Positioning, transforms
│  ┌───────────────────────────────┐  │
│  │  Main Element                  │  │  ← 3D styling, gradients
│  │  ┌─────────────────────────┐  │  │
│  │  │  Pseudo-element (before) │  │  │  ← Gradient overlay
│  │  └─────────────────────────┘  │  │
│  │  Content Layer                 │  │  ← Text, interactive elements
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Layer Breakdown

1. **Wrapper Element** (`div.blocky-*-wrapper`) — Positioning, transforms, z-index
2. **Main Element** (`div.blocky-*`, `button.blocky-btn`) — 3D styling, gradients, borders
3. **Gradient Overlay** (`::before` pseudo-element) — Radial gradient for depth
4. **Content Layer** — User content, interactive elements

## 3D Effect System

### Multi-layer Box Shadow

```css
.blocky-3d {
  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.3),           /* Base shadow - ground contact */
    0 8px 16px rgba(0, 0, 0, 0.4),        /* Far shadow - depth */
    inset 0 2px 0 rgba(255, 255, 255, 0.2), /* Top highlight */
    inset 0 -2px 0 rgba(0, 0, 0, 0.3);    /* Bottom shadow */
}
```

### Hover Transform

```css
.blocky-3d:hover {
  transform: translateY(-3px);
  box-shadow:
    0 6px 0 rgba(0, 0, 0, 0.3),
    0 12px 24px rgba(0, 0, 0, 0.5),
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
│   └── _responsive.css    # Media queries
├── animations/
│   ├── _keyframes.css     # Animation definitions
│   └── _hover-effects.css # Interactive 3D hover states
├── components/
│   ├── _button.css
│   ├── _modal.css
│   ├── _card.css
│   ├── _info.css
│   ├── _tag.css
│   ├── _page.css
│   └── _dropdown.css
└── themes/
    ├── _fall-guys.css
    └── _animal-crossing.css
```

### CSS Cascade Strategy

1. **Variables** → Color palette, spacing, shadows
2. **Shared styles** → `.blocky-3d`, `.blocky-gradient`, `.blocky-disabled`
3. **Component styles** → Component-specific layouts and variants
4. **Responsive** → Mobile-first media queries
5. **Themes** → Override variables and component styles per theme

## TypeScript Architecture

### Component Factory Pattern

```typescript
export class BlockyButton {
  static create(options: BlockyButtonOptions): HTMLButtonElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-btn-wrapper';

    const button = document.createElement('button');
    button.className = `blocky-btn blocky-gradient blocky-3d ${options.variant || 'default'}`;

    button.textContent = options.text;
    if (options.onClick) button.addEventListener('click', options.onClick);

    wrapper.appendChild(button);
    return wrapper as any;
  }
}
```

### Modal Instance Pattern

```typescript
export interface BlockyModalInstance {
  show(): void;
  close(): void;
  element: HTMLDivElement;
}
```

Modals return instance objects for manual control — `modal.show()` / `modal.close()`.

## Build Pipeline

| Output | Format | Purpose |
|--------|--------|---------|
| `index.esm.js` | ES Module | Modern bundlers (Vite, Webpack, Rollup) |
| `index.cjs.js` | CommonJS | Node.js, older tools |
| `index.umd.js` | UMD | Browser `<script>` tags |
| `index.d.ts` | TypeScript | Type definitions |
| `blocky-ui.css` | CSS | Compiled and minified styles |

## Responsive Design

Mobile-first with 4 breakpoints:

| Breakpoint | Width | Target |
|-----------|-------|--------|
| Small Mobile | 480px | Phones |
| Mobile/Tablet | 560px | Large phones |
| Tablet | 768px | Tablets |
| Large Tablet | 840px | Small desktops |

## Performance

- **Pure CSS**: No runtime CSS generation, hardware-accelerated transforms
- **Zero Dependencies**: No external libraries
- **Tree-shaking**: ES Module format
- **~30KB total**: JavaScript + CSS combined
