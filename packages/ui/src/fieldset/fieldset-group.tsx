import { HTMLAttributes, useCallback, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import useCurrentState from '../utils/use-current-state';
import useWarning from '../utils/use-warning';
import { FieldItem, FieldsetContext } from './fieldset-context';

interface Props {
  value: string;
  className?: string;
  onChange?: (value: string) => void;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type FieldsetGroupProps = Props & NativeAttrs;

function FieldsetGroup({
  className = '',
  children,
  value,
  onChange,
  ...props
}: FieldsetGroupProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const classes = useClasses('group', className);
  const [items, setItems, ref] = useCurrentState<FieldItem[]>([]);

  const [selfVal, setSelfVal] = useState(value);

  const register = (newItem: FieldItem) => {
    const hasItem = ref.current.find((item) => item.value === newItem.value);

    if (hasItem)
      useWarning('The "value" of each "Fieldset" must be unique.', 'Fieldset');

    setItems([...ref.current, newItem]);
  };

  const providerValue = useMemo(
    () => ({
      currentValue: selfVal,
      inGroup: true,
      register,
    }),
    [selfVal]
  );

  const clickHandle = useCallback(
    (nextValue: string) => {
      setSelfVal(nextValue);
      if (onChange) onChange(nextValue);
    },
    [onChange]
  );

  return (
    <FieldsetContext.Provider value={providerValue}>
      <div className={classes} {...props}>
        <div className="group-tabs">
          {items.map((item) => (
            <button
              onClick={() => clickHandle(item.value)}
              key={item.value}
              className={selfVal === item.value ? 'active' : ''}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="group-content">{children}</div>

        <style jsx>{`
          .group {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0, 0)}
              ${SCALES.ml(0)};
          }

          .group-tabs {
            white-space: nowrap;
            overflow-y: hidden;
            overflow-x: auto;
            font-size: ${SCALES.font(1)};
            margin-bottom: -1px;
          }

          .group-content {
            border-top-left-radius: 0;
            overflow: hidden;
          }

          .group-content :global(.fieldset) {
            border-top-left-radius: 0;
          }

          button {
            height: 2.7em;
            line-height: 2.7em;
            text-align: center;
            user-select: none;
            color: ${theme.palette.accents_3};
            background-color: ${theme.palette.accents_1};
            font-size: 0.875em;
            white-space: nowrap;
            text-transform: capitalize;
            -webkit-appearance: none;
            cursor: pointer;
            margin: 0;
            padding: 0 1.45em;
            overflow: hidden;
            transition: all 0.2s ease 0s;
            border-radius: 0;
            border: 1px solid ${theme.palette.border};
            text-decoration: none;
            outline: none;
          }

          button.active {
            border-bottom-color: transparent;
            background-color: ${theme.palette.background};
            color: ${theme.palette.foreground};
            cursor: default;
          }

          button:first-of-type {
            border-top-left-radius: ${theme.layout.radius};
          }

          button:last-of-type {
            border-top-right-radius: ${theme.layout.radius};
          }

          button + button {
            border-left: 0;
          }
        `}</style>
      </div>
    </FieldsetContext.Provider>
  );
}

export default withScale(FieldsetGroup);
