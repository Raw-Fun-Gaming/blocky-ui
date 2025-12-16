// Blocky UI TypeScript Types

export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'danger';
export type TitleColorTheme = 'yellow' | 'green' | 'blue' | 'purple' | 'red';

/**
 * Available BlockyUI themes
 * - 'blocky': Default dark 3D blocky theme
 * - 'fall-guys': Bright, playful cartoon theme with white borders
 */
export type BlockyTheme = 'blocky' | 'fall-guys';

export interface BlockyButtonOptions {
  text: string;
  variant?: ComponentVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface BlockyModalOptions {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  buttons: BlockyButtonOptions[];
  onClose?: () => void;
  className?: string;
}

export interface BlockyCardOptions {
  title?: string;
  content: string | HTMLElement;
  variant?: ComponentVariant;
  className?: string;
}

export interface BlockyInfoOptions {
  title?: string;
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'red';
  content: string | HTMLElement;
  className?: string;
  onClose?: () => void;
}

export interface BlockyTagOptions {
  title?: string;
  content: string | HTMLElement;
  variant?: ComponentVariant;
  className?: string;
}

export interface BlockyPageOptions {
  content: string | HTMLElement;
  onClose?: () => void;
  className?: string;
}

export interface BlockyPageInstance {
  show(): void;
  close(): void;
  element: HTMLDivElement;
}

export interface ComponentEventHandlers {
  onClick?: () => void;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface CSSClassNames {
  BUTTON_WRAPPER: 'blocky-btn-wrapper';
  MODAL_WRAPPER: 'blocky-modal-wrapper';
  CARD_WRAPPER: 'blocky-card-wrapper';
  TAG_WRAPPER: 'blocky-tag-wrapper';
  INFO_WRAPPER: 'blocky-info-wrapper';

  BLOCKY_CONTENT: 'blocky-content';
  BLOCKY_HEADER: 'blocky-header';
  BLOCKY_HEADER_BORDERED: 'blocky-header-bordered';
  BLOCKY_TITLE: 'blocky-title';
  BLOCKY_TITLE_ENHANCED: 'blocky-title-enhanced';

  MODAL_OVERLAY: 'blocky-modal-overlay';
  INFO_OVERLAY: 'blocky-info-overlay';
}

export interface AnimationConfig {
  duration?: number;
  easing?: 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear';
  delay?: number;
  infinite?: boolean;
}

export interface ResponsiveBreakpoints {
  small: '400px';
  mobile: '480px';
  tablet: '560px';
  medium: '768px';
  large: '840px';
  desktop: '900px';
}

export interface BlockyUIInterface {
  createButton(options: BlockyButtonOptions): HTMLElement;
  createModal(options: BlockyModalOptions): HTMLElement;
  createCard(options: BlockyCardOptions): HTMLElement;
  createInfo(options: BlockyInfoOptions): HTMLElement;
  createTag(options: BlockyTagOptions): HTMLElement;

  showModal(modal: HTMLElement): void;
  closeModal(modal: HTMLElement): void;
  showError(title: string, message: string, onClose?: () => void): void;
  showConfirmation(
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel?: () => void
  ): void;
  showNotification(title: string, message: string, onClose?: () => void): void;
}
