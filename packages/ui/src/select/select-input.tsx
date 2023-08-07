import { Ref, forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

interface Props {
  visible: boolean;
  onBlur: () => void;
  onFocus: () => void;
}

export type SelectInputProps = Props;

const SelectInput = forwardRef(
  (
    { visible, onBlur, onFocus }: SelectInputProps,
    inputRef: Ref<HTMLInputElement | null>
  ) => {
    const ref = useRef<HTMLInputElement | null>(null);
    useImperativeHandle(inputRef, () => ref.current);

    useEffect(() => {
      if (visible) ref.current?.focus();
    }, [visible]);

    return (
      <>
        <input
          ref={ref}
          type="search"
          role="combobox"
          aria-haspopup="listbox"
          readOnly
          unselectable="on"
          aria-expanded={visible}
          onBlur={onBlur}
          onFocus={onFocus}
        />

        <style jsx>{`
          input {
            position: fixed;
            top: -10000px;
            left: -10000px;
            opacity: 0;
            z-index: -1;
            width: 0;
            height: 0;
            padding: 0;
            font-size: 0;
            border: none;
          }
        `}</style>
      </>
    );
  }
);

SelectInput.displayName = 'SelectInput';

export default SelectInput;
