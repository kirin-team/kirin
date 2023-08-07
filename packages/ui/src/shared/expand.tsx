import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import useClasses from '../use-classes';
import useRealShape from '../utils/use-real-shape';

interface Props {
  isExpanded?: boolean;
  delay?: number;
}

export type ExpandProps = Props;

export default function Expand({
  isExpanded = false,
  delay = 200,
  children,
}: PropsWithChildren<ExpandProps>) {
  const [height, setHeight] = useState(isExpanded ? 'auto' : '0');
  const [selfExpanded, setSelfExpanded] = useState(isExpanded);
  const [visible, setVisible] = useState(isExpanded);

  const classes = useClasses('container', { expanded: selfExpanded });

  const contentRef = useRef<HTMLDivElement>(null);
  const entryTimer = useRef<number>();
  const leaveTimer = useRef<number>();
  const resetTimer = useRef<number>();

  const [state, updateShape] = useRealShape(contentRef);

  useEffect(() => setHeight(`${state.height}px`), [state.height]);

  useEffect(() => {
    if (isExpanded) setVisible(isExpanded);
    else {
      updateShape();
      setHeight(`${state.height}px`);
    }

    entryTimer.current = window.setTimeout(() => {
      setSelfExpanded(isExpanded);
      clearTimeout(entryTimer.current);
    }, 30);

    if (isExpanded)
      resetTimer.current = window.setTimeout(() => {
        setHeight('auto');
        clearTimeout(resetTimer.current);
      }, delay);
    else
      leaveTimer.current = window.setTimeout(() => {
        setVisible(isExpanded);
        clearTimeout(leaveTimer.current);
      }, delay / 2);

    return () => {
      clearTimeout(entryTimer.current);
      clearTimeout(leaveTimer.current);
      clearTimeout(resetTimer.current);
    };
  }, [isExpanded]);

  return (
    <div className={classes}>
      <div ref={contentRef} className="content">
        {children}
      </div>

      <style jsx>{`
        .container {
          padding: 0;
          margin: 0;
          height: 0;
          overflow: hidden;
          visibility: ${visible ? 'visible' : 'hidden'};
          transition: height ${delay}ms ease;
        }

        .expanded {
          height: ${height};
          visibility: visible;
        }
      `}</style>
    </div>
  );
}
