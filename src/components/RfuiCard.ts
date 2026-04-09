import type { RfuiCardOptions } from '../types';

export class RfuiCard {
  /**
   * Creates a themed card with pure CSS styling
   */
  static create(options: RfuiCardOptions): HTMLDivElement {
    // Create wrapper container
    const wrapper = document.createElement('div');
    const variant = options.variant || 'default';
    wrapper.className = `rfui-card-wrapper rfui-gradient rfui-3d ${variant}`;

    // Create actual card content
    const card = document.createElement('div');
    card.className = 'rfui-card';

    if (options.className) {
      card.className += ` ${options.className}`;
    }

    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'rfui-card-title';
      title.textContent = options.title;
      card.appendChild(title);
    }

    const content = document.createElement('div');
    content.className = 'rfui-card-content';

    if (typeof options.content === 'string') {
      content.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      content.appendChild(options.content);
    } else {
      content.innerHTML = String(options.content || 'No content provided');
    }

    card.appendChild(content);
    wrapper.appendChild(card);

    return wrapper;
  }
}
