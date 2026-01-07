import type { BlockyModalOptions } from '../types';
import { BlockyButton } from './BlockyButton';

export interface BlockyModalInstance {
  show(): void;
  close(): void;
  element: HTMLDivElement;
}

export class BlockyModal {
  /**
   * Creates a 3D blocky-themed modal with backdrop blur and pure CSS styling
   * Returns an instance with show() and close() methods
   */
  static create(options: BlockyModalOptions): BlockyModalInstance {
    // Create modal overlay
    const overlay = document.createElement('div');
    overlay.className = 'blocky-modal-overlay';

    // Create modal wrapper
    const modalWrapper = document.createElement('div');
    modalWrapper.className = 'blocky-modal-wrapper blocky-gradient blocky-3d';

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.className = 'blocky-content';

    if (options.className) {
      modalContent.className += ` ${options.className}`;
    }

    // Create header
    const header = document.createElement('div');
    header.className = 'blocky-header-bordered';

    const title = document.createElement('h2');
    title.className = 'blocky-title-enhanced';
    title.textContent = options.title;
    header.appendChild(title);

    // Modal instance object
    const instance: BlockyModalInstance = {
      element: overlay,
      show() {
        document.body.appendChild(overlay);
      },
      close() {
        overlay.style.animation = 'modalFadeIn 0.2s ease-out reverse';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 200);
        if (options.onClose) options.onClose();
      }
    };

    // Create close button if enabled
    if (options.showCloseButton !== false) {
      const closeBtn = document.createElement('button');
      closeBtn.className = 'blocky-close-btn';
      closeBtn.addEventListener('click', () => {
        instance.close();
      });
      modalWrapper.appendChild(closeBtn);
    }

    // Create body
    const body = document.createElement('div');
    body.className = 'blocky-modal-body';

    if (typeof options.content === 'string') {
      body.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      body.appendChild(options.content);
    } else {
      body.innerHTML = String(options.content || 'No content provided');
    }

    // Create footer with buttons
    if (options.buttons && options.buttons.length > 0) {
      const footer = document.createElement('div');
      footer.className = 'blocky-modal-footer';

      options.buttons.forEach((buttonOptions) => {
        const button = BlockyButton.create({
          ...buttonOptions,
          onClick: () => {
            if (buttonOptions.onClick) buttonOptions.onClick();
            // Auto-close modal unless it's a custom button that should keep modal open
            if (!buttonOptions.className?.includes('no-auto-close')) {
              instance.close();
            }
          },
        });
        footer.appendChild(button);
      });

      modalContent.appendChild(header);
      modalContent.appendChild(body);
      modalContent.appendChild(footer);
    } else {
      modalContent.appendChild(header);
      modalContent.appendChild(body);
    }

    // Prevent modal content clicks from closing the modal
    modalWrapper.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close modal when clicking overlay (unless disabled)
    if (options.closeOnOverlayClick !== false) {
      overlay.addEventListener('click', () => {
        instance.close();
      });
    }

    // Close modal on Escape key (unless overlay click is disabled)
    if (options.closeOnOverlayClick !== false) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          instance.close();
          document.removeEventListener('keydown', handleEscape);
        }
      };
      document.addEventListener('keydown', handleEscape);
    }

    modalWrapper.appendChild(modalContent);
    overlay.appendChild(modalWrapper);
    return instance;
  }
}
