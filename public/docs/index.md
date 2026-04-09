---
title: Home
layout: home
nav_order: 1
permalink: /docs/
---

# Raw Fun UI

Welcome to the **Raw Fun UI** documentation! A lightweight, zero-dependency TypeScript UI component library for themeable game UI interfaces.

[Live Demo]({{ site.baseurl }}/){: .btn .btn-primary .fs-5 .mb-4 .mb-md-0 .mr-2 }
[GitHub](https://github.com/Raw-Fun-Gaming/raw-fun-ui){: .btn .fs-5 .mb-4 .mb-md-0 }

---

## Quick Start

```bash
npm install raw-fun-ui
```

```typescript
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';

const button = RawFunUI.createButton({
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
| [RfuiButton]({{ site.baseurl }}/docs/components#rfuibutton) | 4 variants with 3D hover effects |
| [RfuiDropdown]({{ site.baseurl }}/docs/components#rfuidropdown) | Theme-aware dropdowns with 4 variants |
| [RfuiModal]({{ site.baseurl }}/docs/components#rfuimodal) | Full-featured modals with backdrop blur |
| [RfuiCard]({{ site.baseurl }}/docs/components#rfuicard) | Content containers with 3D styling |
| [RfuiInfo]({{ site.baseurl }}/docs/components#rfuiinfo) | Overlay popups with 5 color themes |
| [RfuiTag]({{ site.baseurl }}/docs/components#rfuitag) | Status tags with gradient styling |
| [RfuiPage]({{ site.baseurl }}/docs/components#rfuipage) | Full-screen pages with animated gradient borders |

## Themes

Raw Fun UI ships with 3 themes:

- **Blocky** (default) — dark 3D blocky aesthetic
- **Fall Guys** — bright cartoon style with white borders
- **Animal Crossing** — flat cozy NookPhone style with earthy tones

```typescript
RawFunUI.setTheme('fall-guys');
RawFunUI.setTheme('animal-crossing');
```

## Design Philosophy

- **Simplicity First**: Easy to use, minimal API surface
- **Performance Focused**: Pure CSS for maximum performance
- **Modular Architecture**: Use only what you need
- **Casino Game Aesthetic**: Designed for casino and casual gaming UIs
