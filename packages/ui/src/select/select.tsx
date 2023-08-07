import {
  CSSProperties,
  Children,
  ComponentType,
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  Ref,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import Grid from '../grid';
import Ellipsis from '../shared/ellipsis';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChildByProps } from '../utils/collections';
import { NormalTypes } from '../utils/prop-types';
import useCurrentState from '../utils/use-current-state';
import { SelectConfig, SelectContext } from './select-context';
import SelectDropdown from './select-dropdown';
import SelectIcon from './select-icon';
import SelectInput from './select-input';
import SelectMultipleValue from './select-multiple-value';
import { SelectOptionProps } from './select-option';
import { getColors } from './styles';

export type SelectRef = {
  focus: () => void;
  blur: () => void;
  scrollTo?: (options?: ScrollToOptions) => void;
};

export type SelectTypes = NormalTypes;

interface Props {
  disabled?: boolean;
  type?: SelectTypes;
  value?: string | string[];
  initialValue?: string | string[];
  placeholder?: ReactNode | string;
  icon?: ComponentType;
  onChange?: (value: string | string[]) => void;
  pure?: boolean;
  multiple?: boolean;
  clearable?: boolean;
  className?: string;
  dropdownClassName?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  onDropdownVisibleChange?: (visible: boolean) => void;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type SelectProps = Props & NativeAttrs;

const Select = forwardRef(
  (
    {
      children,
      type = 'default',
      disabled = false,
      initialValue: init,
      value: customValue,
      icon: Icon = SelectIcon,
      onChange,
      pure = false,
      multiple = false,
      clearable = true,
      placeholder,
      className = '',
      dropdownClassName,
      dropdownStyle,
      disableMatchWidth = false,
      getPopupContainer,
      onDropdownVisibleChange = () => {},
      ...props
    }: SelectProps,
    selectRef: Ref<SelectRef>
  ) => {
    const theme = useTheme();
    const { SCALES } = useScale();
    const [value, setValue, valueRef] = useCurrentState(() => {
      if (!multiple) return init;
      if (Array.isArray(init)) return init;

      return typeof init === 'undefined' ? [] : [init];
    });

    const ref = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const [visible, setVisible] = useState(false);
    const [selectFocus, setSelectFocus] = useState(false);

    const classes = useClasses(
      'select',
      { active: selectFocus || visible, multiple },
      className
    );

    const isEmpty = useMemo(() => {
      if (!Array.isArray(value)) return !value;
      return value.length === 0;
    }, [value]);

    const { border, borderActive, iconBorder, placeholderColor } = useMemo(
      () => getColors(theme.palette, type),
      [theme.palette, type]
    );

    const updateVisible = (next: boolean) => {
      onDropdownVisibleChange(next);
      setVisible(next);
    };

    const updateValue = (next: string | undefined) => {
      if (next)
        setValue((last) => {
          if (!Array.isArray(last)) return next;
          if (!last.includes(next)) return [...last, next];

          return last.filter((item) => item !== next);
        });

      onChange?.(valueRef.current as string | string[]);
      if (!multiple) updateVisible(false);
    };

    const initialValue: SelectConfig = useMemo(
      () => ({
        value,
        visible,
        updateValue,
        updateVisible,
        disableAll: disabled,
        ref,
      }),
      [visible, disabled, ref, value, multiple]
    );

    const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation();
      event.preventDefault();

      if (disabled) return;

      updateVisible(!visible);
      event.preventDefault();
    };

    const mouseDownHandler = (event: MouseEvent<HTMLDivElement>) => {
      if (visible) event.preventDefault();
    };

    useEffect(() => {
      if (customValue === undefined) return;
      setValue(customValue);
    }, [customValue]);

    useImperativeHandle(
      selectRef,
      () => ({
        focus: () => inputRef.current?.focus(),
        blur: () => inputRef.current?.blur(),
        scrollTo: (options) => dropdownRef.current?.scrollTo(options),
      }),
      [inputRef, dropdownRef]
    );

    const selectedChild = useMemo(() => {
      const [, optionChildren] = pickChildByProps(children, 'value', value);

      return Children.map(optionChildren, (child) => {
        if (!isValidElement(child)) return null;

        const el = cloneElement(child, {
          preventAllEvents: true,
        } as SelectOptionProps);

        if (!multiple) return el;

        return (
          <SelectMultipleValue
            disabled={disabled}
            onClear={clearable ? () => updateValue(child.props.value) : null}
          >
            {el}
          </SelectMultipleValue>
        );
      });
    }, [value, children, multiple]);

    const onInputBlur = () => {
      updateVisible(false);
      setSelectFocus(false);
    };

    return (
      <SelectContext.Provider value={initialValue}>
        <div
          className={classes}
          ref={ref}
          onClick={clickHandler}
          onMouseDown={mouseDownHandler}
          {...props}
        >
          <SelectInput
            ref={inputRef}
            visible={visible}
            onBlur={onInputBlur}
            onFocus={() => setSelectFocus(true)}
          />

          {isEmpty && (
            <span className="value placeholder">
              <Ellipsis height="var(--select-height)">{placeholder}</Ellipsis>
            </span>
          )}

          {value && !multiple && <span className="value">{selectedChild}</span>}
          {value && multiple && (
            <Grid.Container gap={0.5}>{selectedChild}</Grid.Container>
          )}

          <SelectDropdown
            ref={dropdownRef}
            visible={visible}
            className={dropdownClassName}
            dropdownStyle={dropdownStyle}
            disableMatchWidth={disableMatchWidth}
            getPopupContainer={getPopupContainer}
          >
            {children}
          </SelectDropdown>

          {!pure && (
            <div className="icon">
              <Icon />
            </div>
          )}

          <style jsx>{`
            .select {
              display: inline-flex;
              align-items: center;
              user-select: none;
              white-space: nowrap;
              position: relative;
              cursor: ${disabled ? 'not-allowed' : 'pointer'};
              max-width: 90vw;
              overflow: hidden;
              transition: border 150ms ease-in 0s, color 200ms ease-out 0s,
                box-shadow 200ms ease 0s;
              border: 1px solid ${border};
              border-radius: ${theme.layout.radius};

              background-color: ${disabled
                ? theme.palette.accents_1
                : theme.palette.background};
              --select-font-size: ${SCALES.font(0.875)};
              --select-height: ${SCALES.height(2.25)};
              min-width: 11.5em;
              width: ${SCALES.width(1, 'initial')};
              height: var(--select-height);
              padding: ${SCALES.pt(0)} ${SCALES.pr(0.334)} ${SCALES.pb(0)}
                ${SCALES.pl(0.667)};
              margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
                ${SCALES.ml(0)};
            }

            .multiple {
              height: auto;
              min-height: var(--select-height);
              padding: ${SCALES.pt(0.334)} ${SCALES.pr(0.334)}
                ${SCALES.pb(0.334)} ${SCALES.pl(0.667)};
            }

            .select.active,
            .select:hover {
              border-color: ${disabled ? theme.palette.border : borderActive};
            }

            .select.active.icon,
            .select:hover .icon {
              color: ${disabled ? theme.palette.accents_5 : borderActive};
            }

            .value {
              display: inline-flex;
              flex: 1;
              height: 100%;
              align-items: center;
              line-height: 1;
              padding: 0;
              margin-right: 1.25em;
              font-size: var(--select-font-size);
              color: ${disabled
                ? theme.palette.accents_4
                : theme.palette.foreground};
              width: calc(100% - 1.25em);
            }

            .value > :global(div),
            .value > :global(div:hover) {
              border-radius: 0;
              background-color: transparent;
              padding: 0;
              margin: 0;
              color: inherit;
            }

            .placeholder {
              color: ${placeholderColor};
            }

            .icon {
              position: absolute;
              right: ${theme.layout.gapQuarter};
              font-size: var(--select-font-size);
              top: 50%;
              bottom: 0;
              transform: translateY(-50%) rotate(${visible ? '180' : '0'}deg);
              pointer-events: none;
              transition: transform 200ms ease;
              display: flex;
              align-items: center;
              color: ${iconBorder};
            }
          `}</style>
        </div>
      </SelectContext.Provider>
    );
  }
);

Select.displayName = 'Select';

export default withScale(Select);
