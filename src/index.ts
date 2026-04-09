// Main entry point for Raw Fun UI package

// Import styles
import './styles/raw-fun-ui.css';

// Import components
import { RfuiButton } from './components/RfuiButton';
import { RfuiModal, RfuiModalInstance } from './components/RfuiModal';
import { RfuiCard } from './components/RfuiCard';
import { RfuiInfo } from './components/RfuiInfo';
import { RfuiTag } from './components/RfuiTag';
import { RfuiPage } from './components/RfuiPage';
import { RfuiDropdown } from './components/RfuiDropdown';
import type { RfuiPageInstance } from './types';

// Export all types
export * from './types';
export type { RfuiModalInstance, RfuiPageInstance };

// Import theme type for internal use
import type { RfuiTheme } from './types';

// Main RawFunUI class with static factory methods
export class RawFunUI {
  // Current theme
  private static currentTheme: RfuiTheme = 'vanilla';

  // Component creation methods
  static createButton = RfuiButton.create;
  static createModal = RfuiModal.create;
  static createCard = RfuiCard.create;
  static createInfo = RfuiInfo.create;
  static createTag = RfuiTag.create;
  static createPage = RfuiPage.create;
  static createDropdown = RfuiDropdown.create;

  /**
   * Sets the current theme for all RawFunUI components
   * @param theme - The theme to apply ('vanilla' | 'blocky' | 'fall-guys' | 'animal-crossing')
   */
  static setTheme(theme: RfuiTheme): void {
    RawFunUI.currentTheme = theme;
    if (theme === 'vanilla') {
      document.documentElement.removeAttribute('data-rfui-theme');
    } else {
      document.documentElement.setAttribute('data-rfui-theme', theme);
    }
  }

  /**
   * Gets the current theme
   * @returns The current theme name
   */
  static getTheme(): RfuiTheme {
    return RawFunUI.currentTheme;
  }

  /**
   * Creates and shows a confirmation modal with Cancel/Confirm buttons
   */
  static showConfirmation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): RfuiModalInstance {
    const modal = RawFunUI.createModal({
      title: title,
      content: message,
      buttons: [
        {
          text: 'Cancel',
          variant: 'secondary',
          onClick: onCancel || (() => {}),
        },
        {
          text: 'Confirm',
          variant: 'danger',
          onClick: onConfirm,
        },
      ],
    });
    modal.show();
    return modal;
  }

  /**
   * Creates and shows a notification modal with OK button
   */
  static showNotification(title: string, message: string, onClose?: () => void): RfuiModalInstance {
    const modal = RawFunUI.createModal({
      title: title,
      content: message,
      onClose: onClose,
      buttons: [
        {
          text: 'OK',
          onClick: onClose || (() => {}),
        },
      ],
    });
    modal.show();
    return modal;
  }

  /**
   * Creates and shows an error modal with danger-styled OK button
   */
  static showError(title: string, message: string, onClose?: () => void): RfuiModalInstance {
    const modal = RawFunUI.createModal({
      title: title,
      content: message,
      buttons: [
        {
          text: 'OK',
          variant: 'danger',
          onClick: onClose || (() => {}),
        },
      ],
      onClose: onClose,
    });
    modal.show();
    return modal;
  }
}

// Export individual components
export { RfuiButton, RfuiModal, RfuiCard, RfuiInfo, RfuiTag, RfuiPage, RfuiDropdown };

// Default export
export default RawFunUI;
