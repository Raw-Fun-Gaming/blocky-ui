---
title: Component Reference
layout: default
nav_order: 3
---

# Component Reference

Complete API documentation for all Raw Fun UI components.

## Table of Contents

- [RfuiButton](#blockybutton)
- [RfuiDropdown](#blockydropdown)
- [RfuiModal](#blockymodal)
- [RfuiCard](#blockycard)
- [RfuiInfo](#blockyinfo)
- [RfuiTag](#blockytag)
- [RfuiPage](#blockypage)
- [Utility Methods](#utility-methods)

---

## RfuiButton

Interactive 3D buttons with hover and active states.

### API

```typescript
interface RfuiButtonOptions {
  text: string;                    // Button text content
  variant?: 'default' | 'primary' | 'secondary' | 'danger';  // Visual style
  onClick?: () => void;            // Click event handler
  disabled?: boolean;              // Disabled state
  className?: string;              // Additional CSS classes
}

RawFunUI.createButton(options: RfuiButtonOptions): HTMLButtonElement
```

### Variants

| Variant | Description | Base Color |
|---------|-------------|------------|
| `default` | Gray gradient | rgb(100, 100, 100) |
| `primary` | Blue gradient | rgb(4, 123, 255) |
| `secondary` | Cyan gradient | rgb(85, 223, 255) |
| `danger` | Red gradient | rgb(255, 68, 68) |

### Examples

```typescript
// Basic button
const button = RawFunUI.createButton({
  text: 'Click Me',
  variant: 'primary'
});

// Button with click handler
const actionButton = RawFunUI.createButton({
  text: 'Submit',
  variant: 'primary',
  onClick: () => {
    console.log('Form submitted!');
  }
});

// Disabled button
const disabledButton = RawFunUI.createButton({
  text: 'Loading...',
  variant: 'primary',
  disabled: true
});
```

---

## RfuiDropdown

Theme-aware dropdown component with 4 color variants and custom CSS arrow styling.

### API

```typescript
interface RfuiDropdownOptions {
  options: RfuiDropdownOption[];    // Dropdown options (required)
  value?: string;                     // Initial selected value
  variant?: ComponentVariant;         // Color variant
  onChange?: (value: string) => void; // Change event handler
  disabled?: boolean;                 // Disable the dropdown
  placeholder?: string;               // Placeholder text
  label?: string;                     // Optional label above dropdown
  className?: string;                 // Additional CSS classes
}

interface RfuiDropdownOption {
  value: string;
  label: string;
}
```

### Usage

```typescript
const dropdown = RawFunUI.createDropdown({
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' }
  ],
  value: 'option1',
  variant: 'primary',
  onChange: (value) => {
    console.log('Selected:', value);
  }
});

document.body.appendChild(dropdown);
```

---

## RfuiModal

Full-featured modals with backdrop blur, close button, and footer actions.

### API

```typescript
interface RfuiModalOptions {
  title: string;                   // Modal title
  content: string | HTMLElement;   // Modal body content
  showCloseButton?: boolean;       // Show X button (default: true)
  closeOnOverlayClick?: boolean;   // Close on overlay click (default: true)
  buttons: RfuiButtonOptions[];  // Footer action buttons (required)
  onClose?: () => void;           // Close callback
  className?: string;              // Additional CSS classes
}

interface RfuiModalInstance {
  show(): void;                    // Display the modal
  close(): void;                   // Close the modal
  element: HTMLDivElement;         // Access to DOM element
}

RawFunUI.createModal(options: RfuiModalOptions): RfuiModalInstance
```

### Features

- Auto-close on overlay click or Escape key
- Smooth slide-in animation
- Backdrop blur effect
- Instance methods for manual control

### Examples

```typescript
// Basic modal
const modal = RawFunUI.createModal({
  title: 'Welcome',
  content: 'This is a blocky modal!',
  buttons: [
    { text: 'OK', variant: 'primary' }
  ]
});
modal.show();

// Confirmation modal
const confirmModal = RawFunUI.createModal({
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  buttons: [
    { text: 'Cancel', variant: 'default', onClick: () => {} },
    { text: 'Confirm', variant: 'primary', onClick: () => {
      console.log('Confirmed!');
    }}
  ]
});
confirmModal.show();

// Programmatic control
const loading = RawFunUI.createModal({
  title: 'Loading',
  content: 'Please wait...',
  buttons: []
});
loading.show();
setTimeout(() => loading.close(), 3000);
```

---

## RfuiCard

Content cards with 3D styling and optional headers.

### API

```typescript
interface RfuiCardOptions {
  title?: string;                  // Optional card title
  content: string | HTMLElement;   // Card content
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  className?: string;
}

RawFunUI.createCard(options: RfuiCardOptions): HTMLDivElement
```

### Examples

```typescript
const card = RawFunUI.createCard({
  title: 'Card Title',
  content: 'Card content goes here'
});

const primaryCard = RawFunUI.createCard({
  title: 'Important Card',
  content: 'This uses primary styling',
  variant: 'primary'
});
```

---

## RfuiInfo

Overlay information popups with customizable color themes.

### API

```typescript
interface RfuiInfoOptions {
  title?: string;
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'red';
  content: string | HTMLElement;
  className?: string;
  onClose?: () => void;
}

RawFunUI.createInfo(options: RfuiInfoOptions): HTMLDivElement
```

### Color Themes

| Color | RGB | Use Case |
|-------|-----|----------|
| `yellow` | rgb(255, 194, 1) | Warnings, info |
| `green` | rgb(28, 230, 28) | Success messages |
| `blue` | rgb(4, 123, 255) | Information |
| `purple` | rgb(150, 50, 255) | Special notices |
| `red` | rgb(255, 68, 68) | Errors, alerts |

---

## RfuiTag

Small label-style tags with compact 3D styling.

### API

```typescript
interface RfuiTagOptions {
  text: string;
  variant?: 'default' | 'primary' | 'secondary' | 'danger';
  className?: string;
}

RawFunUI.createTag(options: RfuiTagOptions): HTMLSpanElement
```

### Examples

```typescript
const tag = RawFunUI.createTag({
  text: '×2.5',
  variant: 'primary'
});
```

---

## RfuiPage

Full-screen pages with animated gradient borders.

### API

```typescript
interface RfuiPageOptions {
  content: string | HTMLElement;
  onClose?: () => void;
  className?: string;
  customScrollbar?: boolean;  // Auto-hide scrollbar (default: true)
}

RawFunUI.createPage(options: RfuiPageOptions): HTMLDivElement
```

### Features

- Animated gradient borders with 7 color sets
- Full-screen overlay
- Optional custom auto-hide scrollbar
- Responsive design

---

## Utility Methods

### showNotification

```typescript
RawFunUI.showNotification(
  title: string,
  message: string,
  onClose?: () => void
): RfuiModalInstance
```

### showError

```typescript
RawFunUI.showError(
  title: string,
  message: string,
  onClose?: () => void
): RfuiModalInstance
```

### showConfirmation

```typescript
RawFunUI.showConfirmation(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): RfuiModalInstance
```

### setTheme

```typescript
RawFunUI.setTheme(theme: 'blocky' | 'fall-guys' | 'animal-crossing'): void
```

---

## TypeScript Support

All components have full TypeScript support:

```typescript
import type {
  RfuiButtonOptions,
  RfuiModalOptions,
  RfuiModalInstance,
  RfuiCardOptions,
  RfuiInfoOptions,
  RfuiTagOptions,
  RfuiPageOptions,
  RfuiTheme
} from 'raw-fun-ui';
```
