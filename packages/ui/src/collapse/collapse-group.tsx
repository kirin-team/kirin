import { HTMLAttributes, useMemo } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { setChildrenIndex } from '../utils/collections';
import useCurrentState from '../utils/use-current-state';
import Collapse from './collapse';
import { CollapseConfig, CollapseContext } from './collapse-context';

interface Props {
  accordion?: boolean;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type CollapseGroupProps = Props & NativeAttrs;

function CollapseGroup({
  children,
  accordion = true,
  className = '',
  ...props
}: CollapseGroupProps) {
  const { SCALES } = useScale();
  const [state, setState, stateRef] = useCurrentState<Array<number>>([]);
  const classes = useClasses('collapse-group', className);

  const updateValues = (
    currentIndex: number | undefined,
    nextState: boolean
  ) => {
    if (currentIndex === undefined) return;

    const hasChild = stateRef.current.find((val) => val === currentIndex);

    if (accordion) {
      if (nextState) return setState([currentIndex]);
      return setState([]);
    }

    if (nextState) {
      if (hasChild) return;
      return setState([...stateRef.current, currentIndex]);
    }

    setState(stateRef.current.filter((item) => item !== currentIndex));
  };

  const initialValue = useMemo<CollapseConfig>(
    () => ({ values: state, updateValues }),
    [state.join(',')]
  );

  const hasIndexChildren = useMemo(
    () => setChildrenIndex(children, [Collapse]),
    [children]
  );

  return (
    <CollapseContext.Provider value={initialValue}>
      <div className={classes} {...props}>
        {hasIndexChildren}

        <style jsx>{`
          .collapse-group {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0.6)} ${SCALES.pb(0)}
              ${SCALES.pl(0.6)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }

          .collapse-group > :global(div + div) {
            border-top: none;
          }
        `}</style>
      </div>
    </CollapseContext.Provider>
  );
}

export default withScale(CollapseGroup);
