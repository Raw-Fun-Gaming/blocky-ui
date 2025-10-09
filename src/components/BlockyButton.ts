import type { BlockyButtonOptions } from '../types';

export class BlockyButton {
  /**
   * Creates a 3D blocky-themed button with pure CSS styling
   */
  static create(options: BlockyButtonOptions): HTMLButtonElement {
    // Create button wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-btn-wrapper';

    // Create actual button element
    const button = document.createElement('button');
    button.className = `blocky-btn blocky-gradient blocky-3d ${options.variant || 'default'}`;

    if (options.className) {
      button.className += ` ${options.className}`;
    }

    button.textContent = options.text;
    button.disabled = options.disabled || false;

    if (options.onClick) {
      button.addEventListener('click', options.onClick);
    }

    wrapper.appendChild(button);
    return wrapper as any; // Cast to HTMLButtonElement for compatibility
  }
}
