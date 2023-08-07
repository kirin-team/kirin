import { HTMLAttributes } from 'react';
import useScale, { withScale } from '../use-scale';

interface Props {
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type PageFooterProps = Props & NativeAttrs;

function PageFooter({ className = '', children, ...props }: PageFooterProps) {
  const { SCALES } = useScale();

  return (
    <footer className={className} {...props}>
      {children}

      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, '100%')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </footer>
  );
}

export default withScale(PageFooter);
