# Blocky UI Wiki

Welcome to the **Blocky UI** comprehensive documentation wiki! This is your complete guide to understanding, implementing, and extending the lightweight, 3D blocky-themed UI component library.

## 🚀 Quick Navigation

### Getting Started
- [Installation & Setup](Installation-&-Setup) - Get up and running quickly
- [Quick Start Guide](Quick-Start-Guide) - Your first components in 5 minutes
- [Architecture Overview](Architecture-Overview) - Understanding the system design

### Core Documentation
- [Component Reference](Component-Reference) - Complete API documentation
- [Build System](Build-System) - Understanding the Rollup-based build pipeline
- [TypeScript Support](TypeScript-Support) - Type definitions and usage

### Development Guides
- [Development Workflow](Development-Workflow) - Contributing and extending
- [Styling & Theming](Styling-&-Theming) - Customization and CSS variables
- [Animation System](Animation-System) - Understanding the 3D effects and transitions

### Advanced Topics
- [CSS Architecture](CSS-Architecture) - Deep dive into the pure CSS system
- [Performance Optimization](Performance-Optimization) - Best practices for production
- [Browser Compatibility](Browser-Compatibility) - Support matrix and fallbacks

### Examples & Tutorials
- [Complete Examples](Complete-Examples) - Real-world implementation examples
- [Game Integration](Game-Integration) - Using with game engines and frameworks
- [Common Patterns](Common-Patterns) - Reusable patterns and solutions

### Reference
- [API Reference](API-Reference) - Complete method and interface reference
- [CSS Class Reference](CSS-Class-Reference) - All CSS classes and their purposes
- [Troubleshooting](Troubleshooting) - Common issues and solutions
- [Migration Guide](Migration-Guide) - Upgrading between versions

## 🎯 Project Overview

**Blocky UI** is a lightweight, zero-dependency TypeScript UI component library designed for 3D blocky-themed interfaces. Built specifically for games and interactive applications that need casino-game-style UI with distinctive 3D depth effects.

### Key Features
- **🚫 Zero Dependencies**: Pure TypeScript/JavaScript + CSS
- **🎨 Pure CSS Effects**: Multi-layer box shadows for 3D depth
- **⚡ Smooth Animations**: 3D hover effects and transitions
- **📱 Responsive**: Mobile-first responsive design
- **🎮 Game-Ready**: Optimized for interactive applications
- **🔧 TypeScript**: Full type safety and IntelliSense

### Design Philosophy
- **Simplicity First**: Easy to use, minimal API surface
- **Performance Focused**: Pure CSS for maximum performance
- **Modular Architecture**: Use only what you need
- **Casino Game Aesthetic**: Inspired by Stack Rush multiplier tags

## 🏗️ Architecture Highlights

### Component Structure
```
Blocky Component
├── Wrapper Element (positioning, transforms)
├── Main Element (3D styling, gradients)
├── Gradient Overlay (pseudo-element)
└── Content Layer (text, interactive elements)
```

### 3D Effect Layers
1. **Base Shadow** - Ground shadow for depth (4px offset)
2. **Far Shadow** - Extended depth shadow (8px blur)
3. **Inset Highlights** - Top highlight and bottom shadow
4. **Hover Transform** - Y-axis translate with enhanced shadows

### Build Pipeline
- **Rollup** - Modern bundling with tree-shaking
- **TypeScript** - Full type safety and declarations
- **PostCSS** - CSS processing and bundling
- **Multiple Formats** - ESM, CJS, UMD outputs

## 📦 Components Overview

### Interactive Components
- **[BlockyButton](Component-Reference#blockybutton)** - 4 variants with 3D hover effects
- **[BlockyDropdown](Component-Reference#blockydropdown)** - Theme-aware dropdowns with 4 variants
- **[BlockyModal](Component-Reference#blockymodal)** - Full-featured modals with backdrop blur

### Display Components
- **[BlockyCard](Component-Reference#blockycard)** - Content containers with 3D styling
- **[BlockyInfo](Component-Reference#blockyinfo)** - Overlay popups with 5 color themes
- **[BlockyTag](Component-Reference#blockytag)** - Status tags with gradient styling
- **[BlockyPage](Component-Reference#blockypage)** - Full-screen pages with animated gradient borders

### Utility Components
- **Error Notifications** - Pre-configured error modals
- **Confirmation Dialogs** - Yes/No confirmation modals
- **Notifications** - Toast-style notifications

## 🎨 Visual Design System

### Color Palette
```css
--blocky-primary: #55dfff      /* Cyan Blue */
--blocky-danger: #ff4444       /* Alert Red */
--blocky-gray: rgb(100, 100, 100)      /* Default Gray */
--blocky-secondary: rgb(85, 223, 255)  /* Bright Cyan */
```

### 3D Depth Effects
- **Multi-layer Shadows**: Creating realistic 3D depth
- **Gradient Backgrounds**: Multi-stop linear gradients with transparency
- **Radial Overlays**: Depth through pseudo-elements
- **Backdrop Blur**: Modern glassmorphism effects

### Typography
- **Titles**: Bold, uppercase for headers
- **Body**: Clean, readable for content
- **Buttons**: Medium weight for actions

## 🚀 Getting Started Fast

1. **Install Package**
   ```bash
   npm install blocky-ui-lite
   ```

2. **Import & Use**
   ```typescript
   import { BlockyUI } from 'blocky-ui-lite';
   import 'blocky-ui-lite/styles';

   const button = BlockyUI.createButton({
     text: 'Launch Sequence',
     variant: 'primary',
     onClick: () => console.log('Launched!')
   });
   ```

3. **Styles Included**
   ```typescript
   // CSS is automatically imported via 'blocky-ui-lite/styles'
   // No separate link tag needed
   ```

## 🎮 Perfect For Games

- **No Framework Lock-in**: Works with any engine
- **Performance Optimized**: Pure CSS for 60fps animations
- **Memory Efficient**: Minimal memory footprint
- **Event-Driven**: Clean event handling
- **Responsive**: Adapts to different screen sizes

## 💡 Design Decisions

### Why Pure CSS?
- **Performance**: Hardware-accelerated rendering
- **No Runtime Cost**: No JavaScript styling calculations
- **Simplicity**: Easy to understand and modify
- **Compatibility**: Works everywhere CSS works

### Why Zero Dependencies?
- **Bundle Size**: Keep your game lightweight
- **Compatibility**: Works everywhere JavaScript works
- **Security**: No third-party vulnerabilities
- **Simplicity**: Less complexity, fewer bugs

### Why TypeScript?
- **Developer Experience**: IntelliSense and autocomplete
- **Type Safety**: Catch errors at compile time
- **Documentation**: Types serve as inline docs
- **Refactoring**: Safe code changes

## 🔗 Quick Links

- **[GitHub Repository](https://github.com/fuR-Gaming/blocky-ui)**
- **[Issues & Bug Reports](https://github.com/fuR-Gaming/blocky-ui/issues)**
- **[Discussions](https://github.com/fuR-Gaming/blocky-ui/discussions)**
- **[Latest Release](https://github.com/fuR-Gaming/blocky-ui/releases)**

## 📚 Next Steps

1. **New to the library?** Start with [Installation & Setup](Installation-&-Setup)
2. **Want to see code?** Check out [Complete Examples](Complete-Examples)
3. **Building a game?** Read [Game Integration](Game-Integration)
4. **Contributing?** See [Development Workflow](Development-Workflow)

---

**Built for gaming. Designed with 3D depth. 🎮**

*This wiki is maintained by the Blocky UI community. Contributions welcome!*
