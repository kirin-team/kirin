import {
  CSSProperties,
  HTMLAttributes,
  Ref,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import { useSelectContext } from './select-context';

interface Props {
  visible: boolean;
  className?: string;
  dropdownStyle?: CSSProperties;
  disableMatchWidth?: boolean;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type SelectDropdownProps = Props & NativeAttrs;

const SelectDropdown = forwardRef(
  (
    {
      visible,
      children,
      className = '',
      dropdownStyle = {},
      disableMatchWidth,
      getPopupContainer,
    }: SelectDropdownProps,
    dropdownRef: Ref<HTMLDivElement | null>
  ) => {
    const theme = useTheme();
    const { ref } = useSelectContext();
    const classes = useClasses('select-dropdown', className);

    const internalDropdownRef = useRef<HTMLDivElement | null>(null);

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      dropdownRef,
      () => internalDropdownRef.current
    );

    return (
      <Dropdown
        parent={ref}
        visible={visible}
        disableMatchWidth={disableMatchWidth}
        getPopupContainer={getPopupContainer}
      >
        <div
          ref={internalDropdownRef}
          className={classes}
          style={dropdownStyle}
        >
          {children}

          <style jsx>{`
            .select-dropdown {
              border-radius: ${theme.layout.radius};
              box-shadow: ${theme.expressiveness.shadowLarge};
              background-color: ${theme.palette.background};
              max-height: 17em;
              overflow-y: auto;
              overflow-anchor: none;
              padding: 0.38em 0;
              scroll-behavior: smooth;
            }
          `}</style>
        </div>
      </Dropdown>
    );
  }
);

SelectDropdown.displayName = 'SelectDropdown';

export default SelectDropdown;
