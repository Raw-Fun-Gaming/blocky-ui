---
title: Themes
layout: default
nav_order: 7
has_children: true
---

# Themes

Raw Fun UI ships with a vanilla structural base and 3 visual themes. Switch themes at runtime:

```typescript
RawFunUI.setTheme('blocky');           // dark 3D aesthetic
RawFunUI.setTheme('fall-guys');        // bright cartoon style
RawFunUI.setTheme('animal-crossing');  // flat cozy NookPhone style
RawFunUI.setTheme('vanilla');          // structural base, no visual opinion
```

## Available Themes

| Theme | Style | Key Traits |
|-------|-------|------------|
| **Vanilla** | Structural base | No visual opinion — layout, sizing, transitions only |
| **Blocky** | Dark 3D | Multi-layer shadows, gradient overlays, backdrop blur |
| **Fall Guys** | Bright cartoon | Solid black offset shadows, thick white borders, 16px radius |
| **Animal Crossing** | Flat cozy | Soft diffused shadows, earthy tones, 30px containers, 999px pill buttons |

## Granular CSS Imports

Import only the theme you need to reduce bundle size:

```typescript
import 'raw-fun-ui/styles/vanilla';
import 'raw-fun-ui/styles/blocky';
RawFunUI.setTheme('blocky');
```

## Creating a New Theme

See the [theme creation guide](https://github.com/Raw-Fun-Gaming/raw-fun-ui/blob/main/CLAUDE.md#adding-a-new-theme) in CLAUDE.md for the 5-file checklist.
