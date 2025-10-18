# Troubleshooting

Common issues and their solutions when using Blocky UI.

## Installation Issues

### NPM Installation Fails

**Problem**: `npm install blocky-ui-lite` fails with errors

**Solutions**:

1. **Clear NPM cache**:
   ```bash
   npm cache clean --force
   npm install blocky-ui-lite
   ```

2. **Check Node.js version**:
   ```bash
   node --version  # Should be >=14.0.0
   ```

3. **Try with different registry**:
   ```bash
   npm install blocky-ui-lite --registry=https://registry.npmjs.org/
   ```

4. **Use exact version**:
   ```bash
   npm install blocky-ui-lite@1.0.0
   ```

---

## Import Issues

### Cannot Find Module 'blocky-ui'

**Problem**: TypeScript or JavaScript cannot resolve `blocky-ui`

**Solutions**:

1. **Verify installation**:
   ```bash
   npm list blocky-ui
   ```

2. **Check package.json**:
   ```json
   {
     "dependencies": {
       "blocky-ui-lite": "^1.0.0"
     }
   }
   ```

3. **Reinstall package**:
   ```bash
   npm uninstall blocky-ui
   npm install blocky-ui-lite
   ```

4. **Check import path**:
   ```typescript
   // ✅ Correct
   import { BlockyUI } from 'blocky-ui-lite';
   import 'blocky-ui-lite/styles';

   // ❌ Wrong
   import { BlockyUI } from 'blocky-ui-lite/dist/index.esm.js';
   ```

### Cannot Find Module 'blocky-ui-lite/styles'

**Problem**: CSS import fails

**Solutions**:

1. **Check package.json exports**:
   ```json
   {
     "exports": {
       "./styles": "./dist/blocky-ui.css"
     }
   }
   ```

2. **Alternative import paths**:
   ```typescript
   import 'blocky-ui-lite/styles';  // Preferred
   // or
   import 'blocky-ui-lite/dist/blocky-ui.css';  // Direct path
   ```

3. **Bundler configuration** (Webpack/Vite):
   ```javascript
   // Ensure CSS loader is configured
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

---

## Styling Issues

### Components Appear Unstyled

**Problem**: Components render but have no 3D effects or colors

**Solutions**:

1. **Import CSS**:
   ```typescript
   import 'blocky-ui-lite/styles';  // Must be imported!
   ```

2. **Check CSS load order**:
   ```typescript
   // ✅ Correct order
   import 'blocky-ui-lite/styles';     // First
   import './your-app-styles.css'; // Then your styles

   // ❌ Wrong - your styles might override blocky styles
   import './your-app-styles.css';
   import 'blocky-ui-lite/styles';
   ```

3. **Verify CSS in browser DevTools**:
   - Open DevTools → Elements tab
   - Inspect a blocky component
   - Check if `.blocky-*` classes have styles applied
   - If not, CSS file didn't load

4. **Check for CSS conflicts**:
   ```css
   /* Bad - overwrites all buttons */
   button {
     padding: 0 !important;
   }

   /* Good - scope your styles */
   .my-app button {
     padding: 0;
   }
   ```

### 3D Effects Not Working

**Problem**: Components are flat, no depth

**Solutions**:

1. **Check box-shadow support**:
   ```javascript
   // Test in browser console
   const el = document.createElement('div');
   el.style.boxShadow = '0 4px 0 rgba(0,0,0,0.3)';
   console.log(el.style.boxShadow);  // Should not be empty
   ```

2. **Disable browser extensions** that might override CSS

3. **Check CSS Variables**:
   ```javascript
   // In browser console
   getComputedStyle(document.documentElement)
     .getPropertyValue('--blocky-shadow-base');
   // Should return: "0 4px 0 rgba(0, 0, 0, 0.3)"
   ```

### Colors Don't Match Documentation

**Problem**: Wrong colors or gradients

**Solution**:

1. **Check variant spelling**:
   ```typescript
   // ✅ Correct
   BlockyUI.createButton({ text: 'Test', variant: 'primary' });

   // ❌ Wrong (typo)
   BlockyUI.createButton({ text: 'Test', variant: 'Primary' });  // Case-sensitive!
   ```

2. **Verify CSS Variables**:
   ```css
   :root {
     --blocky-primary: #55dfff;  /* Should be this color */
   }
   ```

---

## Framework Integration Issues

### React: Components Not Updating

**Problem**: Component props don't cause re-render

**Solution**:

Blocky UI components are vanilla DOM elements. You need to handle updates manually:

```tsx
// ❌ Wrong - won't update when text changes
function BlockyButton({ text }: { text: string }) {
  const button = BlockyUI.createButton({ text, variant: 'primary' });
  return <div ref={el => el && el.appendChild(button)} />;
}

// ✅ Correct - recreates on text change
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

### Vue: Components Not Appearing

**Problem**: Components don't render in Vue templates

**Solution**:

Use `onMounted` or `ref`:

```vue
<script setup>
import { onMounted, ref } from 'vue';
import { BlockyUI } from 'blocky-ui-lite';
import 'blocky-ui-lite/styles';

const container = ref(null);

onMounted(() => {
  if (container.value) {
    const button = BlockyUI.createButton({
      text: 'Click Me',
      variant: 'primary'
    });
    container.value.appendChild(button);
  }
});
</script>

<template>
  <div ref="container"></div>
</template>
```

### Vite: Failed to Resolve Import

**Problem**: Vite can't find blocky-ui when using `npm link` or local development

**Solution**:

Update `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    fs: {
      allow: [
        process.cwd(),
        '/path/to/blocky-ui'  // Add this
      ]
    }
  }
});
```

---

## TypeScript Issues

### Type Errors with Component Methods

**Problem**: TypeScript complains about method signatures

**Solutions**:

1. **Import types explicitly**:
   ```typescript
   import type {
     BlockyButtonOptions,
     BlockyModalOptions,
     BlockyModalInstance
   } from 'blocky-ui-lite';
   ```

2. **Type assertion for edge cases**:
   ```typescript
   const modal = BlockyUI.createModal({
     title: 'Test',
     content: myHtmlElement as HTMLElement,
     buttons: []
   });
   ```

3. **Regenerate type definitions**:
   ```bash
   cd node_modules/blocky-ui
   npm run build
   ```

### Missing Type Definitions

**Problem**: `Could not find a declaration file for module 'blocky-ui-lite'`

**Solutions**:

1. **Verify dist/ contains index.d.ts**:
   ```bash
   ls node_modules/blocky-ui-lite/dist/
   # Should show: index.d.ts
   ```

2. **Check package.json types field**:
   ```json
   {
     "types": "dist/index.d.ts"
   }
   ```

3. **Force reinstall**:
   ```bash
   rm -rf node_modules/blocky-ui
   npm install blocky-ui-lite
   ```

---

## Modal Issues

### Modal Won't Close

**Problem**: Clicking overlay or Escape doesn't close modal

**Solutions**:

1. **Check z-index conflicts**:
   ```css
   /* Your app might have higher z-index */
   .my-app-header {
     z-index: 9999;  /* Blocks modal overlay */
   }
   ```

2. **Verify modal instance**:
   ```typescript
   const modal = BlockyUI.createModal({ /* ... */ });
   modal.show();  // Don't forget to call show()!
   ```

3. **Check event handlers**:
   ```typescript
   // Make sure onClick doesn't prevent default
   buttons: [
     {
       text: 'Close',
       variant: 'primary',
       onClick: () => {
         // Do your logic, modal closes automatically
       }
     }
   ]
   ```

### Modal Appears Behind Content

**Problem**: Modal overlay is blocked by other elements

**Solution**:

Adjust z-index layers:

```css
/* In your app CSS */
:root {
  --blocky-z-overlay-modal: 9999;  /* Increase if needed */
}
```

---

## Performance Issues

### Slow Rendering

**Problem**: Components take a long time to appear

**Solutions**:

1. **Batch DOM operations**:
   ```typescript
   // ❌ Slow - multiple reflows
   components.forEach(comp => {
     document.body.appendChild(comp);
   });

   // ✅ Fast - single reflow
   const fragment = document.createDocumentFragment();
   components.forEach(comp => fragment.appendChild(comp));
   document.body.appendChild(fragment);
   ```

2. **Use requestAnimationFrame for animations**:
   ```typescript
   requestAnimationFrame(() => {
     modal.show();
   });
   ```

### High Memory Usage

**Problem**: Memory consumption grows over time

**Solution**:

Clean up event listeners:

```typescript
// ✅ Correct - remove when done
const button = BlockyUI.createButton({
  text: 'Click',
  onClick: handleClick
});

// Later, when removing:
button.querySelector('.blocky-btn')?.removeEventListener('click', handleClick);
button.remove();
```

---

## Browser Compatibility

### IE11 Not Supported

**Problem**: Components don't work in Internet Explorer 11

**Reason**: Blocky UI uses modern CSS features not available in IE11:
- CSS Custom Properties (variables)
- `backdrop-filter`
- Modern flexbox/grid

**Solution**: Use modern browsers (Chrome, Firefox, Safari, Edge)

### Safari Blur Issues

**Problem**: Backdrop blur doesn't work in older Safari versions

**Solution**:

Add vendor prefixes (already included in Blocky UI):

```css
.blocky-modal-overlay {
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}
```

---

## Development Issues

### Build Errors

**Problem**: `npm run build` fails

**Solutions**:

1. **Clear node_modules**:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Check TypeScript version**:
   ```bash
   npm list typescript
   # Should be ^5.0.0
   ```

3. **Verify rollup config**:
   ```bash
   npm list rollup
   # Should be ^3.0.0
   ```

### Watch Mode Not Working

**Problem**: `npm run dev` doesn't rebuild on changes

**Solution**:

1. **Check file paths in rollup.config.js**
2. **Restart watch mode**:
   ```bash
   # Kill existing process
   pkill -f "rollup -c -w"

   # Restart
   npm run dev
   ```

---

## Getting More Help

If your issue isn't listed here:

1. **Check existing issues**: [GitHub Issues](https://github.com/fuR-Gaming/blocky-ui/issues)
2. **Search discussions**: [GitHub Discussions](https://github.com/fuR-Gaming/blocky-ui/discussions)
3. **Create new issue**: Provide:
   - Blocky UI version
   - Framework and version (if applicable)
   - Minimal reproduction code
   - Browser and OS
   - Error messages or screenshots

---

**Still stuck? Open an issue and we'll help! 🎮**
