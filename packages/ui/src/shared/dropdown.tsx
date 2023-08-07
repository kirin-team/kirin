import {
  MouseEvent,
  MutableRefObject,
  PropsWithChildren,
  memo,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import useClasses from '../use-classes';
import { getRefRect } from '../utils/layouts';
import useClickAnyWhere from '../utils/use-click-anywhere';
import useDOMObserver from '../utils/use-dom-observer';
import usePortal from '../utils/use-portal';
import useResize from '../utils/use-resize';
import useWarning from '../utils/use-warning';
import CssTransition from './css-transition';

interface Props {
  parent?: MutableRefObject<HTMLElement | null> | undefined;
  visible: boolean;
  disableMatchWidth?: boolean;
  getPopupContainer?: () => HTMLElement | null;
}

export type DropdownProps = Props;

interface ReactiveDomReact {
  top: number;
  left: number;
  right: number;
  width: number;
}

const defaultRect: ReactiveDomReact = {
  top: -1000,
  left: -1000,
  right: -1000,
  width: 0,
};

function Dropdown({
  children,
  parent,
  visible,
  disableMatchWidth,
  getPopupContainer,
}: PropsWithChildren<DropdownProps>) {
  const el = usePortal('dropdown', getPopupContainer);
  const classes = useClasses(
    'dropdown',
    disableMatchWidth ? 'disable-match' : 'width-match'
  );

  const [rect, setRect] = useState<ReactiveDomReact>(defaultRect);

  if (!parent) return null;

  if (process.env.NODE_ENV !== 'production')
    if (getPopupContainer && getPopupContainer()) {
      const el = getPopupContainer();
      const style = window.getComputedStyle(el as HTMLDivElement);

      if (style.position === 'static')
        useWarning(
          'The element specified by "getPopupContainer" must have "position" set.'
        );
    }

  const updateRect = () => {
    const {
      top,
      left,
      right,
      width: nativeWidth,
    } = getRefRect(parent, getPopupContainer);

    setRect({ top, left, right, width: nativeWidth });
  };

  useResize(updateRect);

  useClickAnyWhere(() => {
    const { top, left } = getRefRect(parent, getPopupContainer);
    const shouldUpdatePosition = top !== rect.top || left !== rect.left;

    if (!shouldUpdatePosition) return;

    updateRect();
  });

  useDOMObserver(parent, () => updateRect());

  useEffect(() => {
    if (!parent || !parent.current) return;
    parent.current.addEventListener('mouseenter', updateRect);

    return () => {
      if (!parent || !parent.current) return;
      parent.current.removeEventListener('mouseenter', updateRect);
    };
  }, [parent]);

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    event.preventDefault();
  };

  const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) =>
    event.preventDefault();

  if (!el) return null;

  return createPortal(
    <CssTransition visible={visible}>
      <div
        className={classes}
        onClick={clickHandler}
        onMouseDown={mouseDownHandler}
      >
        {children}

        <style jsx>{`
          .dropdown {
            position: absolute;
            top: ${rect.top + 2}px;
            left: ${rect.left}px;
            z-index: 1100;
          }
          .width-match {
            width: ${rect.width}px;
          }
          .disable-match {
            min-width: ${rect.width}px;
          }
        `}</style>
      </div>
    </CssTransition>,
    el
  );
}

export default memo(Dropdown);
