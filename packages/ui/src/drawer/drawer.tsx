import { HTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Backdrop from '../shared/backdrop';
import useBodyScroll from '../use-body-scroll';
import useKeyboard, { KeyCode } from '../use-keyboard';
import { withScale } from '../use-scale';
import usePortal from '../utils/use-portal';
import DrawerWrapper from './drawer-wrapper';
import { DrawerPlacement } from './helper';

interface Props {
  visible?: boolean;
  keyboard?: boolean;
  disableBackdropClick?: boolean;
  onClose?: () => void;
  onContentClick?: (event: MouseEvent<HTMLElement>) => void;
  wrapClassName?: string;
  placement?: DrawerPlacement;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type DrawerProps = Props & NativeAttrs;

function Drawer({
  visible: customVisible,
  keyboard = true,
  disableBackdropClick = false,
  onClose,
  onContentClick,
  wrapClassName = '',
  children,
  placement = 'right',
  ...props
}: DrawerProps) {
  const portal = usePortal('drawer');
  const [, setBodyHidden] = useBodyScroll(null, { delayReset: 300 });

  const [visible, setVisible] = useState(false);

  const closeDrawer = () => {
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
    () => keyboard && closeDrawer(),
    KeyCode.Escape,
    { disableGlobalEvent: true }
  );

  const closeFromBackdrop = () => {
    if (disableBackdropClick) return;
    closeDrawer();
  };

  if (!portal) return null;

  return createPortal(
    <Backdrop
      onClick={closeFromBackdrop}
      onContentClick={onContentClick}
      visible={visible}
      width="100%"
      {...bindings}
    >
      <DrawerWrapper
        visible={visible}
        className={wrapClassName}
        placement={placement}
        {...props}
      >
        {children}
      </DrawerWrapper>
    </Backdrop>,
    portal
  );
}

export default withScale(Drawer);
