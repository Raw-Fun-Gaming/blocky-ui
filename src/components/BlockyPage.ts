import type { BlockyPageOptions, BlockyPageInstance } from '../types';

export class BlockyPage {
  /**
   * Predefined color gradient sets for page borders
   * Each set contains 3 colors that create a smooth gradient
   */
  private static readonly colorGradients = [
    // Warm sunset (red-orange-yellow)
    ['rgba(255, 100, 100, 0.8)', 'rgba(255, 150, 100, 0.8)', 'rgba(255, 200, 100, 0.8)'],
    // Cool ocean (blue-cyan-turquoise)
    ['rgba(100, 150, 255, 0.8)', 'rgba(100, 200, 255, 0.8)', 'rgba(100, 255, 220, 0.8)'],
    // Purple magic (purple-pink-rose)
    ['rgba(150, 100, 255, 0.8)', 'rgba(200, 100, 255, 0.8)', 'rgba(255, 100, 200, 0.8)'],
    // Green forest (emerald-lime-yellow)
    ['rgba(100, 200, 100, 0.8)', 'rgba(150, 255, 100, 0.8)', 'rgba(200, 255, 150, 0.8)'],
    // Rainbow spectrum (red-green-blue)
    ['rgba(255, 100, 100, 0.8)', 'rgba(100, 255, 100, 0.8)', 'rgba(100, 150, 255, 0.8)'],
    // Golden hour (orange-gold-yellow)
    ['rgba(255, 150, 50, 0.8)', 'rgba(255, 200, 80, 0.8)', 'rgba(255, 230, 120, 0.8)'],
    // Neon glow (cyan-magenta-yellow)
    ['rgba(100, 255, 255, 0.8)', 'rgba(255, 100, 255, 0.8)', 'rgba(255, 255, 100, 0.8)']
  ];

  /**
   * Selects a random color gradient from the predefined sets
   */
  private static getRandomGradient(): [string, string, string] {
    const index = Math.floor(Math.random() * this.colorGradients.length);
    return this.colorGradients[index] as [string, string, string];
  }

  /**
   * Creates a full-screen blocky-themed page overlay
   * Returns an instance with show() and close() methods
   */
  static create(options: BlockyPageOptions): BlockyPageInstance {
    // Create page overlay (full-screen backdrop)
    const overlay = document.createElement('div');
    overlay.className = 'blocky-page-overlay';

    // Create page content container (scrollable full-screen)
    const pageContent = document.createElement('div');
    pageContent.className = 'blocky-page-content';

    // Apply random gradient colors to CSS custom properties
    const [color1, color2, color3] = BlockyPage.getRandomGradient();
    pageContent.style.setProperty('--blocky-page-border-color-1', color1);
    pageContent.style.setProperty('--blocky-page-border-color-2', color2);
    pageContent.style.setProperty('--blocky-page-border-color-3', color3);

    if (options.className) {
      pageContent.className += ` ${options.className}`;
    }

    // Create inner wrapper for content with padding
    const pageWrapper = document.createElement('div');
    pageWrapper.className = 'blocky-page-wrapper';

    // Add custom scrollbar class if enabled (default: true)
    if (options.customScrollbar !== false) {
      pageWrapper.classList.add('custom-scrollbar');
    }

    // Add content to wrapper
    if (typeof options.content === 'string') {
      pageWrapper.innerHTML = options.content;
    } else if (options.content instanceof HTMLElement) {
      pageWrapper.appendChild(options.content);
    } else {
      pageWrapper.innerHTML = String(options.content || 'No content provided');
    }

    // Set up animation cycle to change colors when animation restarts
    let animationInterval: number | null = null;
    const startColorCycle = () => {
      // Change colors every 3 seconds (matching animation duration)
      animationInterval = window.setInterval(() => {
        const [color1, color2, color3] = BlockyPage.getRandomGradient();
        pageContent.style.setProperty('--blocky-page-border-color-1', color1);
        pageContent.style.setProperty('--blocky-page-border-color-2', color2);
        pageContent.style.setProperty('--blocky-page-border-color-3', color3);
      }, 3000);
    };

    // Setup scrollbar auto-hide if custom scrollbar is enabled
    if (options.customScrollbar !== false) {
      let scrollTimeout: number;
      pageWrapper.addEventListener('scroll', () => {
        pageWrapper.classList.add('scrolling');
        clearTimeout(scrollTimeout);
        scrollTimeout = window.setTimeout(() => {
          pageWrapper.classList.remove('scrolling');
        }, 1000);
      });
    }

    // Page instance object
    const instance: BlockyPageInstance = {
      element: overlay,
      show() {
        document.body.appendChild(overlay);
        startColorCycle(); // Start color cycling when page is shown
      },
      close() {
        if (animationInterval !== null) {
          clearInterval(animationInterval); // Stop color cycling
          animationInterval = null;
        }
        overlay.style.animation = 'pageFadeOut 0.3s ease-out';
        pageContent.style.animation = 'pageSlideOut 0.3s ease-out';
        setTimeout(() => {
          if (overlay.parentNode) {
            overlay.parentNode.removeChild(overlay);
          }
        }, 300);
        if (options.onClose) options.onClose();
      }
    };

    // Create close button
    const closeBtn = document.createElement('button');
    closeBtn.className = 'blocky-close-btn';
    closeBtn.addEventListener('click', () => {
      instance.close();
    });

    // Prevent content clicks from closing the page
    pageContent.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    // Close page when clicking overlay background
    overlay.addEventListener('click', () => {
      instance.close();
    });

    // Close page on Escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        instance.close();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);

    // Assemble the structure
    pageContent.appendChild(closeBtn);
    pageContent.appendChild(pageWrapper);
    overlay.appendChild(pageContent);

    return instance;
  }
}
