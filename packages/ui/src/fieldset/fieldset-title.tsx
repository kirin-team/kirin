import { HTMLAttributes } from 'react';
import useClasses from '../use-classes';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetTitleProps = Props & NativeAttrs;

export default function FieldsetTitle({
  className = '',
  children,
  ...props
}: FieldsetTitleProps) {
  const classes = useClasses('title', className);

  return (
    <>
      <div className={classes} {...props}>
        {children}
      </div>

      <style jsx>{`
        .title {
          line-height: 1.5;
          display: inline-flex;
          word-break: break-word;
          font-weight: 600;
          letter-spacing: -0.020625em;
          font-size: 1.25em;
          width: auto;
        }
      `}</style>
    </>
  );
}
