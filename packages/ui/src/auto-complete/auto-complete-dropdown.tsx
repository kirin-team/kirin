import {
  CSSProperties,
  Children,
  HTMLAttributes,
  MouseEvent,
  useMemo,
} from 'react';
import Dropdown from '../shared/dropdown';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import { useAutoCompleteContext } from './auto-complete-context';

interface Props {
  visible: boolean;
  className?: string;
  disableMatchWidth?: boolean;
  dropdownStyle?: CSSProperties;
  getPopupContainer?: () => HTMLElement | null;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type AutoCompleteDropdownProps = Props & NativeAttrs;

export default function AutoCompleteDropdown({
  children,
  visible,
  className = '',
  dropdownStyle = {},
  disableMatchWidth,
  getPopupContainer,
}: AutoCompleteDropdownProps) {
  const { ref } = useAutoCompleteContext();

  const theme = useTheme();

  const isEmpty = useMemo(
    () => !visible || Children.count(children) === 0,
    [children, visible]
  );

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
  };

  const classes = useClasses('auto-complete-dropdown', className);

  return (
    <Dropdown
      parent={ref}
      visible={visible}
      disableMatchWidth={disableMatchWidth}
      getPopupContainer={getPopupContainer}
    >
      <div className={classes} style={dropdownStyle} onClick={clickHandler}>
        {children}

        <style jsx>{`
          .auto-complete-dropdown {
            border-radius: ${theme.layout.radius};
            box-shadow: ${isEmpty ? 'none' : theme.expressiveness.shadowLarge};
            background-color: ${theme.palette.background};
            overflow-y: auto;
            max-height: 15rem;
            overflow-anchor: none;
          }
        `}</style>
      </div>
    </Dropdown>
  );
}
