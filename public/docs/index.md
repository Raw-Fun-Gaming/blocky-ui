---
title: Home
layout: home
nav_order: 1
permalink: /docs/
---

# Blocky UI

Welcome to the **Blocky UI** documentation! A lightweight, zero-dependency TypeScript UI component library for 3D blocky-themed interfaces.

[Live Demo]({{ site.baseurl }}/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[GitHub](https://github.com/Raw-Fun-Gaming/blocky-ui){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Quick Start

```bash
npm install blocky-ui-lite
```

```typescript
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

const button = BlockyUI.createButton({
  text: 'Launch Sequence',
  variant: 'primary',
  onClick: () => console.log('Launched!')
});
```

## Key Features

- **Zero Dependencies**: Pure TypeScript/JavaScript + CSS
- **Pure CSS Effects**: Multi-layer box shadows for 3D depth
- **Smooth Animations**: 3D hover effects and transitions
- **Responsive**: Mobile-first responsive design
- **Game-Ready**: Optimized for interactive applications
- **TypeScript**: Full type safety and IntelliSense

## Components

| Component | Description |
|-----------|-------------|
| [BlockyButton]({{ site.baseurl }}/docs/components#blockybutton) | 4 variants with 3D hover effects |
| [BlockyDropdown]({{ site.baseurl }}/docs/components#blockydropdown) | Theme-aware dropdowns with 4 variants |
| [BlockyModal]({{ site.baseurl }}/docs/components#blockymodal) | Full-featured modals with backdrop blur |
| [BlockyCard]({{ site.baseurl }}/docs/components#blockycard) | Content containers with 3D styling |
| [BlockyInfo]({{ site.baseurl }}/docs/components#blockyinfo) | Overlay popups with 5 color themes |
| [BlockyTag]({{ site.baseurl }}/docs/components#blockytag) | Status tags with gradient styling |
| [BlockyPage]({{ site.baseurl }}/docs/components#blockypage) | Full-screen pages with animated gradient borders |

## Themes

Blocky UI ships with 3 themes:

- **Blocky** (default) — dark 3D blocky aesthetic
- **Fall Guys** — bright cartoon style with white borders
- **Animal Crossing** — flat cozy NookPhone style with earthy tones

```typescript
BlockyUI.setTheme('fall-guys');
BlockyUI.setTheme('animal-crossing');
```

## Design Philosophy

- **Simplicity First**: Easy to use, minimal API surface
- **Performance Focused**: Pure CSS for maximum performance
- **Modular Architecture**: Use only what you need
- **Casino Game Aesthetic**: Inspired by Stack Rush multiplier tags
