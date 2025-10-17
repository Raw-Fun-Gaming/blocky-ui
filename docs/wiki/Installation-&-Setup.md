# Installation & Setup

This guide will help you get Blocky UI up and running in your project.

## Installation Methods

### NPM (Recommended)

```bash
npm install blocky-ui
```

### Yarn

```bash
yarn add blocky-ui
```

### PNPM

```bash
pnpm add blocky-ui
```

### CDN (Coming Soon)

```html
<script src="https://unpkg.com/blocky-ui@latest/dist/index.umd.js"></script>
<link rel="stylesheet" href="https://unpkg.com/blocky-ui@latest/dist/blocky-ui.css">
```

## Basic Setup

### 1. Import the Library

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';  // Import CSS
```

### 2. Create Your First Component

```typescript
const button = BlockyUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => alert('Button clicked!')
});

document.body.appendChild(button);
```

### 3. Test It Out

Open your application and you should see a beautiful 3D blocky button!

## TypeScript Configuration

Blocky UI is built with TypeScript and includes full type definitions. No additional setup required!

```typescript
import type { BlockyButtonOptions, BlockyModalOptions } from 'blocky-ui';

const buttonOptions: BlockyButtonOptions = {
  text: 'Submit',
  variant: 'primary',
  onClick: () => {}
};
```

## Framework Integration

### Vanilla JavaScript/TypeScript

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

const app = document.getElementById('app');
const button = BlockyUI.createButton({
  text: 'Hello World',
  variant: 'primary'
});
app?.appendChild(button);
```

### React

```tsx
import { useEffect, useRef } from 'react';
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

function BlockyButton({ text, variant, onClick }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const button = BlockyUI.createButton({ text, variant, onClick });
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
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

const buttonContainer = ref(null);

onMounted(() => {
  const button = BlockyUI.createButton({
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
  import { BlockyUI } from 'blocky-ui';
  import 'blocky-ui/styles';

  let container;

  onMount(() => {
    const button = BlockyUI.createButton({
      text: 'Click Me',
      variant: 'primary',
      onClick: () => console.log('Clicked!')
    });
    container.appendChild(button);
  });
</script>

<div bind:this={container}></div>
```

## Vite Configuration (Local Development)

If you're using Vite and developing locally with `npm link` or `file:` dependencies:

```typescript
// vite.config.ts
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/blocky-ui'  // Add blocky-ui path
      ]
    }
  }
});
```

## Webpack Configuration

No special configuration needed! Blocky UI works out of the box with Webpack.

```javascript
// webpack.config.js
module.exports = {
  // ... your webpack config
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

## Rollup Configuration

```javascript
// rollup.config.js
import resolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';

export default {
  plugins: [
    resolve(),
    postcss({
      extract: true  // Extract CSS to separate file
    })
  ]
};
```

## Troubleshooting

### CSS Not Loading

**Problem**: Components appear unstyled

**Solution**: Ensure you're importing the CSS:
```typescript
import 'blocky-ui/styles';
```

### TypeScript Errors

**Problem**: Cannot find module 'blocky-ui'

**Solution**: Ensure the package is installed:
```bash
npm install blocky-ui
```

### Vite Import Issues

**Problem**: Failed to resolve import

**Solution**: Add blocky-ui path to `fs.allow` in `vite.config.ts` (see above)

### Module Resolution Issues

**Problem**: Module not found in Node.js

**Solution**: Check your `package.json` has `"type": "module"` or use `.cjs` imports:
```javascript
const { BlockyUI } = require('blocky-ui/dist/index.cjs.js');
```

## Next Steps

- [Quick Start Guide](Quick-Start-Guide) - Build your first app
- [Component Reference](Component-Reference) - Explore all components
- [Complete Examples](Complete-Examples) - See real-world examples

---

**Ready to build? Let's create something blocky! 🎮**
