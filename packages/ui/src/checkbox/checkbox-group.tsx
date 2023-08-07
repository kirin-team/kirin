import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useWarning from '../utils/use-warning';
import { CheckboxContext } from './checkbox-context';

interface Props {
  value: string[];
  disabled?: boolean;
  onChange?: (values: string[]) => void;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type CheckboxGroupProps = Props & NativeAttrs;

function CheckboxGroup({
  disabled = false,
  onChange,
  value,
  children,
  className = '',
  ...props
}: CheckboxGroupProps) {
  const { SCALES } = useScale();
  const classes = useClasses('group', className);

  const [selfVal, setSelfVal] = useState<string[]>([]);

  if (!value) {
    value = [];
    useWarning('Props "value" is required.', 'Checkbox Group');
  }

  const updateState = (val: string, checked: boolean) => {
    const removed = selfVal.filter((v) => v !== val);
    const next = checked ? [...removed, val] : removed;

    setSelfVal(next);
    onChange?.(next);
  };

  const providerValue = useMemo(
    () => ({
      updateState,
      disabledAll: disabled,
      inGroup: true,
      values: selfVal,
    }),
    [disabled, selfVal]
  );

  useEffect(() => setSelfVal(value), [value.join(',')]);

  return (
    <CheckboxContext.Provider value={providerValue}>
      <div className={classes} {...props}>
        {children}
        <style jsx>{`
          .group {
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }
          .group :global(label) {
            margin-right: calc(${SCALES.font(1)} * 2);
            --checkbox-size: ${SCALES.font(1)};
          }
          .group :global(label:last-of-type) {
            margin-right: 0;
          }
        `}</style>
      </div>
    </CheckboxContext.Provider>
  );
}

export default withScale(CheckboxGroup);
