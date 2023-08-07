import { HTMLAttributes, useEffect, useMemo, useState } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { RadioContext } from './radio-context';

interface Props {
  value?: string | number;
  initialValue?: string | number;
  disabled?: boolean;
  onChange?: (value: string | number) => void;
  className?: string;
  useRow?: boolean;
}

const defaultProps = {
  disabled: false,
  className: '',
  useRow: false,
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type RadioGroupProps = Props & NativeAttrs;

function RadioGroup({
  disabled = false,
  onChange,
  value,
  children,
  className = '',
  initialValue,
  useRow = false,
  ...props
}: RadioGroupProps) {
  const { SCALES } = useScale();

  const [selfVal, setSelfVal] = useState(initialValue);

  const updateState = (nextValue: string | number) => {
    setSelfVal(nextValue);
    onChange?.(nextValue);
  };

  const providerValue = useMemo(
    () => ({
      updateState,
      disabledAll: disabled,
      inGroup: true,
      value: selfVal,
    }),
    [disabled, selfVal]
  );

  useEffect(() => {
    if (value === undefined) return;
    setSelfVal(value);
  }, [value]);

  return (
    <RadioContext.Provider value={providerValue}>
      <div className={useClasses('radio-group', className)} {...props}>
        {children}
      </div>

      <style jsx>{`
        .radio-group {
          display: flex;
          flex-direction: ${useRow ? 'col' : 'column'};
          --radio-group-gap: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .radio-group :global(.radio) {
          margin-top: ${useRow ? 0 : 'var(--radio-group-gap)'};
          margin-left: ${useRow ? 'var(--radio-group-gap)' : 0};
          --radio-size: ${SCALES.font(1)};
        }

        .radio-group :global(.radio:first-of-type) {
          margin: 0;
        }
      `}</style>
    </RadioContext.Provider>
  );
}

export default withScale(RadioGroup);