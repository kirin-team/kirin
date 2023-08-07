import { HTMLAttributes } from 'react';
import useClasses from '../use-classes';

interface Props {
  isRight?: boolean;
  isSingle?: boolean;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type ButtonIconProps = Props & NativeAttrs;

export default function ButtonIcon({
  isRight = false,
  isSingle,
  children,
  className = '',
  ...props
}: ButtonIconProps) {
  const classes = useClasses(
    'icon',
    { right: isRight, single: isSingle },
    className
  );

  return (
    <span className={classes} {...props}>
      {children}

      <style jsx>{`
        .icon {
          position: absolute;
          left: var(--kirin-button-icon-padding);
          right: auto;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          color: var(--kirin-button-color);
          z-index: 1;
        }

        .right {
          right: var(--kirin-button-icon-padding);
          left: auto;
        }

        .icon :global(svg) {
          background: transparent;
          height: calc(var(--kirin-button-height) / 2.35);
          width: calc(var(--kirin-button-height) / 2.35);
        }

        .single {
          position: static;
          transform: none;
        }
      `}</style>
    </span>
  );
}
