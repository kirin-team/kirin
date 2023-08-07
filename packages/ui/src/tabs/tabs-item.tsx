import { HTMLAttributes, ReactNode, useEffect, useMemo, useRef } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { TabsInternalCellProps, useTabsContext } from './tabs-context';

interface Props {
  label: string | ReactNode;
  value: string;
  disabled?: boolean;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type TabsItemProps = Props & NativeAttrs;

function TabsItem({ children, value, label, disabled = false }: TabsItemProps) {
  const { SCALES } = useScale();
  const { register, currentValue } = useTabsContext();

  const isActive = useMemo(() => currentValue === value, [currentValue, value]);

  function TabsInternalCell({
    onClick,
    onMouseOver,
    activeClassName,
    activeStyle,
    hideBorder,
  }: TabsInternalCellProps) {
    const theme = useTheme();
    const { currentValue } = useTabsContext();

    const ref = useRef<HTMLDivElement | null>(null);

    const active = currentValue === value;
    const classes = useClasses('tab', {
      active,
      disabled,
      [activeClassName!]: active,
      'hide-border': hideBorder,
    });
    const clickHandler = () => {
      if (disabled) return;
      onClick && onClick(value);
    };

    return (
      <div
        ref={ref}
        className={classes}
        role="button"
        key={value}
        onMouseOver={onMouseOver}
        onClick={clickHandler}
        style={active ? activeStyle : {}}
        data-kirin="tab-item"
      >
        {label}

        <style jsx>{`
          .tab {
            position: relative;
            box-sizing: border-box;
            cursor: pointer;
            outline: 0;
            text-transform: capitalize;
            white-space: nowrap;
            background-color: transparent;
            color: ${theme.palette.accents_5};
            user-select: none;
            display: flex;
            align-items: center;
            font-size: ${SCALES.font(0.875)};
            line-height: normal;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            padding: ${SCALES.pt(0.875)} ${SCALES.pr(0.55)} ${SCALES.pb(0.875)}
              ${SCALES.pl(0.55)};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0.2)} ${SCALES.mb(0)}
              ${SCALES.ml(0.2)};
            z-index: 1;
            --tabs-item-hover-left: calc(-1 * ${SCALES.pl(0.28)});
            --tabs-item-hover-right: calc(-1 * ${SCALES.pr(0.28)});
          }

          .tab:hover {
            color: ${theme.palette.foreground};
          }

          .tab:after {
            position: absolute;
            content: '';
            bottom: -1px;
            left: 0;
            right: 0;
            width: 100%;
            height: 2px;
            border-radius: 4px;
            transform: scaleX(0.75);
            background-color: ${theme.palette.foreground};
            transition: opacity, transform 200ms ease-in;
            opacity: 0;
          }

          .active:after {
            opacity: 1;
            transform: scaleX(1);
          }

          .tab :global(svg) {
            max-height: 1em;
            margin-right: 5px;
          }

          .tab:first-of-type {
            margin-left: 0;
          }

          .active {
            color: ${theme.palette.foreground};
          }

          .disabled {
            color: ${theme.palette.accents_3};
            cursor: not-allowed;
          }

          .hide-border:before {
            display: block;
            content: ${label};
            font-weight: 500;
            height: 0;
            overflow: hidden;
            visibility: hidden;
          }

          .hide-border:after {
            display: none;
          }

          .hide-border.active {
            font-weight: 500;
          }
        `}</style>
      </div>
    );
  }

  useEffect(
    () => register?.({ value, cell: TabsInternalCell }),
    [value, label, disabled]
  );

  return isActive ? <>{children}</> : null;
}

export default withScale(TabsItem);
