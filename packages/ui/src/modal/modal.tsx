import {
  Children,
  HTMLAttributes,
  MouseEvent,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../shared/backdrop';
import useKeyboard, { KeyCode } from '../use-keyboard';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import useBodyScroll from '../utils/use-body-scroll';
import usePortal from '../utils/use-portal';
import ModalAction from './modal-action';
import ModalActions from './modal-actions';
import { ModalConfig, ModalContext } from './modal-context';
import ModalWrapper from './modal-wrapper';

interface Props {
  disableBackdropClick?: boolean;
  onClose?: () => void;
  onContentClick?: (event: MouseEvent<HTMLElement>) => void;
  visible?: boolean;
  keyboard?: boolean;
  wrapClassName?: string;
  positionClassName?: string;
  backdropClassName?: string;
  layerClassName?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type ModalProps = Props & NativeAttrs;

function Modal({
  visible: customVisible,
  onClose,
  children,
  keyboard = true,
  wrapClassName = '',
  onContentClick,
  disableBackdropClick = false,
  positionClassName = '',
  backdropClassName = '',
  layerClassName = '',
}: ModalProps) {
  const { SCALES } = useScale();
  const portal = usePortal('modal');
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 });

  const [visible, setVisible] = useState(false);

  const [withoutActionsChildren, ActionsChildren] = pickChild(
    children,
    ModalAction
  );

  const hasActions = !!ActionsChildren && !!Children.count(ActionsChildren);

  const closeModal = () => {
    onClose?.();
    setVisible(false);
    setBodyHidden(false);
  };

  useEffect(() => {
    if (typeof customVisible === 'undefined') return;

    setVisible(customVisible);
    setBodyHidden(customVisible);
  }, [customVisible]);

  const { bindings } = useKeyboard(
    () => keyboard && closeModal(),
    KeyCode.Escape,
    { disableGlobalEvent: true }
  );

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return;
    closeModal();
  };

  const modalConfig: ModalConfig = useMemo(() => ({ close: closeModal }), []);

  if (!portal) return null;

  return createPortal(
    <ModalContext.Provider value={modalConfig}>
      <Backdrop
        onClick={closeFromBackdrop}
        onContentClick={onContentClick}
        visible={visible}
        width={SCALES.width(26)}
        positionClassName={positionClassName}
        backdropClassName={backdropClassName}
        layerClassName={layerClassName}
        {...bindings}
      >
        <ModalWrapper visible={visible} className={wrapClassName}>
          {withoutActionsChildren}
          {hasActions && <ModalActions>{ActionsChildren}</ModalActions>}
        </ModalWrapper>
      </Backdrop>
    </ModalContext.Provider>,
    portal
  );
}

export default withScale(Modal);
