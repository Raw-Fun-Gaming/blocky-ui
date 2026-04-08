---
title: Animal Crossing
layout: default
parent: Themes
nav_order: 3
---

# Animal Crossing Theme — Design Spec

## Context

The **Animal Crossing** theme is inspired by the NookPhone UI from Animal Crossing: New Horizons. A flat, minimal, cozy aesthetic with earthy/nature tones.

## Theme Name

`animal-crossing` — applied via `data-blocky-theme="animal-crossing"` on the root element.

## Color Palette

Earthy, nature-inspired palette:

| Token | Hex | Role |
|-------|-----|------|
| Teal | `#34a09c` | Primary / Ocean |
| Navy | `#1f526e` | Text on light backgrounds |
| Brown | `#937c60` | Default / Wood |
| Amber | `#d69632` | Secondary / Bells |
| Cream | `#fffbed` | Component backgrounds |
| Sand | `#e8e0d0` | Page/overlay backgrounds |
| Muted Red | `#c45c5c` | Danger / Close buttons |

### Button Variant Mapping

| Variant | Background | Text Color |
|---------|-----------|------------|
| `default` | `#937c60` → `#a08a70` (brown gradient) | `#fffbed` (cream) |
| `primary` | `#34a09c` → `#3db0a8` (teal gradient) | `#fffbed` (cream) |
| `secondary` | `#d69632` → `#e0a840` (amber gradient) | `#1f526e` (navy — dark text for contrast) |
| `danger` | `#c45c5c` → `#d06868` (muted red gradient) | `#fffbed` (cream) |

### Info Title Colors

| Theme | Color |
|-------|-------|
| `yellow` | `#d69632` (amber) |
| `green` | `#34a09c` (teal) |
| `blue` | `#1f526e` (navy) |
| `purple` | `#8b7bb5` (muted purple) |
| `red` | `#c45c5c` (muted red) |

### Header Bar

Default header: teal gradient (`#34a09c` → `#3db0a8`), white text.

## Depth & Shadows

**Flat with soft diffused shadows** — no hard offset shadows, no backdrop-filter/blur.

| Token | Value |
|-------|-------|
| `--blocky-shadow-base` | `0 2px 8px rgba(31, 82, 110, 0.10)` |
| `--blocky-shadow-far` | `0 4px 16px rgba(31, 82, 110, 0.12)` |
| `--blocky-shadow-hover` | `0 6px 20px rgba(31, 82, 110, 0.15)` |
| `--blocky-shadow-active` | `0 1px 4px rgba(31, 82, 110, 0.08)` |
| `--blocky-inset-highlight` | `none` |
| `--blocky-inset-shadow` | `none` |
| `--blocky-inset-combined` | `none` |

No radial gradient overlays on `::before` pseudo-elements. No backdrop-filter blur.

## Border Radius

Two tiers, matching the NookPhone reference:

| Element Type | Radius | Rationale |
|-------------|--------|-----------|
| Buttons, tags, dropdowns | `999px` | True pill shape — matches NookPhone action buttons |
| Cards, modals, info, pages | `30px` / `32px` | Very rounded rect — matches NookPhone device shape |
| Close button | `999px` | Circular/pill |
| Card/modal header inner radius | `calc(30px - border-width)` | Flush with container |

CSS variables:
- `--blocky-border-radius`: `30px`
- `--blocky-border-radius-sm`: `24px`
- `--blocky-border-radius-lg`: `32px`

## Borders

Subtle, earth-toned borders instead of bright white:

| Token | Value |
|-------|-------|
| `--blocky-border-width` | `2px` |
| `--blocky-border-width-thin` | `1.5px` |
| `--blocky-border-width-thick` | `3px` |
| `--blocky-border-color` | `rgba(31, 82, 110, 0.08)` |
| `--blocky-border-color-hover` | `rgba(31, 82, 110, 0.12)` |

Buttons get a subtle white inner border: `2px solid rgba(255, 255, 255, 0.25)`.

## Typography

| Token | Value |
|-------|-------|
| `--blocky-text-primary` | `#1f526e` (navy) |
| `--blocky-text-secondary` | `rgba(31, 82, 110, 0.7)` |
| `--blocky-text-disabled` | `rgba(31, 82, 110, 0.35)` |
| `--blocky-text-light` | `#fffbed` (cream — for text on colored backgrounds) |
| `--blocky-font-weight-normal` | `500` |
| `--blocky-font-weight-medium` | `600` |
| `--blocky-font-weight-bold` | `700` |
| `--blocky-text-shadow-*` | `none` (flat style, no text shadows) |

## Gradients

Very subtle, single-axis only. All component backgrounds use gentle two-stop linear gradients (lighter at top, base at bottom). No radial overlays.

```css
/* Example: teal button */
background: linear-gradient(180deg, #3db0a8 0%, #34a09c 100%);

/* No ::before radial overlay — set to transparent/none */
```

## Hover & Active States

| State | Transform | Shadow |
|-------|-----------|--------|
| Hover | `translateY(-2px)` | `--blocky-shadow-hover` |
| Active | `translateY(0)` | `--blocky-shadow-active` |

Gentle lift only — no X-axis translation (unlike fall-guys diagonal movement).

## Component-Specific Notes

### Buttons
- Full pill radius (`999px`)
- Subtle white inner border (`2px solid rgba(255,255,255,0.25)`)
- Hover/active on wrapper, not button directly (follow fall-guys pattern)
- Remove wrapper box-shadow (follow fall-guys pattern)

### Modals
- Cream (`#fffbed`) body background
- Teal header bar (default), with variant header colors available
- 30px container radius
- Close button: muted red (`#c45c5c`), circular, with white border
- Footer border: `rgba(31, 82, 110, 0.08)`
- Overlay background: `rgba(31, 82, 110, 0.3)`

### Cards
- Cream background with colored header bar
- Same header color system as fall-guys (variant + TitleColorTheme)
- Hover: gentle lift (`translateY(-2px)`)

### Info/Notifications
- Cream background
- Colored title text (not background bar)
- Same 5-color theme system (yellow, green, blue, purple, red)

### Tags
- Full pill radius (`999px`)
- Solid background matching variant color
- Thin border (`1.5px solid rgba(255,255,255,0.2)`)

### Dropdowns
- Full pill radius (`999px`)
- Cream background (default), colored backgrounds for variants
- Subtle border

### Pages
- Sand (`#e8e0d0`) overlay background
- Cream content area
- 32px radius

### Close Button
- Muted red background (`#c45c5c`)
- Circular (`999px`)
- White border (`2px solid rgba(255,255,255,0.3)`)
- Cream text color

## Game Engine Design Tokens

```css
--game-text-primary: #1f526e;
--game-text-secondary: rgba(31, 82, 110, 0.7);
--game-text-muted: rgba(31, 82, 110, 0.45);
--game-text-highlight: #34a09c;
--game-bg-card: rgba(255, 251, 237, 0.5);
--game-bg-card-hover: rgba(255, 251, 237, 0.7);
--game-bg-highlight: rgba(31, 82, 110, 0.06);
--game-border-primary: rgba(31, 82, 110, 0.08);
--game-border-hover: rgba(52, 160, 156, 0.3);
--game-btn-primary-bg: linear-gradient(135deg, #3db0a8 0%, #34a09c 100%);
--game-btn-primary-text: #fffbed;
```

## Files to Create/Modify

1. **Create**: `src/styles/themes/_animal-crossing.css` — theme CSS (following fall-guys pattern)
2. **Modify**: `src/styles/blocky-ui.css` — add `@import url('./themes/_animal-crossing.css');`
3. **Modify**: `src/types/index.ts` — add `'animal-crossing'` to `BlockyTheme` union type

## Verification

1. `npm run build` — ensure clean build with new theme CSS
2. In a consuming project, call `BlockyUI.setTheme('animal-crossing')` and verify:
   - All component variants render correctly
   - Colors match the reference palette
   - Buttons are pill-shaped, containers are rounded rects
   - Shadows are soft and diffused (no hard offsets)
   - Hover states work (gentle lift)
   - Text contrast is readable on all backgrounds
   - No radial overlays or backdrop blur effects visible
