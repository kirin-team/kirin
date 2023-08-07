import {
  MouseEvent,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import css from 'styled-jsx/css';
import Button, { ButtonProps } from '../button/button';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useModalContext } from './modal-context';

type ModalActionEvent = MouseEvent<HTMLButtonElement> & {
  close: () => void;
};

interface Props {
  className?: string;
  passive?: boolean;
  disabled?: boolean;
  onClick?: (event: ModalActionEvent) => void;
}

export type ModalActionProps = Props & Omit<ButtonProps, keyof Props>;

const ModalAction = forwardRef(
  (
    {
      className = '',
      children,
      onClick,
      passive = false,
      disabled = false,
      ...props
    }: ModalActionProps,
    ref: Ref<HTMLButtonElement | null>
  ) => {
    const theme = useTheme();
    const { SCALES } = useScale();
    const { close } = useModalContext();

    const btnRef = useRef<HTMLButtonElement>(null);
    useImperativeHandle(ref, () => btnRef.current);

    const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
      if (disabled) return;

      const actionEvent = Object.assign({}, event, {
        close: () => close?.(),
      });

      onClick?.(actionEvent);
    };

    const color = useMemo(
      () => (passive ? theme.palette.accents_5 : theme.palette.foreground),
      [theme.palette, passive, disabled]
    );

    const bgColor = useMemo(
      () => (disabled ? theme.palette.accents_1 : theme.palette.background),
      [theme.palette, disabled]
    );

    const { className: resolveClassName, styles } = css.resolve`
      button.btn {
        font-size: ${SCALES.font(0.75)};
        border: none;
        color: ${color};
        background-color: ${theme.palette.background};
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        -webkit-box-pack: center;
        justify-content: center;
        flex: 1;
        height: ${SCALES.height(3.5625)};
        border-radius: 0;
        min-width: 0;
      }

      button.btn:hover,
      button.btn:focus {
        color: ${disabled ? color : theme.palette.foreground};
        background-color: ${disabled ? bgColor : theme.palette.accents_1};
      }
    `;

    const classes = useClasses(resolveClassName, className);

    const overrideProps = {
      ...props,
      effect: false,
      ref: btnRef,
    };

    return (
      <Button
        className={classes}
        onClick={clickHandler}
        disabled={disabled}
        {...overrideProps}
      >
        {children}
        {styles}
      </Button>
    );
  }
);

ModalAction.displayName = 'ModalAction';

export default withScale(ModalAction);
