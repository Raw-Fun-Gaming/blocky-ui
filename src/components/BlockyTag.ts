import type { BlockyTagOptions } from '../types';

export class BlockyTag {
  /**
   * Creates a 3D blocky-themed tag (compact display element)
   */
  static create(options: BlockyTagOptions): HTMLDivElement {
    // Create tag wrapper
    const tagWrapper = document.createElement('div');
    const variant = options.variant || 'default';
    tagWrapper.className = `blocky-tag-wrapper blocky-gradient blocky-3d ${variant}`;

    // Create tag content container
    const tagContent = document.createElement('div');
    tagContent.className = 'blocky-tag-content';

    if (options.className) {
      tagContent.className += ` ${options.className}`;
    }

    // Create header if title is provided
    if (options.title) {
      const header = document.createElement('div');
      header.className = 'blocky-tag-header';

      const title = document.createElement('h3');
      title.className = 'blocky-tag-title';
      title.textContent = options.title;
      header.appendChild(title);
      tagContent.appendChild(header);
    }

    // Add content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'blocky-tag-body';

    if (typeof options.content === 'string') {
      contentDiv.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      contentDiv.appendChild(options.content);
    } else {
      contentDiv.innerHTML = String(options.content || '');
    }

    tagContent.appendChild(contentDiv);
    tagWrapper.appendChild(tagContent);
    return tagWrapper;
  }
}
