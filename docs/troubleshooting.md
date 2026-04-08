---
title: Troubleshooting
layout: default
nav_order: 6
---

# Troubleshooting

Common issues and their solutions when using Blocky UI.

## Installation Issues

### NPM Installation Fails

**Problem**: `npm install blocky-ui-lite` fails with errors

**Solutions**:

1. Clear NPM cache:
   ```bash
   npm cache clean --force
   npm install blocky-ui-lite
   ```

2. Check Node.js version (should be >=14.0.0):
   ```bash
   node --version
   ```

3. Use exact version:
   ```bash
   npm install blocky-ui-lite@latest
   ```

---

## Import Issues

### Cannot Find Module

**Problem**: TypeScript or JavaScript cannot resolve the module

**Solutions**:

```typescript
// Correct imports
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

// Alternative CSS import
import 'blocky-ui-lite/dist/blocky-ui.css';
```

### CSS Not Loading

**Problem**: Components appear unstyled

**Solution**: Ensure CSS is imported before your app styles:

```typescript
import 'blocky-ui-lite/styles';     // First
import './your-app-styles.css';      // Then your styles
```

---

## Styling Issues

### 3D Effects Not Working

1. Check CSS variables are loaded:
   ```javascript
   getComputedStyle(document.documentElement)
     .getPropertyValue('--blocky-shadow-base');
   ```

2. Check for CSS conflicts — scope your selectors:
   ```css
   /* Bad - overwrites all buttons */
   button { padding: 0 !important; }

   /* Good - scoped */
   .my-app button { padding: 0; }
   ```

### Colors Don't Match

Check variant spelling (case-sensitive):

```typescript
// Correct
BlockyUI.createButton({ text: 'Test', variant: 'primary' });

// Wrong
BlockyUI.createButton({ text: 'Test', variant: 'Primary' });
```

---

## Framework Issues

### React: Components Not Updating

Blocky UI creates vanilla DOM elements. Handle updates with `useEffect`:

```tsx
function BlockyButton({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
      const button = BlockyUI.createButton({ text, variant: 'primary' });
      ref.current.appendChild(button);
    }
  }, [text]);

  return <div ref={ref} />;
}
```

### Vite: Failed to Resolve Import

Add blocky-ui path to `fs.allow` in `vite.config.ts`:

```typescript
export default defineConfig({
  server: {
    fs: {
      allow: [process.cwd(), '/path/to/blocky-ui']
    }
  }
});
```

---

## Modal Issues

### Modal Won't Close

1. Check z-index conflicts in your app
2. Ensure you called `modal.show()` (not just created it)
3. Check event handlers aren't preventing default behavior

### Modal Appears Behind Content

Override the z-index variable:

```css
:root {
  --blocky-z-overlay-modal: 9999;
}
```

---

## Performance

### Slow Rendering

Batch DOM operations:

```typescript
// Slow - multiple reflows
components.forEach(comp => document.body.appendChild(comp));

// Fast - single reflow
const fragment = document.createDocumentFragment();
components.forEach(comp => fragment.appendChild(comp));
document.body.appendChild(fragment);
```

---

## Browser Compatibility

Blocky UI requires modern browsers (Chrome, Firefox, Safari, Edge). IE11 is not supported due to use of CSS Custom Properties, `backdrop-filter`, and modern flexbox/grid.

---

## Getting More Help

If your issue isn't listed here:

1. Check [GitHub Issues](https://github.com/Raw-Fun-Gaming/blocky-ui/issues)
2. Create a new issue with: version, framework, minimal reproduction code, browser/OS, and error messages
