import ModalContent from '../modal/modal-content';
import ModalSubtitle from '../modal/modal-subtitle';
import ModalTitle from '../modal/modal-title';
import Drawer from './drawer';

export type DrawerType = typeof Drawer & {
  Title: typeof ModalTitle;
  Subtitle: typeof ModalSubtitle;
  Content: typeof ModalContent;
};

(Drawer as DrawerType).Title = ModalTitle;
(Drawer as DrawerType).Subtitle = ModalSubtitle;
(Drawer as DrawerType).Content = ModalContent;

export type {
  ModalContentProps as DrawerContentProps,
  ModalSubtitleProps as DrawerSubtitleProps,
  ModalTitleProps as DrawerTitleProps,
} from '../modal';

export type { DrawerProps } from './drawer';

export default Drawer as DrawerType;
