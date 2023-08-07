import Modal from './modal';
import ModalAction from './modal-action';
import ModalContent from './modal-content';
import ModalSubtitle from './modal-subtitle';
import ModalTitle from './modal-title';

export type ModalType = typeof Modal & {
  Title: typeof ModalTitle;
  Subtitle: typeof ModalSubtitle;
  Content: typeof ModalContent;
  Action: typeof ModalAction;
};

(Modal as ModalType).Title = ModalTitle;
(Modal as ModalType).Subtitle = ModalSubtitle;
(Modal as ModalType).Content = ModalContent;
(Modal as ModalType).Action = ModalAction;

export type { ModalProps } from './modal';
export type { ModalActionProps } from './modal-action';
export type { ModalContentProps } from './modal-content';
export type { ModalSubtitleProps } from './modal-subtitle';
export type { ModalTitleProps } from './modal-title';

export default Modal as ModalType;
