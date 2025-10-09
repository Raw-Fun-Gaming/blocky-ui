# Blocky UI

A lightweight, 3D blocky-themed UI component library built with TypeScript and pure CSS.

![Blocky UI Demo](screenshots/demo-page.png)

## Features

- 🎮 3D blocky aesthetic with gradient effects
- 🎨 Pure CSS styling (no SVG generation)
- 📦 Zero runtime dependencies
- 💪 Full TypeScript support
- 📱 Responsive design with mobile-first approach
- ⚡ Lightweight and performant
- 🔧 Framework-agnostic

## Installation

```bash
npm install blocky-ui
```

## Usage

```typescript
import { BlockyUI } from 'blocky-ui';
import 'blocky-ui/styles';

// Create a button
const button = BlockyUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked!')
});

document.body.appendChild(button);

// Create and show a modal
const modal = BlockyUI.createModal({
  title: 'Welcome',
  content: 'This is a blocky modal!',
  buttons: [
    { text: 'OK', variant: 'primary', onClick: () => {} }
  ]
});

modal.show();  // Show the modal
// modal.close();  // Close programmatically

// Convenience methods for common modal types
BlockyUI.createNotification('Success!', 'Operation completed.').show();
BlockyUI.createError('Error!', 'Something went wrong.').show();

const confirmModal = BlockyUI.createConfirmation(
  'Confirm Action',
  'Are you sure?',
  () => console.log('Confirmed'),
  () => console.log('Cancelled')
);
confirmModal.show();
```

## Components

- **BlockyButton**: 3D blocky buttons with hover and active states
- **BlockyModal**: Full-featured modals with backdrop blur
- **BlockyCard**: Content cards with 3D effects
- **BlockyInfo**: Info overlays with multiple color themes
- **BlockyTag**: Status/location tags with gradient styling

## Styling

Blocky UI uses pure CSS with 3D box-shadow effects, gradient backgrounds, and smooth transitions. All components feature:

- 3D depth with multi-layer box shadows
- Smooth hover and active state animations
- Gradient backgrounds with radial overlays
- Responsive breakpoints for all screen sizes
- Customizable color variants

## License

MIT © Richard Fu
