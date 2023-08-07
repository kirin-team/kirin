import {
  CSSProperties,
  HTMLAttributes,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { hasChild } from '../utils/collections';
import { tuple } from '../utils/prop-types';
import PageContent from './page-content';

const renderMode = tuple('default', 'effect', 'effect-seo');

export type PageRenderMode = (typeof renderMode)[number];

interface Props {
  render?: PageRenderMode;
  dotBackdrop?: boolean;
  dotSize?: CSSProperties['fontSize'];
  dotSpace?: number;
}

export type DotStylesProps = {
  dotSize: CSSProperties['fontSize'];
  dotSpace: number;
};

function DotStyles({ dotSpace, dotSize }: DotStylesProps) {
  const background = useMemo(
    () => ({
      position: `calc(${dotSpace} * 25px)`,
      size: `calc(${dotSpace} * 50px)`,
    }),
    [dotSpace]
  );

  return (
    <span>
      <style jsx>{`
        :global(body) {
          background-image: radial-gradient(#e3e3e3 ${dotSize}, transparent 0),
            radial-gradient(#e3e3e3 ${dotSize}, transparent 0);
          background-position: 0 0,
            ${background.position} ${background.position};
          background-attachment: fixed;
          background-size: ${background.size} ${background.size};
        }
      `}</style>
    </span>
  );
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type PageProps = Props & NativeAttrs;

function Page({
  children,
  render = 'default',
  dotBackdrop = false,
  className,
  dotSize = '1px',
  dotSpace = 1,
  ...props
}: PageProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const showDot = useMemo(() => {
    if (theme.type === 'dark') return false;
    return dotBackdrop;
  }, [dotBackdrop, theme.type]);

  const [preventRender, setPreventRender] = useState(render !== 'default');

  useEffect(() => setPreventRender(false), []);

  if (preventRender) {
    const renderSEO = render === 'effect-seo';

    if (!renderSEO) return null;

    return (
      <div className="hidden" aria-hidden="true">
        {children}

        <style jsx>{`
          .hidden {
            opacity: 0;
            display: none;
          }
        `}</style>
      </div>
    );
  }

  const hasContent = hasChild(children, PageContent);

  return (
    <section className={className} {...props}>
      {hasContent ? children : <PageContent>{children}</PageContent>}
      {showDot && <DotStyles dotSize={dotSize} dotSpace={dotSpace} />}

      <style jsx>{`
        section {
          max-width: 100vw;
          min-height: 100vh;
          box-sizing: border-box;
          position: relative;
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'calc(100% - 100pt)')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(1.34)} ${SCALES.pb(0)}
            ${SCALES.pl(1.34)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0, 'auto')} ${SCALES.mb(0)}
            ${SCALES.ml(0, 'auto')};
        }
      `}</style>
    </section>
  );
}

export default withScale(Page);