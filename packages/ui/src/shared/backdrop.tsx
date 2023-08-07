import { HTMLAttributes, MouseEvent, memo } from 'react';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import useCurrentState from '../utils/use-current-state';
import CssTransition from './css-transition';

interface Props {
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  visible?: boolean;
  width?: string;
  onContentClick?: (event: MouseEvent<HTMLElement>) => void;
  backdropClassName?: string;
  positionClassName?: string;
  layerClassName?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type BackdropProps = Props & NativeAttrs;

function Backdrop({
  children,
  onClick = () => {},
  visible = false,
  width,
  onContentClick = () => {},
  backdropClassName = '',
  positionClassName = '',
  layerClassName = '',
  ...props
}: BackdropProps) {
  const theme = useTheme();
  const [, setIsContentMouseDown, IsContentMouseDownRef] =
    useCurrentState(false);

  const clickHandler = (event: MouseEvent<HTMLElement>) => {
    if (IsContentMouseDownRef.current) return;
    onClick?.(event);
  };

  const mouseUpHandler = () => {
    if (!IsContentMouseDownRef.current) return;

    const timer = setTimeout(() => {
      setIsContentMouseDown(false);
      clearTimeout(timer);
    }, 0);
  };

  return (
    <CssTransition name="backdrop-wrapper" visible={visible} clearTime={300}>
      <div
        className={useClasses('backdrop', backdropClassName)}
        onClick={clickHandler}
        onMouseUp={mouseUpHandler}
        {...props}
      >
        <div className={useClasses('layer', layerClassName)} />

        <div
          onClick={onContentClick}
          className={useClasses('position', positionClassName)}
          onMouseDown={() => setIsContentMouseDown(true)}
        >
          {children}
        </div>

        <style jsx>{`
          .backdrop {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: auto;
            z-index: 1000;
            -webkit-overflow-scrolling: touch;
            box-sizing: border-box;
            text-align: center;
          }

          .position {
            position: relative;
            z-index: 1001;
            outline: none;
            max-width: 90%;
            width: ${width};
            margin: 20px auto;
            vertical-align: middle;
            display: inline-block;
          }

          .backdrop:before {
            display: inline-block;
            width: 0;
            height: 100%;
            vertical-align: middle;
            content: '';
          }

          .layer {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            opacity: ${theme.expressiveness.portalOpacity};
            background-color: black;
            transition: opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
            z-index: 1000;
          }

          .backdrop-wrapper-enter .layer {
            opacity: 0;
          }

          .backdrop-wrapper-enter-active .layer {
            opacity: ${theme.expressiveness.portalOpacity};
          }

          .backdrop-wrapper-leave .layer {
            opacity: ${theme.expressiveness.portalOpacity};
          }

          .backdrop-wrapper-leave-active .layer {
            opacity: 0;
          }
        `}</style>
      </div>
    </CssTransition>
  );
}

export default memo(Backdrop);
