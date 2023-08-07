import { HTMLAttributes, useMemo, useRef } from 'react';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import { ReactiveDomReact, isUnplacedRect } from '../utils/layouts';
import usePrevious from '../utils/use-previous';

interface Props {
  rect: ReactiveDomReact;
  visible?: boolean;
  hoverHeightRatio?: number;
  hoverWidthRatio?: number;
  activeOpacity?: number;
}

type HighlightPosition = {
  width: string;
  left: string;
  height: string;
  top: string;
  transition: string;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type HighlightProps = Props & NativeAttrs;

export default function Highlight({
  rect,
  visible,
  hoverHeightRatio = 1,
  hoverWidthRatio = 1,
  activeOpacity = 0.8,
  className,
  ...props
}: HighlightProps) {
  const theme = useTheme();
  const isFirstVisible = usePrevious(isUnplacedRect(rect));

  const ref = useRef<HTMLDivElement | null>(null);

  const position = useMemo<HighlightPosition>(() => {
    const width = rect.width * hoverWidthRatio;
    const height = rect.height * hoverHeightRatio;

    return {
      width: `${width}px`,
      left: `${rect.left + (rect.width - width) / 2}px`,
      height: `${height}px`,
      top: `${rect.elementTop + (rect.height - height) / 2}px`,
      transition: isFirstVisible ? 'opacity' : 'opacity, width, left, top',
    };
  }, [rect, hoverWidthRatio, hoverHeightRatio]);

  return (
    <div ref={ref} className={useClasses('highlight', className)} {...props}>
      <style jsx>{`
        .highlight {
          background: ${theme.palette.accents_2};
          position: absolute;
          border-radius: 5px;
          width: ${position.width};
          left: ${position.left};
          height: ${position.height};
          top: ${position.top};
          opacity: ${visible ? activeOpacity : 0};
          transition: 0.15s ease;
          transition-property: ${position.transition};
        }
      `}</style>
    </div>
  );
}