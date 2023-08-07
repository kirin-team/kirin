import {
  HTMLAttributes,
  MouseEvent,
  ReactNode,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { pickChild, pickChildByProps } from '../utils/collections';
import { NormalTypes } from '../utils/prop-types';
import useClickAway from '../utils/use-click-away';
import { ButtonDropdownContext } from './button-dropdown-context';
import ButtonDropdownItem from './button-dropdown-item';
import ButtonDropdownIcon from './icon';
import { getColor } from './styles';

export type ButtonDropdownTypes = NormalTypes;

interface Props {
  type?: ButtonDropdownTypes;
  auto?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type ButtonDropdownProps = Props & NativeAttrs;

const stopPropagation = (event: MouseEvent<HTMLElement>) => {
  event.stopPropagation();
  event.nativeEvent.stopImmediatePropagation();
};

function ButtonDropdown({
  children,
  type = 'default',
  auto = false,
  className = '',
  disabled = false,
  loading = false,
  icon,
  ...props
}: ButtonDropdownProps) {
  const { SCALES } = useScale();

  const theme = useTheme();
  const colors = getColor(theme.palette, type);

  const ref = useRef<HTMLDivElement>(null);

  const itemChildren = pickChild(children, ButtonDropdownItem)[1];
  const [itemChildrenWithoutMain, mainItemChildren] = pickChildByProps(
    itemChildren,
    'main',
    true
  );

  const [visible, setVisible] = useState(false);

  const clickHandler = useCallback(
    (event: MouseEvent<HTMLDetailsElement>) => {
      event.preventDefault();
      stopPropagation(event);

      if (disabled || loading) return;

      setVisible(!visible);
    },
    [visible]
  );

  const initialValue = {
    type,
    auto,
    disabled,
    loading,
  };

  const bgColor = useMemo(() => {
    if (disabled || loading) return theme.palette.accents_1;
    return visible ? colors.hoverBgColor : colors.bgColor;
  }, [visible, colors, theme.palette]);

  const [paddingLeft, paddingRight] = [
    auto ? SCALES.pl(1.15) : SCALES.pl(1.375),
    auto ? SCALES.pr(1.15) : SCALES.pr(1.375),
  ];

  useClickAway(ref, () => setVisible(false));

  return (
    <ButtonDropdownContext.Provider value={initialValue}>
      <div
        ref={ref}
        className={useClasses('btn-dropdown', className)}
        onClick={stopPropagation}
        {...props}
      >
        {mainItemChildren}

        <details open={visible}>
          <summary onClick={clickHandler}>
            <div className="dropdown-box">
              {icon ? (
                <span
                  className="dropdown-icon"
                  style={{
                    color: colors.color,
                    height: SCALES.height(2.5),
                    width: SCALES.height(2.5),
                  }}
                >
                  {icon}
                </span>
              ) : (
                <ButtonDropdownIcon
                  color={colors.color}
                  height={SCALES.height(2.5)}
                />
              )}
            </div>
          </summary>
          <div className="content">{itemChildrenWithoutMain}</div>
        </details>

        <style jsx>{`
          .btn-dropdown {
            display: inline-flex;
            position: relative;
            box-sizing: border-box;
            border: 1px solid ${theme.palette.border};
            border-radius: ${theme.layout.radius};
            --kirin-dropdown-height: ${SCALES.height(2.5)};
            --kirin-dropdown-min-width: ${auto
              ? 'min-content'
              : SCALES.width(10.5)};
            --kirin-dropdown-padding: ${SCALES.pt(0)} ${paddingRight}
              ${SCALES.pb(0)} ${paddingLeft};
            --kirin-dropdown-font-size: ${SCALES.font(0.875)};
          }

          .btn-dropdown > :global(button) {
            border-top-left-radius: ${theme.layout.radius};
            border-bottom-left-radius: ${theme.layout.radius};
          }

          details {
            border-top-right-radius: ${theme.layout.radius};
            border-bottom-right-radius: ${theme.layout.radius};
            overflow: hidden;
          }

          .dropdown-box {
            height: ${SCALES.height(2.5)};
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
          }

          summary {
            box-sizing: border-box;
            -webkit-tap-highlight-color: transparent;
            list-style: none;
            outline: none;
            color: ${colors.color};
            background-color: ${bgColor};
            height: ${SCALES.height(2.5)};
            border-left: 1px solid ${colors.borderLeftColor};
            cursor: ${disabled || loading ? 'not-allowed' : 'pointer'};
            display: flex;
            justify-content: center;
            align-items: center;
            width: auto;
            padding: 0 1px;
            transition: background 0.2s ease 0s, border-color 0.2s ease 0s;
          }

          summary:hover {
            border-color: ${colors.hoverBorder};
            background-color: ${colors.hoverBgColor};
          }

          .content {
            position: absolute;
            right: 0;
            left: 0;
            z-index: 90;
            width: 100%;
            border-radius: ${theme.layout.radius};
            box-shadow: ${theme.expressiveness.shadowLarge};
            transform: translateY(${theme.layout.gapHalf});
            background-color: ${theme.palette.background};
          }

          .content > :global(button:first-of-type) {
            border-top-left-radius: ${theme.layout.radius};
            border-top-right-radius: ${theme.layout.radius};
          }

          .content > :global(button:last-of-type) {
            border-bottom-left-radius: ${theme.layout.radius};
            border-bottom-right-radius: ${theme.layout.radius};
          }

          .dropdown-icon {
            display: flex;
            justify-content: center;
            align-items: center;
            transform: scale(0.6);
          }
        `}</style>
      </div>
    </ButtonDropdownContext.Provider>
  );
}

export default withScale(ButtonDropdown);
