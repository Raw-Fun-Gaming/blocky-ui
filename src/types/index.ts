// Raw Fun UI TypeScript Types

export type ComponentVariant = 'default' | 'primary' | 'secondary' | 'danger';
export type TitleColorTheme = 'yellow' | 'green' | 'blue' | 'purple' | 'red';

/**
 * Available RawFunUI themes
 * - 'blocky': Default dark blocky theme
 * - 'fall-guys': Bright, playful cartoon theme with white borders
 * - 'animal-crossing': Flat, cozy theme with earthy tones and pill shapes
 */
export type RfuiTheme = 'blocky' | 'fall-guys' | 'animal-crossing';

export interface RfuiButtonOptions {
  text: string;
  variant?: ComponentVariant;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface RfuiModalOptions {
  title: string;
  content: string | HTMLElement;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean; // Whether clicking the overlay closes the modal (default: true)
  buttons: RfuiButtonOptions[];
  onClose?: () => void;
  className?: string;
}

export interface RfuiCardOptions {
  title?: string;
  content: string | HTMLElement;
  variant?: ComponentVariant;
  className?: string;
}

export interface RfuiInfoOptions {
  title?: string;
  titleColor?: 'yellow' | 'green' | 'blue' | 'purple' | 'red';
  content: string | HTMLElement;
  className?: string;
  onClose?: () => void;
}

export interface RfuiTagOptions {
  title?: string;
  content: string | HTMLElement;
  variant?: ComponentVariant;
  className?: string;
}

export interface RfuiDropdownOption {
  value: string;
  label: string;
}

export interface RfuiDropdownOptions {
  options: RfuiDropdownOption[];
  value?: string;
  variant?: ComponentVariant;
  onChange?: (value: string) => void;
  disabled?: boolean;
  placeholder?: string;
  label?: string;
  className?: string;
}

export interface RfuiPageOptions {
  content: string | HTMLElement;
  onClose?: () => void;
  className?: string;
  customScrollbar?: boolean; // Enable custom auto-hide scrollbar (default: true)
}

export interface RfuiPageInstance {
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
  BUTTON_WRAPPER: 'rfui-btn-wrapper';
  MODAL_WRAPPER: 'rfui-modal-wrapper';
  CARD_WRAPPER: 'rfui-card-wrapper';
  TAG_WRAPPER: 'rfui-tag-wrapper';
  INFO_WRAPPER: 'rfui-info-wrapper';

  RFUI_CONTENT: 'rfui-content';
  RFUI_HEADER: 'rfui-header';
  RFUI_HEADER_BORDERED: 'rfui-header-bordered';
  RFUI_TITLE: 'rfui-title';
  RFUI_TITLE_ENHANCED: 'rfui-title-enhanced';

  MODAL_OVERLAY: 'rfui-modal-overlay';
  INFO_OVERLAY: 'rfui-info-overlay';
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

export interface RawFunUIInterface {
  createButton(options: RfuiButtonOptions): HTMLElement;
  createModal(options: RfuiModalOptions): HTMLElement;
  createCard(options: RfuiCardOptions): HTMLElement;
  createInfo(options: RfuiInfoOptions): HTMLElement;
  createTag(options: RfuiTagOptions): HTMLElement;

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
