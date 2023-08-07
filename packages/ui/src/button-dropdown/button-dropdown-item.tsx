import {
  ButtonHTMLAttributes,
  MouseEvent,
  MouseEventHandler,
  useMemo,
} from 'react';
import Loading from '../loading';
import useTheme from '../use-theme';
import { NormalTypes } from '../utils/prop-types';
import { useButtonDropdown } from './button-dropdown-context';
import { getColor } from './styles';

export type ButtonDropdownItemTypes = NormalTypes;

interface Props {
  main?: boolean;
  type?: ButtonDropdownItemTypes;
  onClick?: MouseEventHandler<HTMLElement>;
  className?: string;
}

type NativeAttrs = Omit<ButtonHTMLAttributes<any>, keyof Props>;
export type ButtonDropdownItemProps = Props & NativeAttrs;

export default function ButtonDropdownItem({
  children,
  onClick = () => {},
  className = '',
  main = false,
  type: selfType = 'default',
  ...props
}: ButtonDropdownItemProps) {
  const theme = useTheme();

  const { type: parentType, disabled, loading } = useButtonDropdown();

  const type = main ? parentType : selfType;
  const colors = getColor(theme.palette, type, disabled);

  const clickHandler = (event: MouseEvent<HTMLButtonElement>) => {
    if (disabled || loading) return;
    onClick?.(event);
  };

  const cursor = useMemo(() => {
    if (loading) return 'default';
    return disabled ? 'not-allowed' : 'pointer';
  }, [loading, disabled]);

  return (
    <button className={className} onClick={clickHandler} {...props}>
      {loading ? <Loading /> : children}

      <style jsx>{`
        button {
          position: relative;
          -webkit-appearance: button;
          text-rendering: auto;
          display: inline-flex;
          flex: 1;
          justify-content: center;
          align-items: center;
          vertical-align: middle;
          text-align: center;
          cursor: ${cursor};
          box-sizing: border-box;
          margin: 0;
          border: none;
          background-color: ${colors.bgColor};
          color: ${colors.color};
          width: 100%;
          height: var(--kirin-dropdown-height);
          min-width: var(--kirin-dropdown-min-width);
          padding: var(--kirin-dropdown-padding);
          font-size: var(--kirin-dropdown-font-size);
        }

        button:hover {
          border-color: ${colors.hoverBorder};
          background-color: ${colors.hoverBgColor};
        }
      `}</style>
    </button>
  );
}
