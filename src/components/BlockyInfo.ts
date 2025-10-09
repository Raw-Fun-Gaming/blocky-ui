import type { BlockyInfoOptions } from '../types';

export class BlockyInfo {
  /**
   * Create an info overlay with 3D blocky styling and color themes
   */
  static create(options: BlockyInfoOptions): HTMLDivElement {
    // Create info overlay with transparent blur
    const overlay = document.createElement('div');
    overlay.className = 'blocky-info-overlay';

    // Create info wrapper
    const infoWrapper = document.createElement('div');
    infoWrapper.className = 'blocky-info-wrapper blocky-gradient blocky-3d';

    // Apply color theme class if specified
    if (options.titleColor) {
      infoWrapper.classList.add(`theme-${options.titleColor}`);
    }

    // Create info content container
    const infoContent = document.createElement('div');
    infoContent.className = 'blocky-content';

    if (options.className) {
      infoContent.className += ` ${options.className}`;
    }

    // Create header only if title is provided
    let header: HTMLDivElement | undefined;
    if (options.title) {
      header = document.createElement('div');
      header.className = 'blocky-header-bordered';

      const title = document.createElement('h2');
      title.className = `blocky-info-title blocky-title-enhanced`;
      title.textContent = options.title;
      header.appendChild(title);
    }

    // Create body
    const body = document.createElement('div');
    body.className = 'blocky-info-body';

    if (typeof options.content === 'string') {
      body.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      body.appendChild(options.content);
    } else {
      body.innerHTML = String(options.content || 'No content provided');
    }

    // Assemble info content (header + body only, no buttons)
    if (header) {
      infoContent.appendChild(header);
    }
    infoContent.appendChild(body);

    // Prevent info content clicks from closing the info
    infoWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close info when clicking overlay
    overlay.addEventListener('click', () => {
      if (options.onClose) options.onClose();
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    });

    // Assemble the complete info popup
    infoWrapper.appendChild(infoContent);
    overlay.appendChild(infoWrapper);
    return overlay;
  }
}
