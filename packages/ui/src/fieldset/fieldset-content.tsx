import { HTMLAttributes } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type FieldsetContentProps = Props & NativeAttrs;

function FieldsetContent({
  className = '',
  children,
  ...props
}: FieldsetContentProps) {
  const { SCALES } = useScale();
  const classes = useClasses('content', className);

  return (
    <div className={classes} {...props}>
      {children}

      <style jsx>{`
        .content {
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(1.3)} ${SCALES.pr(1.3)} ${SCALES.pb(1.3)}
            ${SCALES.pl(1.3)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .content :global(> *:first-child) {
          margin-top: 0;
        }

        .content :global(> *:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </div>
  );
}

export default withScale(FieldsetContent);
