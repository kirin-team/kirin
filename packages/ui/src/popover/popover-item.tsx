import { HTMLAttributes, MouseEvent } from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { usePopoverContext } from './popover-context';

interface Props {
  line?: boolean;
  title?: boolean;
  disableAutoClose?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type PopoverItemProps = Props & NativeAttrs;

function PopoverItem({
  children,
  line = false,
  title = false,
  className = '',
  onClick,
  disableAutoClose = false,
  ...props
}: PopoverItemProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { disableItemsAutoClose, onItemClick } = usePopoverContext();
  const classes = useClasses('item', { line, title }, className);

  const dontCloseByClick =
    disableAutoClose || disableItemsAutoClose || title || line;

  const clickHandler = (event: MouseEvent<HTMLDivElement>) => {
    onClick?.(event);
    if (dontCloseByClick) return event.stopPropagation();
    onItemClick(event);
  };

  return (
    <>
      <div className={classes} onClick={clickHandler} {...props}>
        {children}

        <style jsx>{`
          .item {
            display: flex;
            box-sizing: border-box;
            justify-content: flex-start;
            align-items: center;
            color: ${theme.palette.accents_5};
            transition: color, background-color 150ms linear;
            line-height: 1.25em;
            font-size: ${SCALES.font(0.875)};
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'auto')};
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
            padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.75)} ${SCALES.pb(0.5)}
              ${SCALES.pl(0.75)};
            cursor: ${onClick ? 'pointer' : 'default'};
          }

          .item:hover {
            color: ${theme.palette.foreground};
          }

          .item.line {
            line-height: 0;
            padding: 0;
            background-color: ${theme.palette.border};
            height: ${SCALES.height(0.0625)};
            margin: ${SCALES.mt(0.35)} ${SCALES.mr(0)} ${SCALES.mb(0.35)}
              ${SCALES.ml(0)};
            width: ${SCALES.width(1, '100%')};
          }

          .item.title {
            font-weight: 500;
            font-size: ${SCALES.font(0.925)};
            color: ${theme.palette.foreground};
          }
        `}</style>
      </div>

      {title && <PopoverItemWithScale line title={false} />}
    </>
  );
}

const PopoverItemWithScale = withScale(PopoverItem);

export default PopoverItemWithScale;
