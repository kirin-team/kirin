import { HTMLAttributes } from 'react';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<HTMLDivElement>, keyof Props>;
export type FieldsetSubtitleProps = Props & NativeAttrs;

export default function FieldsetSubtitle({
  className = '',
  children,
  ...props
}: FieldsetSubtitleProps) {
  return (
    <>
      <div className={className} {...props}>
        {children}
      </div>

      <style jsx>{`
        div {
          font-size: 0.875em;
          line-height: 1.6;
          letter-spacing: -0.005625em;
          margin: 0.75em 0;
        }
      `}</style>
    </>
  );
}
