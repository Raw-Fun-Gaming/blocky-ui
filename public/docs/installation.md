---
title: Installation & Setup
layout: default
nav_order: 2
---

# Installation & Setup

This guide will help you get Raw Fun UI up and running in your project.

## Installation Methods

### NPM (Recommended)

```bash
npm install raw-fun-ui
```

### Yarn

```bash
yarn add raw-fun-ui
```

### PNPM

```bash
pnpm add raw-fun-ui
```

### CDN

```html
<script src="https://unpkg.com/raw-fun-ui@latest/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/raw-fun-ui@latest/dist/raw-fun-ui.css">
```

## Basic Setup

### 1. Import the Library

```typescript
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';  // Import CSS
```

### 2. Create Your First Component

```typescript
const button = RawFunUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => alert('Button clicked!')
});

document.body.appendChild(button);
```

### 3. Test It Out

Open your application and you should see a beautiful 3D blocky button!

## TypeScript Configuration

Raw Fun UI is built with TypeScript and includes full type definitions. No additional setup required!

```typescript
import type { RfuiButtonOptions, RfuiModalOptions } from 'raw-fun-ui';

const buttonOptions: RfuiButtonOptions = {
  text: 'Submit',
  variant: 'primary',
  onClick: () => {}
};
```

## Framework Integration

### Vanilla JavaScript/TypeScript

```typescript
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';

const app = document.getElementById('app');
const button = RawFunUI.createButton({
  text: 'Hello World',
  variant: 'primary'
});
app?.appendChild(button);
```

### React

```tsx
import { useEffect, useRef } from 'react';
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';

function RfuiButton({ text, variant, onClick }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const button = RawFunUI.createButton({ text, variant, onClick });
      ref.current.appendChild(button);
      return () => ref.current?.removeChild(button);
    }
  }, [text, variant, onClick]);

  return <div ref={ref} />;
}
```

### Vue 3

```vue
<template>
  <div ref="buttonContainer"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';

const buttonContainer = ref(null);

onMounted(() => {
  const button = RawFunUI.createButton({
    text: 'Click Me',
    variant: 'primary',
    onClick: () => console.log('Clicked!')
  });
  buttonContainer.value.appendChild(button);
});
</script>
```

### Svelte

```svelte
<script>
  import { onMount } from 'svelte';
  import { RawFunUI } from 'raw-fun-ui';
  import 'raw-fun-ui/styles';

  let container;

  onMount(() => {
    const button = RawFunUI.createButton({
      text: 'Click Me',
      variant: 'primary',
      onClick: () => console.log('Clicked!')
    });
    container.appendChild(button);
  });
</script>

<div bind:this={container}></div>
```

## Bundler Configuration

### Vite (Local Development)

If you're using Vite and developing locally with `npm link` or `file:` dependencies:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/raw-fun-ui'  // Add raw-fun-ui path
      ]
    }
  }
});
```

### Webpack

No special configuration needed! Raw Fun UI works out of the box with Webpack.

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
```

### Rollup

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    resolve(),
    postcss({
      extract: true
    })
  ]
};
```
