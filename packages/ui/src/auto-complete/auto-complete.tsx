import React, {
  CSSProperties,
  Children,
  InputHTMLAttributes,
  ReactElement,
  Ref,
  cloneElement,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Input from '../input';
import Loading from '../loading';
import useScale, { withScale } from '../use-scale';
import { pickChild } from '../utils/collections';
import { NormalTypes } from '../utils/prop-types';
import useCurrentState from '../utils/use-current-state';
import {
  AutoCompleteConfig,
  AutoCompleteContext,
} from './auto-complete-context';
import AutoCompleteDropdown from './auto-complete-dropdown';
import AutoCompleteEmpty from './auto-complete-empty';
import AutoCompleteItem, { AutoCompleteItemProps } from './auto-complete-item';
import AutoCompleteSearching from './auto-complete-searching';

export type AutoCompleteTypes = NormalTypes;

export type AutoCompleteOption = {
  label: string;
  value: string;
};

export type AutoCompleteOptions = Array<
  | typeof AutoCompleteItem
  | AutoCompleteOption
  | ReactElement<AutoCompleteItemProps>
>;

interface Props {
  options?: AutoCompleteOptions;
  type?: AutoCompleteTypes;
  initialValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
  searching?: boolean | undefined;
  clearable?: boolean;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  disableFreeSolo?: boolean;
  className?: string;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeProps = Omit<InputHTMLAttributes<any>, keyof Props>;
export type AutoCompleteProps = Props & NativeProps;

const childrenToOptionsNode = (options: Array<AutoCompleteOption>) =>
  options.map((item, index) => {
    const key = `auto-complete-item-${index}`;
    if (React.isValidElement(item)) return cloneElement(item, { key });
    const validItem = item as AutoCompleteOption;

    return (
      <AutoCompleteItem key={key} value={validItem.value} isLabelOnly>
        {validItem.label}
      </AutoCompleteItem>
    );
  });

const getSearchIcon = (searching?: boolean, scale: string | number = 1) => {
  if (searching === undefined) return null;
  return searching ? <Loading scale={+scale / 2} /> : <span />;
};

const AutoComplete = forwardRef(
  (
    {
      options = [],
      initialValue: customInitialValue = '',
      onSelect,
      onSearch,
      onChange,
      searching,
      children,
      type = 'default',
      value,
      clearable = false,
      disabled = false,
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth = false,
      disableFreeSolo = false,
      getPopupContainer,
      className = '',
      ...props
    }: AutoCompleteProps,
    userRef: Ref<HTMLInputElement | null>
  ) => {
    const resetTimer = useRef<number>();
    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(userRef, () => inputRef.current);

    const { SCALES, getScaleProps } = useScale();
    const [state, setState, stateRef] = useCurrentState(customInitialValue);

    const [selectVal, setSelectVal] = useState(customInitialValue);
    const [visible, setVisible] = useState(false);

    const [, searchChild] = pickChild(children, AutoCompleteSearching);
    const [, emptyChild] = pickChild(children, AutoCompleteEmpty);

    const autoCompleteItems = useMemo(() => {
      const hasSearchChild = !!searchChild && !!Children.count(searchChild);
      const hasEmptyChild = !!emptyChild && !!Children.count(emptyChild);

      if (searching)
        return hasSearchChild ? (
          searchChild
        ) : (
          <AutoCompleteSearching>Searching...</AutoCompleteSearching>
        );

      if (!options.length) {
        if (state === '') return null;

        return hasEmptyChild ? (
          emptyChild
        ) : (
          <AutoCompleteEmpty>No Options</AutoCompleteEmpty>
        );
      }

      return childrenToOptionsNode(options as Array<AutoCompleteOption>);
    }, [searching, options]);

    const showClearIcon = useMemo(
      () => clearable && searching === undefined,
      [clearable, searching]
    );

    const updateValue = (val: string) => {
      if (disabled) return;

      setSelectVal(val);
      onSelect?.(val);
      setState(val);

      inputRef.current?.focus();
    };

    const updateVisible = (next: boolean) => setVisible(next);

    const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setVisible(true);
      onSearch?.(event.target.value);
      setState(event.target.value);
    };

    const resetInputValue = () => {
      if (!disableFreeSolo) return;
      if (!state || state === '') return;
      if (state !== selectVal) setState(selectVal);
    };

    useEffect(() => {
      onChange?.(state);
    }, [state]);

    useEffect(() => {
      if (value === undefined) return;
      setState(value);
    }, [value]);

    const initialValue = useMemo<AutoCompleteConfig>(
      () => ({
        ref,
        value: state,
        updateValue,
        visible,
        updateVisible,
      }),
      [state, visible]
    );

    const toggleFocusHandler = (next: boolean) => {
      clearTimeout(resetTimer.current);
      setVisible(next);

      if (next) onSearch?.(stateRef.current);
      else
        resetTimer.current = window.setTimeout(() => {
          resetInputValue();
          clearTimeout(resetTimer.current);
        }, 100);
    };

    const inputProps = {
      ...props,
      className,
      disabled,
      value: state,
    };

    return (
      <AutoCompleteContext.Provider value={initialValue}>
        <div ref={ref} className="auto-complete">
          <Input
            ref={inputRef}
            type={type}
            onChange={onInputChange}
            onFocus={() => toggleFocusHandler(true)}
            onBlur={() => toggleFocusHandler(false)}
            clearable={showClearIcon}
            width={SCALES.width(1, 'initial')}
            height={SCALES.height(2.25)}
            iconRight={getSearchIcon(searching, getScaleProps('scale'))}
            {...inputProps}
          />

          <AutoCompleteDropdown
            visible={visible}
            disableMatchWidth={disableMatchWidth}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}
            getPopupContainer={getPopupContainer}
          >
            {autoCompleteItems}
          </AutoCompleteDropdown>

          <style jsx>{`
            .auto-complete {
              width: ${SCALES.width(1, 'max-content')};
              height: ${SCALES.height(1, 'auto')};
              padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
                ${SCALES.pl(0)};
              margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
                ${SCALES.ml(0)};
            }

            .auto-complete :global(.loading) {
              width: max-content;
            }
          `}</style>
        </div>
      </AutoCompleteContext.Provider>
    );
  }
);

AutoComplete.displayName = 'AutoComplete';

export default withScale(AutoComplete);
