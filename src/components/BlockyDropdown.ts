import type { BlockyDropdownOptions } from '../types';

export class BlockyDropdown {
  /**
   * Creates a 3D blocky-themed dropdown with pure CSS styling
   */
  static create(options: BlockyDropdownOptions): HTMLDivElement {
    // Create dropdown wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-dropdown-wrapper';

    // Create label if provided
    if (options.label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'blocky-dropdown-label';
      labelEl.textContent = options.label;
      wrapper.appendChild(labelEl);
    }

    // Create select element
    const select = document.createElement('select');
    select.className = `blocky-dropdown blocky-gradient blocky-3d ${options.variant || 'default'}`;

    if (options.className) {
      select.className += ` ${options.className}`;
    }

    // Add options
    options.options.forEach(opt => {
      const option = document.createElement('option');
      option.value = opt.value;
      option.textContent = opt.label;
      select.appendChild(option);
    });

    // Set initial value
    if (options.value) {
      select.value = options.value;
    }

    // Add change listener
    if (options.onChange) {
      select.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        options.onChange!(target.value);
      });
    }

    // Handle disabled state
    if (options.disabled) {
      select.disabled = true;
    }

    wrapper.appendChild(select);
    return wrapper;
  }
}
