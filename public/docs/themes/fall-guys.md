---
title: Fall Guys
layout: default
parent: Themes
nav_order: 2
---

# Fall Guys Theme — Design Spec

## Context

The **Fall Guys** theme is a bright, playful, cartoon-style UI inspired by the Fall Guys game aesthetic. Light cyan backgrounds, solid black drop shadows, thick white borders, and very rounded corners.

## Theme Name

`fall-guys` — applied via `data-blocky-theme="fall-guys"` on the root element.

## Color Palette

Bright, vibrant, candy-like palette:

| Token | Hex | Role |
|-------|-----|------|
| Cyan | `#00d4ff` | Primary |
| Hot Pink | `#ff5096` | Button primary |
| Purple | `#9b59b6` | Button secondary |
| Coral Red | `#ff6b6b` | Danger |
| Yellow | `#ffd93d` | Warning / Header yellow |
| Green | `#4cd964` | Success |
| Light Cyan | `#64d4ff` | Container backgrounds |
| Dark Navy | `#1a1a2e` | Text on light backgrounds |

### Button Variant Mapping

| Variant | Background | Text Color |
|---------|-----------|------------|
| `default` | `#64d4ff` → `#4ac8f5` (cyan gradient) | `#1a1a2e` (dark) |
| `primary` | `#ff5096` → `#e6407d` (hot pink gradient) | `#ffffff` |
| `secondary` | `#9b59b6` → `#8447a0` (purple gradient) | `#ffffff` |
| `danger` | `#ff6b6b` → `#e65555` (coral red gradient) | `#ffffff` |

### Info Title Colors

| Theme | Color |
|-------|-------|
| `yellow` | `#f5a623` |
| `green` | `#4cd964` |
| `blue` | `#0984e3` |
| `purple` | `#9b59b6` |
| `red` | `#ff6b6b` |

### Header Bar

Default header: purple gradient (`#9b59b6` → `#b370d4`), white text. Five color variants available (yellow, green, blue, purple, red).

## Depth & Shadows

**Solid black offset shadows** — hard, bottom-right, no blur. Creates a cartoon sticker/cutout look.

| Token | Value |
|-------|-------|
| `--blocky-shadow-base` | `4px 4px 0 #000000` |
| `--blocky-shadow-far` | `6px 6px 0 #000000` |
| `--blocky-shadow-hover` | `8px 8px 0 #000000` |
| `--blocky-shadow-active` | `2px 2px 0 #000000` |
| `--blocky-inset-highlight` | `inset 0 2px 0 rgba(255, 255, 255, 0.4)` |
| `--blocky-inset-shadow` | `inset 0 -2px 0 rgba(0, 0, 0, 0.1)` |

Radial gradient overlays on `::before` (top highlight). No backdrop-filter blur.

## Border Radius

Very rounded, cartoon-like:

| Token | Value |
|-------|-------|
| `--blocky-border-radius` | `16px` |
| `--blocky-border-radius-sm` | `12px` |
| `--blocky-border-radius-lg` | `20px` |

## Borders

Thick, solid white borders:

| Token | Value |
|-------|-------|
| `--blocky-border-width` | `4px` |
| `--blocky-border-width-thin` | `3px` |
| `--blocky-border-width-thick` | `5px` |
| `--blocky-border-color` | `#ffffff` |

## Typography

| Token | Value |
|-------|-------|
| `--blocky-text-primary` | `#1a1a2e` (dark text on light backgrounds) |
| `--blocky-text-secondary` | `rgba(26, 26, 46, 0.8)` |
| `--blocky-text-disabled` | `#a0a0a0` |
| `--blocky-text-light` | `#ffffff` |
| `--blocky-font-weight-normal` | `500` |
| `--blocky-font-weight-medium` | `600` |
| `--blocky-font-weight-bold` | `800` |
| `--blocky-text-shadow-sm` | `1px 1px 0 rgba(0, 0, 0, 0.2)` |
| `--blocky-text-shadow-md` | `2px 2px 0 rgba(0, 0, 0, 0.2)` |

## Gradients

Three-stop linear gradients for candy-like depth. Radial overlay on `::before` for top shine:

```css
/* Example: light cyan container */
background: linear-gradient(
  180deg,
  #7ee0ff 0%,
  #64d4ff 50%,
  #4ac8f5 100%
);

/* ::before radial overlay for shine */
background: radial-gradient(
  circle at center top,
  rgba(255, 255, 255, 0.4) 0%,
  transparent 50%
);
```

## Hover & Active States

| State | Transform | Shadow |
|-------|-----------|--------|
| Hover | `translate(-2px, -2px)` | `--blocky-shadow-hover` |
| Active | `translate(2px, 2px)` | `--blocky-shadow-active` |

Diagonal movement (both X and Y axes) — creates a "peeling off" cartoon effect.

## Component-Specific Notes

### Buttons
- 16px border radius
- Thin white border (`2px solid rgba(255,255,255,0.5)`)
- Hover/active transforms on wrapper
- Radial overlay for top shine

### Modals
- Light cyan gradient background
- Colored header bar (default purple)
- Thick white border, 20px radius
- Dark text on light background

### Cards
- Light cyan gradient background
- Colored header bars per variant
- Header color system: yellow, green, blue, purple, red
- Hover: diagonal translate (`-3px, -3px`)

### Info/Notifications
- Light cyan background
- Colored title text with text-shadow
- 20px radius

### Tags
- Light cyan gradient
- Thin white border
- 12px radius

### Dropdowns
- Three-layer background-image (arrow chevrons + gradient)
- Variant colors for each dropdown type

### Pages
- Light cyan gradient background
- Bright page border gradient (pink, purple, cyan)

### Close Button
- Coral red gradient
- Thick white border (`3px`)
- Hover: diagonal translate (`-1px, -1px`)

## Game Engine Design Tokens

```css
--game-text-primary: #1a1a2e;
--game-text-secondary: rgba(26, 26, 46, 0.85);
--game-text-muted: rgba(26, 26, 46, 0.6);
--game-text-highlight: #1a5f2a;
--game-bg-card: rgba(255, 255, 255, 0.1);
--game-bg-card-hover: rgba(255, 255, 255, 0.2);
--game-bg-highlight: rgba(0, 0, 0, 0.1);
--game-border-primary: rgba(0, 0, 0, 0.1);
--game-border-hover: rgba(99, 102, 241, 0.4);
--game-btn-primary-bg: linear-gradient(135deg, #ffeb3b 0%, #ffc107 100%);
--game-btn-primary-text: #1a1a2e;
```
