// Main entry point for Blocky UI package

// Import styles
import './styles/blocky-ui.css';

// Import components
import { BlockyButton } from './components/BlockyButton';
import { BlockyModal, BlockyModalInstance } from './components/BlockyModal';
import { BlockyCard } from './components/BlockyCard';
import { BlockyInfo } from './components/BlockyInfo';
import { BlockyTag } from './components/BlockyTag';
import { BlockyPage } from './components/BlockyPage';
import type { BlockyPageInstance } from './types';

// Export all types
export * from './types';
export type { BlockyModalInstance, BlockyPageInstance };

// Main BlockyUI class with static factory methods
export class BlockyUI {
  // Component creation methods
  static createButton = BlockyButton.create;
  static createModal = BlockyModal.create;
  static createCard = BlockyCard.create;
  static createInfo = BlockyInfo.create;
  static createTag = BlockyTag.create;
  static createPage = BlockyPage.create;

  /**
   * Creates and shows a confirmation modal with Cancel/Confirm buttons
   */
  static showConfirmation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): BlockyModalInstance {
    const modal = BlockyUI.createModal({
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
  static showNotification(title: string, message: string, onClose?: () => void): BlockyModalInstance {
    const modal = BlockyUI.createModal({
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
  static showError(title: string, message: string, onClose?: () => void): BlockyModalInstance {
    const modal = BlockyUI.createModal({
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
export { BlockyButton, BlockyModal, BlockyCard, BlockyInfo, BlockyTag, BlockyPage };

// Default export
export default BlockyUI;
