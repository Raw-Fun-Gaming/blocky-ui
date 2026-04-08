import type { RfuiButtonOptions } from '../types';

export class RfuiButton {
  /**
   * Creates a 3D rfui-themed button with pure CSS styling
   */
  static create(options: RfuiButtonOptions): HTMLButtonElement {
    // Create button wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'rfui-btn-wrapper';

    // Create actual button element
    const button = document.createElement('button');
    button.className = `rfui-btn rfui-gradient rfui-3d ${options.variant || 'default'}`;

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
