import type { BlockyCardOptions } from '../types';

export class BlockyCard {
  /**
   * Creates a 3D blocky-themed card with pure CSS styling
   */
  static create(options: BlockyCardOptions): HTMLDivElement {
    // Create wrapper container
    const wrapper = document.createElement('div');
    wrapper.className = 'blocky-card-wrapper blocky-gradient blocky-3d';

    // Create actual card content
    const card = document.createElement('div');
    card.className = 'blocky-card';

    if (options.className) {
      card.className += ` ${options.className}`;
    }

    if (options.title) {
      const title = document.createElement('h3');
      title.className = 'blocky-card-title';
      title.textContent = options.title;
      card.appendChild(title);
    }

    const content = document.createElement('div');
    content.className = 'blocky-card-content';

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
