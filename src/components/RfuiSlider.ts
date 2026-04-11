import type { RfuiSliderOptions } from '../types';

export class RfuiSlider {
  /**
   * Creates a themed slider with snap positions and optional labels
   */
  static create(options: RfuiSliderOptions): HTMLDivElement {
    const wrapper = document.createElement('div');
    wrapper.className = 'rfui-slider-wrapper';
    if (options.className) wrapper.className += ` ${options.className}`;

    const input = document.createElement('input');
    input.type = 'range';
    input.className = 'rfui-slider';
    input.min = String(options.min);
    input.max = String(options.max);
    input.step = String(options.step);
    input.value = String(options.value ?? options.min);

    if (options.onChange) {
      input.addEventListener('input', () => {
        options.onChange!(Number(input.value));
      });
    }

    // Stop click events from propagating to parent (e.g. card onClick)
    wrapper.addEventListener('pointerdown', (e) => e.stopPropagation());
    wrapper.addEventListener('click', (e) => e.stopPropagation());

    wrapper.appendChild(input);

    // Labels row
    if (options.labels && options.labels.length > 0) {
      const labelsRow = document.createElement('div');
      labelsRow.className = 'rfui-slider-labels';

      options.labels.forEach((text, i) => {
        const label = document.createElement('span');
        label.className = 'rfui-slider-label';
        label.textContent = text;
        if (i === Number(input.value)) label.classList.add('active');
        labelsRow.appendChild(label);
      });

      // Update active label on change
      input.addEventListener('input', () => {
        const idx = Number(input.value);
        labelsRow.querySelectorAll('.rfui-slider-label').forEach((el, i) => {
          el.classList.toggle('active', i === idx);
        });
      });

      wrapper.appendChild(labelsRow);
    }

    return wrapper;
  }
}
