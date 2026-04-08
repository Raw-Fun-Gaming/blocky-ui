---
title: Blocky (Default)
layout: default
parent: Themes
nav_order: 1
---

# Blocky Theme — Design Spec

## Context

The **Blocky** theme is the default dark 3D aesthetic. Inspired by the Stack Rush multiplier tag component, it features multi-layer box shadows for depth, gradient backgrounds with radial overlays, and bold border styling.

## Theme Name

`blocky` — the default theme. No `data-rfui-theme` attribute needed (or use `RawFunUI.setTheme('blocky')` to reset).

## Color Palette

Dark, semi-transparent palette with neon accents:

| Token | Hex / Value | Role |
|-------|-------------|------|
| Cyan | `#55dfff` | Primary |
| Blue | `#047bff` | Primary dark |
| Green | `#1ce61c` | Success |
| Yellow | `#ffc201` | Warning |
| Red | `#ff4444` | Danger |
| White | `#ffffff` | Text primary |
| Dark | `rgba(0, 0, 0, 0.3)` | Backgrounds |

### Button Variant Mapping

| Variant | Background | Text Color |
|---------|-----------|------------|
| `default` | `rgba(100, 100, 100, 0.9)` (gray gradient) | `#ffffff` |
| `primary` | `rgba(4, 123, 255, 0.9)` (blue gradient) | `#ffffff` |
| `secondary` | `rgba(85, 223, 255, 0.9)` (cyan gradient) | `#ffffff` |
| `danger` | `rgba(255, 68, 68, 0.9)` (red gradient) | `#ffffff` |

### Info Title Colors

| Theme | Color |
|-------|-------|
| `yellow` | `rgba(255, 194, 1, 0.9)` |
| `green` | `rgba(28, 230, 28, 0.9)` |
| `blue` | `rgba(4, 123, 255, 0.9)` |
| `purple` | `rgba(150, 50, 255, 0.9)` |
| `red` | `rgba(255, 68, 68, 0.9)` |

## Depth & Shadows

**Multi-layer 3D box shadows** — the signature blocky look with hard offset base shadows and diffused far shadows.

| Token | Value |
|-------|-------|
| `--rfui-shadow-base` | `0 4px 0 rgba(0, 0, 0, 0.3)` |
| `--rfui-shadow-far` | `0 8px 16px rgba(0, 0, 0, 0.4)` |
| `--rfui-shadow-hover` | `0 6px 0 rgba(0, 0, 0, 0.3), 0 12px 24px rgba(0, 0, 0, 0.5)` |
| `--rfui-shadow-active` | `0 2px 0 rgba(0, 0, 0, 0.3), 0 4px 8px rgba(0, 0, 0, 0.4)` |
| `--rfui-inset-highlight` | `inset 0 2px 0 rgba(255, 255, 255, 0.2)` |
| `--rfui-inset-shadow` | `inset 0 -2px 0 rgba(0, 0, 0, 0.3)` |

Radial gradient overlays on `::before` pseudo-elements. Backdrop-filter blur on overlays.

## Border Radius

Modest, blocky corners:

| Token | Value |
|-------|-------|
| `--rfui-border-radius` | `6px` |
| `--rfui-border-radius-sm` | `4px` |
| `--rfui-border-radius-lg` | `8px` |

## Borders

Thin, semi-transparent white borders:

| Token | Value |
|-------|-------|
| `--rfui-border-width` | `3px` |
| `--rfui-border-width-thin` | `2px` |
| `--rfui-border-width-thick` | `4px` |
| Border color | `rgba(255, 255, 255, 0.3)` |

## Typography

| Token | Value |
|-------|-------|
| `--rfui-text-primary` | `#ffffff` |
| `--rfui-text-secondary` | `rgba(255, 255, 255, 0.8)` |
| `--rfui-text-disabled` | `#666666` |
| `--rfui-font-weight-normal` | `400` |
| `--rfui-font-weight-medium` | `500` |
| `--rfui-font-weight-bold` | `700` |
| `--rfui-text-shadow-sm` | `0 1px 2px rgba(0, 0, 0, 0.5)` |
| `--rfui-text-shadow-md` | `0 2px 4px rgba(0, 0, 0, 0.5)` |

## Gradients

Multi-stop linear gradients with transparency, plus radial overlays via `::before`:

```css
/* Example: button gradient */
background: linear-gradient(
  180deg,
  rgba(85, 223, 255, 0.95) 0%,
  rgba(85, 223, 255, 0.7) 50%,
  rgba(85, 223, 255, 0.5) 100%
);

/* ::before radial overlay for depth */
background: radial-gradient(
  circle at center,
  rgba(255, 255, 255, 0.2) 0%,
  transparent 70%
);
```

## Hover & Active States

| State | Transform | Shadow |
|-------|-----------|--------|
| Hover | `translateY(-3px)` | `--rfui-shadow-hover` |
| Active | `translateY(1px)` | `--rfui-shadow-active` |

## Component-Specific Notes

### Buttons
- 6px border radius
- Semi-transparent gradient backgrounds
- Radial overlay on `::before`
- Backdrop blur (`blur(8px)`)

### Modals
- Dark overlay (`rgba(0, 0, 0, 0.9)`)
- Gradient background with radial overlay
- Backdrop blur on overlay
- White text throughout

### Cards
- Semi-transparent dark backgrounds
- Multi-layer box shadows for depth
- Radial overlay for shine effect

### Info/Notifications
- Semi-transparent dark background
- Colored title text (5 color themes)
- Dark overlay backdrop

### Tags
- Compact with 3D shadow layers
- Gradient backgrounds matching variants

### Pages
- Animated gradient borders cycling through 7 color sets
- Dark overlay background
- Backdrop blur

### Close Button
- Red gradient (`#ff4444`)
- 3D shadow layers
- White text
