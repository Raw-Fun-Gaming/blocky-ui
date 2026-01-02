# Component Reference

Complete API documentation for all Blocky UI components.

## Table of Contents

- [BlockyButton](#blockybutton)
- [BlockyModal](#blockymodal)
- [BlockyCard](#blockycard)
- [BlockyInfo](#blockyinfo)
- [BlockyTag](#blockytag)
- [BlockyPage](#blockypage)
- [Utility Methods](#utility-methods)

---

## BlockyButton

Interactive 3D buttons with hover and active states.

### API

```typescript
interface BlockyButtonOptions {
  text: string;                    // Button text content
  variant?: 'default' | 'primary' | 'secondary' | 'danger';  // Visual style
  onClick?: () => void;            // Click event handler
  disabled?: boolean;              // Disabled state
  className?: string;              // Additional CSS classes
}

BlockyUI.createButton(options: BlockyButtonOptions): HTMLButtonElement
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
const button = BlockyUI.createButton({
  text: 'Click Me',
  variant: 'primary'
});

// Button with click handler
const actionButton = BlockyUI.createButton({
  text: 'Submit',
  variant: 'primary',
  onClick: () => {
    console.log('Form submitted!');
    // Your logic here
  }
});

// Disabled button
const disabledButton = BlockyUI.createButton({
  text: 'Loading...',
  variant: 'primary',
  disabled: true
});

// Custom class
const customButton = BlockyUI.createButton({
  text: 'Custom',
  variant: 'danger',
  className: 'my-custom-button'
});
```

### Styling

```css
/* Override button styles */
.blocky-btn.primary {
  /* Custom primary button styles */
}

.blocky-btn:hover {
  /* Custom hover effects */
}
```

---

## BlockyDropdown

Theme-aware dropdown component with 4 color variants and custom CSS arrow styling.

### API

```typescript
interface BlockyDropdownOptions {
  options: BlockyDropdownOption[];    // Dropdown options (required)
  value?: string;                     // Initial selected value
  variant?: ComponentVariant;         // Color variant: 'default', 'primary', 'secondary', 'danger'
  onChange?: (value: string) => void; // Change event handler
  disabled?: boolean;                 // Disable the dropdown
  placeholder?: string;               // Placeholder text
  label?: string;                     // Optional label above dropdown
  className?: string;                 // Additional CSS classes
}

interface BlockyDropdownOption {
  value: string;                      // Option value
  label: string;                      // Option display text
}
```

### Usage

```typescript
import { BlockyUI } from 'blocky-ui-lite';

// Simple dropdown
const dropdown = BlockyUI.createDropdown({
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

// Dropdown with label
const labeledDropdown = BlockyUI.createDropdown({
  label: 'Select an option:',
  options: [
    { value: 'a', label: 'Choice A' },
    { value: 'b', label: 'Choice B' }
  ],
  variant: 'secondary'
});

// Theme switcher example
const themeDropdown = BlockyUI.createDropdown({
  options: [
    { value: 'blocky', label: 'Blocky Theme' },
    { value: 'fall-guys', label: 'Fall Guys Theme' }
  ],
  value: 'blocky',
  variant: 'secondary',
  onChange: (theme) => {
    BlockyUI.setTheme(theme);
  }
});
```

### Features

- **4 Color Variants**: default (gray), primary (blue), secondary (cyan), danger (red)
- **Theme Support**: Automatically adapts to blocky and fall-guys themes
- **Custom Arrow**: CSS-based dropdown arrow for consistent cross-browser appearance
- **Optional Label**: Add descriptive labels above dropdowns
- **Disabled State**: Visual feedback with reduced opacity
- **Type Safety**: Full TypeScript support with autocomplete

### Styling

The dropdown inherits the blocky 3D aesthetic:
- Multi-layer box shadows for depth
- Gradient backgrounds matching variant colors
- Hover lift animation (2px translateY)
- Backdrop blur effect
- Theme-aware color transitions

```css
/* All dropdowns share these base classes */
.blocky-dropdown-wrapper {
  /* Container for dropdown and optional label */
}

.blocky-dropdown {
  /* Native select with custom styling */
}

/* Hover effects are automatic */
.blocky-dropdown:hover {
  /* Custom hover effects */
}
```

---

## BlockyModal

Full-featured modals with backdrop blur, close button, and footer actions.

### API

```typescript
interface BlockyModalOptions {
  title: string;                   // Modal title
  content: string | HTMLElement;   // Modal body content
  showCloseButton?: boolean;       // Show X button (default: true)
  buttons: BlockyButtonOptions[];  // Footer action buttons (required)
  onClose?: () => void;           // Close callback
  className?: string;              // Additional CSS classes
}

interface BlockyModalInstance {
  show(): void;                    // Display the modal
  close(): void;                   // Close the modal
  element: HTMLDivElement;         // Access to DOM element
}

BlockyUI.createModal(options: BlockyModalOptions): BlockyModalInstance
```

### Features

- **Auto-close on overlay click**: Click outside modal to close
- **Keyboard accessible**: Press Escape to close
- **Smooth animations**: Slide-in animation on show
- **Backdrop blur**: Modern glassmorphism effect
- **Instance methods**: Manual control via returned instance

### Examples

```typescript
// Basic modal
const modal = BlockyUI.createModal({
  title: 'Welcome',
  content: 'This is a blocky modal!',
  buttons: [
    { text: 'OK', variant: 'primary' }
  ]
});
modal.show();  // Show the modal

// Modal with multiple buttons
const confirmModal = BlockyUI.createModal({
  title: 'Confirm Action',
  content: 'Are you sure you want to proceed?',
  buttons: [
    { text: 'Cancel', variant: 'default', onClick: () => {} },
    { text: 'Confirm', variant: 'primary', onClick: () => {
      console.log('Confirmed!');
      // Your logic here
    }}
  ]
});
confirmModal.show();

// Modal with HTML content
const htmlModal = BlockyUI.createModal({
  title: 'Rich Content',
  content: `
    <div>
      <h3>Features</h3>
      <ul>
        <li>3D Effects</li>
        <li>Smooth Animations</li>
        <li>Responsive Design</li>
      </ul>
    </div>
  `,
  showCloseButton: true,
  buttons: [{ text: 'Close', variant: 'primary' }],
  onClose: () => console.log('Modal closed')
});
htmlModal.show();

// Programmatic control
const modal = BlockyUI.createModal({
  title: 'Loading',
  content: 'Please wait...',
  buttons: []
});
modal.show();

// Close after 3 seconds
setTimeout(() => {
  modal.close();
}, 3000);
```

### Styling

```css
/* Override modal styles */
.blocky-modal-wrapper {
  /* Modal wrapper styles */
}

.blocky-modal-overlay {
  /* Backdrop overlay styles */
}

.blocky-modal {
  /* Modal container styles */
}
```

---

## BlockyCard

Content cards with 3D styling and optional headers.

### API

```typescript
interface BlockyCardOptions {
  title?: string;                  // Optional card title
  content: string | HTMLElement;   // Card content
  variant?: 'default' | 'primary' | 'secondary' | 'danger';  // Visual style
  className?: string;              // Additional CSS classes
}

BlockyUI.createCard(options: BlockyCardOptions): HTMLDivElement
```

### Examples

```typescript
// Basic card
const card = BlockyUI.createCard({
  title: 'Card Title',
  content: 'Card content goes here'
});

// Card without title
const simpleCard = BlockyUI.createCard({
  content: '<p>Just content, no title</p>'
});

// Card with variant
const primaryCard = BlockyUI.createCard({
  title: 'Important Card',
  content: 'This uses primary styling',
  variant: 'primary'
});

// Card with complex content
const richCard = BlockyUI.createCard({
  title: 'Stats',
  content: `
    <div class="stats-grid">
      <div>
        <strong>Score:</strong> 1000
      </div>
      <div>
        <strong>Level:</strong> 5
      </div>
    </div>
  `
});
```

---

## BlockyInfo

Overlay information popups with customizable color themes and auto-dismiss.

### API

```typescript
interface BlockyInfoOptions {
  title?: string;                  // Optional title
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'red';  // Title theme
  content: string | HTMLElement;   // Info content
  className?: string;              // Additional CSS classes
  onClose?: () => void;           // Close callback
  showOverlay?: boolean;          // Show backdrop overlay
}

BlockyUI.createInfo(options: BlockyInfoOptions): HTMLDivElement
```

### Color Themes

| Color | RGB | Use Case |
|-------|-----|----------|
| `yellow` | rgb(255, 194, 1) | Warnings, info |
| `green` | rgb(28, 230, 28) | Success messages |
| `blue` | rgb(4, 123, 255) | Information |
| `purple` | rgb(150, 50, 255) | Special notices |
| `red` | rgb(255, 68, 68) | Errors, alerts |

### Examples

```typescript
// Basic info
const info = BlockyUI.createInfo({
  title: 'Information',
  titleColor: 'blue',
  content: 'This is an info message'
});
document.body.appendChild(info);

// Success notification
const success = BlockyUI.createInfo({
  title: 'Success!',
  titleColor: 'green',
  content: 'Operation completed successfully',
  showOverlay: true
});
document.body.appendChild(success);

// Warning with callback
const warning = BlockyUI.createInfo({
  title: 'Warning',
  titleColor: 'yellow',
  content: 'Please review before continuing',
  onClose: () => console.log('Warning dismissed')
});
document.body.appendChild(warning);
```

---

## BlockyTag

Small label-style tags with compact 3D styling.

### API

```typescript
interface BlockyTagOptions {
  text: string;                    // Tag text
  variant?: 'default' | 'primary' | 'secondary' | 'danger';  // Visual style
  className?: string;              // Additional CSS classes
}

BlockyUI.createTag(options: BlockyTagOptions): HTMLSpanElement
```

### Examples

```typescript
// Basic tag
const tag = BlockyUI.createTag({
  text: '×2.5',
  variant: 'primary'
});

// Multiple tags
const tags = [
  { text: 'NEW', variant: 'green' },
  { text: 'SALE', variant: 'red' },
  { text: 'HOT', variant: 'yellow' }
].map(config => BlockyUI.createTag(config));

tags.forEach(tag => container.appendChild(tag));
```

---

## BlockyPage

Full-screen pages with animated gradient borders that smoothly transition between 7 color sets.

### API

```typescript
interface BlockyPageOptions {
  content: string | HTMLElement;   // Page content
  showCloseButton?: boolean;       // Show close button (default: true)
  onClose?: () => void;           // Close callback
  className?: string;              // Additional CSS classes
  customScrollbar?: boolean;       // Enable custom auto-hide scrollbar (default: true)
}

BlockyUI.createPage(options: BlockyPageOptions): HTMLDivElement
```

### Features

- **Animated gradient borders**: 7 color sets with smooth transitions
- **Full-screen overlay**: Covers entire viewport
- **Close button**: Optional close functionality
- **Backdrop blur**: Modern glassmorphism effect
- **Responsive**: Adapts to all screen sizes
- **Custom scrollbar**: Auto-hide scrollbar positioned below close button (optional)

### Custom Scrollbar

The `customScrollbar` option (default: `true`) provides an auto-hiding scrollbar that:
- **Prevents overlap** with the close button on narrow screens
- **Fades in** when hovering over content or actively scrolling
- **Fades out** after 1 second of inactivity
- **Positioned** below the close button with symmetric margins (40px top, 20px bottom)

**When to use:**
- **Enable (default)**: For most pages where native browser scrollbar overlap is not acceptable
- **Disable (`customScrollbar: false`)**: When you prefer native browser scrollbar behavior and overlap with close button is acceptable, or when you have strict UX design requirements

**Note**: Custom scrollbar works on WebKit browsers (Chrome, Safari, Edge). Firefox uses native scrollbar styling.

### Examples

```typescript
// Basic page (custom scrollbar enabled by default)
const page = BlockyUI.createPage({
  content: '<h1>Welcome</h1><p>This is a full-screen page</p>'
});
document.body.appendChild(page);

// Page with custom scrollbar explicitly enabled
const infoPage = BlockyUI.createPage({
  content: gameInfoHTML,
  customScrollbar: true,  // Auto-hide scrollbar (default)
  onClose: () => console.log('Info closed')
});
document.body.appendChild(infoPage);

// Page with native browser scrollbar
const strictPage = BlockyUI.createPage({
  content: strictDesignContent,
  customScrollbar: false  // Use native browser scrollbar
});
document.body.appendChild(strictPage);

// Page without close button
const lockedPage = BlockyUI.createPage({
  content: levelContent,
  showCloseButton: false
});
document.body.appendChild(lockedPage);
```

### Color Sets

The border cycles through 7 color sets:
1. Blue-Purple-Pink
2. Green-Cyan-Lime
3. Red-Orange-Yellow
4. Purple-Magenta-Pink
5. Cyan-Blue-Teal
6. Yellow-Orange-Red
7. Pink-Purple-Blue

---

## Utility Methods

Convenience methods for common use cases.

### showNotification

Create and show a notification automatically.

```typescript
BlockyUI.showNotification(
  title: string,
  message: string,
  onClose?: () => void
): BlockyModalInstance
```

**Example:**
```typescript
BlockyUI.showNotification(
  'Success!',
  'Your changes have been saved.',
  () => console.log('Notification closed')
);
```

### showError

Create and show an error dialog automatically.

```typescript
BlockyUI.showError(
  title: string,
  message: string,
  onClose?: () => void
): BlockyModalInstance
```

**Example:**
```typescript
BlockyUI.showError(
  'Error!',
  'Failed to connect to server.',
  () => console.log('Error dismissed')
);
```

### showConfirmation

Create and show a confirmation dialog automatically.

```typescript
BlockyUI.showConfirmation(
  title: string,
  message: string,
  onConfirm: () => void,
  onCancel?: () => void
): BlockyModalInstance
```

**Example:**
```typescript
BlockyUI.showConfirmation(
  'Delete Item',
  'Are you sure you want to delete this item?',
  () => {
    console.log('Item deleted');
    // Delete logic here
  },
  () => console.log('Deletion cancelled')
);
```

---

## Common Patterns

### Loading State

```typescript
const modal = BlockyUI.createModal({
  title: 'Loading',
  content: 'Please wait...',
  buttons: []
});
modal.show();

// After data loads
fetchData().then(() => {
  modal.close();
});
```

### Form Validation

```typescript
function submitForm() {
  if (!isValid) {
    BlockyUI.showError(
      'Validation Error',
      'Please fill in all required fields'
    );
    return;
  }

  // Submit form
  BlockyUI.showNotification('Success', 'Form submitted!');
}
```

### Progressive Disclosure

```typescript
const card = BlockyUI.createCard({
  title: 'Click to expand',
  content: 'Initial content'
});

card.addEventListener('click', () => {
  const modal = BlockyUI.createModal({
    title: 'Expanded View',
    content: 'Detailed information...',
    buttons: [{ text: 'Close', variant: 'primary' }]
  });
  modal.show();
});
```

---

## TypeScript Support

All components have full TypeScript support:

```typescript
import type {
  BlockyButtonOptions,
  BlockyModalOptions,
  BlockyModalInstance,
  BlockyCardOptions,
  BlockyInfoOptions,
  BlockyTagOptions,
  BlockyPageOptions
} from 'blocky-ui-lite';
```

---

**Next Steps:**
- [Complete Examples](Complete-Examples) - See real-world examples
- [Architecture Overview](Architecture-Overview) - System design and patterns
- [Troubleshooting](Troubleshooting) - Common issues and solutions
