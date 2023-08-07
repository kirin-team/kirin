import { HTMLAttributes, useMemo } from 'react';
import Ellipsis from '../shared/ellipsis';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { useAutoCompleteContext } from './auto-complete-context';

interface Props {
  value: string;
  isLabelOnly?: boolean;
}

export type AutoCompleteItemProps = Props & HTMLAttributes<any>;

function AutoCompleteItem({
  value: identValue,
  children,
  isLabelOnly,
}: AutoCompleteItemProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { value, updateValue, updateVisible } = useAutoCompleteContext();

  const selectHandler = () => {
    updateValue?.(identValue);
    updateVisible?.(false);
  };

  const isActive = useMemo(() => value === identValue, [identValue, value]);
  const classes = useClasses('item', { active: isActive });

  return (
    <div className={classes} onClick={selectHandler}>
      {isLabelOnly ? (
        <Ellipsis height={SCALES.height(2)}>{children}</Ellipsis>
      ) : (
        children
      )}

      <style jsx>{`
        .item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          font-weight: normal;
          white-space: pre;
          background-color: ${theme.palette.background};
          color: ${theme.palette.foreground};
          user-select: none;
          border: 0;
          cursor: pointer;
          transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
          font-size: ${SCALES.font(0.875)};
          width: ${SCALES.width(1, 'auto')};
          height: ${isLabelOnly
            ? SCALES.height(2.5)
            : SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0.75)} ${SCALES.pb(0)}
            ${SCALES.pl(0.75)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .item:first-of-type {
          border-top-left-radius: ${theme.layout.radius};
          border-top-right-radius: ${theme.layout.radius};
        }

        .item:last-of-type {
          border-bottom-left-radius: ${theme.layout.radius};
          border-bottom-right-radius: ${theme.layout.radius};
        }

        .item:hover {
          background-color: ${theme.palette.accents_1};
        }

        .item.active {
          background-color: ${theme.palette.accents_1};
          color: ${theme.palette.success};
        }
      `}</style>
    </div>
  );
}

export default withScale(AutoCompleteItem);
