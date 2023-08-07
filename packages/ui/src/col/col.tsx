import { HTMLAttributes } from 'react';

interface Props {
  span?: number;
  offset?: number;
  component?: keyof JSX.IntrinsicElements;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type ColProps = Props & NativeAttrs;

export default function Col({
  component = 'div',
  children,
  span = 24,
  offset = 0,
  className = '',
  ...props
}: ColProps) {
  const Component = component;

  return (
    <Component className={`col ${className}`} {...props}>
      {children}

      <style jsx>{`
        .col {
          float: left;
          box-sizing: border-box;
          padding-left: calc(var(--row-gap) / 2);
          padding-right: calc(var(--row-gap) / 2);
          width: ${(100 / 24) * span}%;
          margin-left: ${(100 / 24) * offset}%;
        }
      `}</style>
    </Component>
  );
}
