// ========================================
// RAW FUN UI DEMO
// Interactive demonstrations of all components
// ========================================

// RawFunUI is loaded from UMD build via CDN
// Accessing from window.RawFunUI.RawFunUI
const RawFunUI = window.RawFunUI?.RawFunUI || window.RawFunUI;

// Default to blocky theme for demo
RawFunUI.setTheme('blocky');

// ========================================
// THEME SWITCHER
// ========================================

const themeSwitcherContainer = document.getElementById('theme-switcher-container');

const themeWrapper = document.createElement('div');
themeWrapper.style.cssText = 'display: flex; align-items: center; gap: 10px;';

const themeLabel = document.createElement('span');
themeLabel.textContent = '🎨 Theme:';
themeLabel.style.cssText = 'font-weight: bold; opacity: 0.9;';

const themeDropdown = RawFunUI.createDropdown({
  options: [
    { value: 'blocky', label: 'Blocky' },
    { value: 'vanilla', label: 'Vanilla (No Theme)' },
    { value: 'fall-guys', label: 'Fall Guys' },
    { value: 'animal-crossing', label: 'Animal Crossing' }
  ],
  value: 'blocky',
  variant: 'secondary',
  onChange: (value) => {
    RawFunUI.setTheme(value);
    console.log(`Theme changed to: ${value}`);
  }
});

themeWrapper.appendChild(themeLabel);
themeWrapper.appendChild(themeDropdown);
themeSwitcherContainer.appendChild(themeWrapper);

// ========================================
// BUTTONS DEMO
// ========================================

const buttonsContainer = document.getElementById('buttons-container');
const buttonVariants = ['default', 'primary', 'secondary', 'danger'];

buttonVariants.forEach(variant => {
  const btn = RawFunUI.createButton({
    text: variant.toUpperCase(),
    variant: variant,
    onClick: () => alert(`${variant} button clicked!`)
  });
  buttonsContainer.appendChild(btn);
});

// Disabled button
const disabledBtn = RawFunUI.createButton({
  text: 'DISABLED',
  disabled: true
});
buttonsContainer.appendChild(disabledBtn);

// ========================================
// DROPDOWNS DEMO
// ========================================

const dropdownsContainer = document.getElementById('dropdowns-container');

// Create a demo container for each variant
const dropdownVariants = ['default', 'primary', 'secondary', 'danger'];

dropdownVariants.forEach(variant => {
  const container = document.createElement('div');
  container.style.cssText = 'padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;';

  const title = document.createElement('h3');
  title.textContent = `${variant.toUpperCase()} Dropdown`;
  title.style.marginTop = '0';
  container.appendChild(title);

  const dropdown = RawFunUI.createDropdown({
    label: 'Select an option:',
    options: [
      { value: 'option1', label: 'Option 1' },
      { value: 'option2', label: 'Option 2' },
      { value: 'option3', label: 'Option 3' },
      { value: 'option4', label: 'Option 4' }
    ],
    value: 'option1',
    variant: variant,
    onChange: (value) => {
      console.log(`${variant} dropdown changed to:`, value);
      alert(`Selected: ${value}`);
    }
  });

  container.appendChild(dropdown);
  dropdownsContainer.appendChild(container);
});

// Add disabled dropdown example
const disabledContainer = document.createElement('div');
disabledContainer.style.cssText = 'padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;';

const disabledTitle = document.createElement('h3');
disabledTitle.textContent = 'DISABLED Dropdown';
disabledTitle.style.marginTop = '0';
disabledContainer.appendChild(disabledTitle);

const disabledDropdown = RawFunUI.createDropdown({
  label: 'This dropdown is disabled:',
  options: [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' }
  ],
  value: 'option1',
  variant: 'default',
  disabled: true
});

disabledContainer.appendChild(disabledDropdown);
dropdownsContainer.appendChild(disabledContainer);

// ========================================
// CARDS DEMO
// ========================================

const cardsContainer = document.getElementById('cards-container');
const cardData = [
  { title: 'Default Card', content: 'This is a card with gradient styling.', variant: 'default' },
  { title: 'Primary Card', content: 'Hover over the card to see the lifting effect.', variant: 'primary' },
  { title: 'Secondary Card', content: 'All components use pure CSS for 3D depth.', variant: 'secondary' }
];

cardData.forEach(data => {
  const card = RawFunUI.createCard(data);
  cardsContainer.appendChild(card);
});

// ========================================
// MODALS DEMO
// ========================================

const modalsContainer = document.getElementById('modals-container');

// Simple modal
const simpleModalBtn = RawFunUI.createButton({
  text: 'SIMPLE MODAL',
  variant: 'primary',
  onClick: () => {
    const modal = RawFunUI.createModal({
      title: 'Welcome',
      content: 'This is a blocky modal with 3D effects!',
      buttons: [
        { text: 'OK', onClick: () => {} }
      ]
    });
    modal.show();
  }
});
modalsContainer.appendChild(simpleModalBtn);

// Notification modal
const notificationBtn = RawFunUI.createButton({
  text: 'NOTIFICATION',
  variant: 'primary',
  onClick: () => {
    RawFunUI.showNotification(
      'Success!',
      'Your action was completed successfully.',
      () => console.log('Notification closed')
    );
  }
});
modalsContainer.appendChild(notificationBtn);

// Confirmation modal
const confirmBtn = RawFunUI.createButton({
  text: 'CONFIRMATION',
  variant: 'secondary',
  onClick: () => {
    RawFunUI.showConfirmation(
      'Confirm Action',
      'Are you sure you want to proceed?',
      () => alert('Confirmed!'),
      () => alert('Cancelled!')
    );
  }
});
modalsContainer.appendChild(confirmBtn);

// Error modal
const errorBtn = RawFunUI.createButton({
  text: 'ERROR',
  variant: 'danger',
  onClick: () => {
    RawFunUI.showError(
      'Error Occurred',
      'Something went wrong. Please try again.'
    );
  }
});
modalsContainer.appendChild(errorBtn);

// ========================================
// TAGS DEMO
// ========================================

const tagsContainer = document.getElementById('tags-container');
const tagData = [
  { content: '×1.5', variant: 'default' },
  { content: '×2.5', variant: 'primary' },
  { content: '×5.0', variant: 'secondary' },
  { content: 'NEW', variant: 'primary' },
  { content: 'VIP', variant: 'danger' }
];

tagData.forEach((data) => {
  // Create a relative positioned container for demo display
  const container = document.createElement('div');
  container.style.position = 'relative';
  container.style.width = '180px';
  container.style.height = '80px';
  container.style.display = 'flex';
  container.style.alignItems = 'center';
  container.style.justifyContent = 'center';
  container.style.flexShrink = '0';

  const tag = RawFunUI.createTag({
    content: data.content,
    variant: data.variant
  });

  container.appendChild(tag);
  tagsContainer.appendChild(container);
});

// ========================================
// INFO OVERLAYS DEMO
// ========================================

const infoContainer = document.getElementById('info-container');
const infoColors = ['yellow', 'green', 'blue', 'purple', 'red'];

infoColors.forEach(color => {
  const btn = RawFunUI.createButton({
    text: color.toUpperCase(),
    onClick: () => {
      const info = RawFunUI.createInfo({
        title: `${color.toUpperCase()} INFO`,
        titleColor: color,
        content: `This is a ${color} themed info overlay!`,
        onClose: () => console.log('Info closed')
      });
      document.body.appendChild(info);
    }
  });
  infoContainer.appendChild(btn);
});

// ========================================
// SLIDERS DEMO
// ========================================

const slidersContainer = document.getElementById('sliders-container');

// Basic slider
const basicSliderContainer = document.createElement('div');
basicSliderContainer.style.cssText = 'padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;';

const basicSliderTitle = document.createElement('h3');
basicSliderTitle.textContent = 'Basic Slider';
basicSliderTitle.style.marginTop = '0';
basicSliderContainer.appendChild(basicSliderTitle);

const basicSliderValue = document.createElement('span');
basicSliderValue.textContent = 'Value: 50';
basicSliderValue.style.cssText = 'display: block; margin-bottom: 10px; opacity: 0.8;';
basicSliderContainer.appendChild(basicSliderValue);

const basicSlider = RawFunUI.createSlider({
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  onChange: (value) => {
    basicSliderValue.textContent = `Value: ${value}`;
  }
});
basicSliderContainer.appendChild(basicSlider);
slidersContainer.appendChild(basicSliderContainer);

// Labeled slider
const labeledSliderContainer = document.createElement('div');
labeledSliderContainer.style.cssText = 'padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;';

const labeledSliderTitle = document.createElement('h3');
labeledSliderTitle.textContent = 'Labeled Slider (Snap Positions)';
labeledSliderTitle.style.marginTop = '0';
labeledSliderContainer.appendChild(labeledSliderTitle);

const labeledSliderValue = document.createElement('span');
labeledSliderValue.textContent = 'Speed: Normal';
labeledSliderValue.style.cssText = 'display: block; margin-bottom: 10px; opacity: 0.8;';
labeledSliderContainer.appendChild(labeledSliderValue);

const speedLabels = ['Slow', 'Normal', 'Fast', 'Turbo'];
const labeledSlider = RawFunUI.createSlider({
  min: 0,
  max: 3,
  step: 1,
  value: 1,
  labels: speedLabels,
  onChange: (value) => {
    labeledSliderValue.textContent = `Speed: ${speedLabels[value]}`;
  }
});
labeledSliderContainer.appendChild(labeledSlider);
slidersContainer.appendChild(labeledSliderContainer);

// Volume slider
const volumeSliderContainer = document.createElement('div');
volumeSliderContainer.style.cssText = 'padding: 20px; background: rgba(255,255,255,0.03); border-radius: 8px;';

const volumeSliderTitle = document.createElement('h3');
volumeSliderTitle.textContent = 'Volume Control';
volumeSliderTitle.style.marginTop = '0';
volumeSliderContainer.appendChild(volumeSliderTitle);

const volumeSliderValue = document.createElement('span');
volumeSliderValue.textContent = 'Volume: 75%';
volumeSliderValue.style.cssText = 'display: block; margin-bottom: 10px; opacity: 0.8;';
volumeSliderContainer.appendChild(volumeSliderValue);

const volumeSlider = RawFunUI.createSlider({
  min: 0,
  max: 100,
  step: 5,
  value: 75,
  onChange: (value) => {
    volumeSliderValue.textContent = `Volume: ${value}%`;
  }
});
volumeSliderContainer.appendChild(volumeSlider);
slidersContainer.appendChild(volumeSliderContainer);

// ========================================
// PAGE DEMO
// ========================================

const pageContainer = document.getElementById('page-container');

// Simple page
const simplePageBtn = RawFunUI.createButton({
  text: 'SIMPLE PAGE',
  variant: 'primary',
  onClick: () => {
    const page = RawFunUI.createPage({
      content: `
        <h1>Welcome to Raw Fun UI</h1>
        <p>This is a full-screen page overlay with 3D blocky styling.</p>
        <p>Click outside or press Escape to close.</p>
      `,
      onClose: () => console.log('Page closed')
    });
    page.show();
  }
});
pageContainer.appendChild(simplePageBtn);

// Rich content page
const richPageBtn = RawFunUI.createButton({
  text: 'RICH CONTENT',
  variant: 'secondary',
  onClick: () => {
    const richContent = document.createElement('div');
    richContent.innerHTML = `
      <h1>🎮 Raw Fun UI Component Library</h1>

      <h2>Pure CSS 3D Effects</h2>
      <p>All components use pure CSS for depth and styling - no SVG generation or runtime styling. The distinctive 3D blocky aesthetic is achieved through multi-layer box shadows, gradient backgrounds, and backdrop blur effects.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>

      <h2>Component Library</h2>
      <ul>
        <li><strong>Buttons:</strong> 4 color variants (default, primary, secondary, danger) with 3D hover effects</li>
        <li><strong>Cards:</strong> Content containers with 3D styling and optional headers</li>
        <li><strong>Modals:</strong> Overlay dialogs with backdrop blur and smooth animations</li>
        <li><strong>Info Overlays:</strong> 5 color themes (yellow, green, blue, purple, red) with auto-dismiss</li>
        <li><strong>Tags:</strong> Small label-style tags with compact styling</li>
        <li><strong>Full-screen Pages:</strong> Scrollable pages with animated gradient borders</li>
      </ul>

      <h2>Animated Gradient Borders</h2>
      <p>Page components feature unique animated gradient borders that smoothly transition between 7 predefined color sets:</p>
      <ul>
        <li>🌅 Warm sunset (red-orange-yellow)</li>
        <li>🌊 Cool ocean (blue-cyan-turquoise)</li>
        <li>🪄 Purple magic (purple-pink-rose)</li>
        <li>🌲 Green forest (emerald-lime-yellow)</li>
        <li>🌈 Rainbow spectrum (red-green-blue)</li>
        <li>🌇 Golden hour (orange-gold-yellow)</li>
        <li>⚡ Neon glow (cyan-magenta-yellow)</li>
      </ul>
      <p>The gradient colors rise from bottom to top in a 10-second animation loop, with smooth 2-second transitions between color changes using CSS @property.</p>

      <h2>Zero Dependencies</h2>
      <p>Lightweight and portable with no runtime dependencies. The entire library is built with TypeScript and pure CSS, making it easy to integrate into any project.</p>

      <h2>TypeScript Support</h2>
      <p>Full type definitions included for all components, options, and instances. The library uses a modern factory pattern that returns typed instances with methods.</p>

      <h2>Responsive Design</h2>
      <p>All components are fully responsive with mobile-first design. Breakpoints at 840px, 768px, 560px, and 480px ensure optimal display on all devices.</p>

      <h2>Installation</h2>
      <p>Install via npm (coming soon):</p>
      <pre style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; overflow-x: auto;">npm install raw-fun-ui</pre>

      <h2>Usage Example</h2>
      <pre style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 6px; overflow-x: auto; line-height: 1.6;">
import { RawFunUI } from 'raw-fun-ui';
import 'raw-fun-ui/styles';

// Create button
const button = RawFunUI.createButton({
  text: 'Click Me',
  variant: 'primary',
  onClick: () => console.log('Clicked')
});

// Create modal
const modal = RawFunUI.createModal({
  title: 'Hello',
  content: 'World',
  buttons: [
    { text: 'OK', variant: 'primary', onClick: () => {} }
  ]
});
modal.show();

// Show notification
RawFunUI.showNotification('Success!', 'Operation completed.');
      </pre>

      <h2>License</h2>
      <p>MIT License - Free to use in personal and commercial projects.</p>

      <h2>Repository</h2>
      <p>GitHub: <a href="https://github.com/fuR-Gaming/raw-fun-ui" style="color: var(--rfui-primary);">fuR-Gaming/raw-fun-ui</a></p>

      <h2>Credits</h2>
      <p>Built with Claude Code by Raw Fun Gaming.</p>

      <p style="margin-top: 40px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 6px;">
        <em>Scroll down to test the animated gradient border behavior with long content...</em>
      </p>

      <div style="height: 400px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 6px; margin-top: 20px;">
        <p style="text-align: center; font-size: 20px;">
          ⬇️<br>
          End of content<br>
          The gradient border should remain visible while scrolling
        </p>
      </div>
    `;

    const page = RawFunUI.createPage({
      content: richContent,
      onClose: () => console.log('Rich page closed')
    });
    page.show();
  }
});
pageContainer.appendChild(richPageBtn);

// ========================================
// LIVE INTERACTIVE DEMOS
// ========================================

// Button Builder
function updateButtonPreview() {
  const text = document.getElementById('btn-text').value;
  const variant = document.getElementById('btn-variant').value;
  const preview = document.getElementById('live-button-preview');

  preview.innerHTML = '';
  const button = RawFunUI.createButton({
    text: text,
    variant: variant,
    onClick: () => alert(`You clicked: ${text}`)
  });
  preview.appendChild(button);
}

document.getElementById('btn-text').addEventListener('input', updateButtonPreview);
document.getElementById('btn-variant').addEventListener('change', updateButtonPreview);
updateButtonPreview(); // Initial render

// Tag Builder
function updateTagPreview() {
  const text = document.getElementById('tag-text').value;
  const variant = document.getElementById('tag-variant').value;
  const preview = document.getElementById('live-tag-preview');

  preview.innerHTML = '';
  const tag = RawFunUI.createTag({
    content: text,
    variant: variant
  });
  preview.appendChild(tag);
}

document.getElementById('tag-text').addEventListener('input', updateTagPreview);
document.getElementById('tag-variant').addEventListener('change', updateTagPreview);
updateTagPreview(); // Initial render

// Modal Builder
function updateModalTrigger() {
  const title = document.getElementById('modal-title').value;
  const content = document.getElementById('modal-content').value;
  const preview = document.getElementById('live-modal-trigger');

  preview.innerHTML = '';
  const button = RawFunUI.createButton({
    text: 'SHOW CUSTOM MODAL',
    variant: 'primary',
    onClick: () => {
      const modal = RawFunUI.createModal({
        title: title,
        content: content,
        buttons: [
          { text: 'Close', variant: 'default', onClick: () => {} }
        ]
      });
      modal.show();
    }
  });
  preview.appendChild(button);
}

document.getElementById('modal-title').addEventListener('input', updateModalTrigger);
document.getElementById('modal-content').addEventListener('input', updateModalTrigger);
updateModalTrigger(); // Initial render
