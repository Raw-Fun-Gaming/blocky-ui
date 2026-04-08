import type { RfuiDropdownOptions } from '../types';

export class RfuiDropdown {
  /**
   * Creates a 3D rfui-themed dropdown with pure CSS styling
   */
  static create(options: RfuiDropdownOptions): HTMLDivElement {
    // Create dropdown wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'rfui-dropdown-wrapper';

    // Create label if provided
    if (options.label) {
      const labelEl = document.createElement('label');
      labelEl.className = 'rfui-dropdown-label';
      labelEl.textContent = options.label;
      wrapper.appendChild(labelEl);
    }

    // Create select element
    const select = document.createElement('select');
    select.className = `rfui-dropdown rfui-gradient rfui-3d ${options.variant || 'default'}`;

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
