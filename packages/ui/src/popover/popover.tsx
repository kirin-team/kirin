import React, { useEffect, useMemo, useState } from 'react';
import Tooltip, { TooltipProps } from '../tooltip/tooltip';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import { getReactNode } from '../utils/collections';
import { Placement, TriggerTypes } from '../utils/prop-types';
import { PopoverConfig, PopoverContext } from './popover-context';

export type PopoverTriggerTypes = TriggerTypes;
export type PopoverPlacement = Placement;

interface Props {
  content?: React.ReactNode | (() => React.ReactNode);
  trigger?: PopoverTriggerTypes;
  placement?: Placement;
  disableItemsAutoClose?: boolean;
}

type ExcludeTooltipProps = {
  type: any;
  text: any;
  trigger: any;
  placement: any;
};

export type PopoverProps = Props &
  Omit<TooltipProps, keyof ExcludeTooltipProps>;

function Popover({
  content,
  children,
  trigger = 'click',
  placement = 'bottom',
  initialVisible = false,
  portalClassName = '',
  disableItemsAutoClose = false,
  onVisibleChange = () => {},
  visible: customVisible,
  hideArrow = false,
  enterDelay = 100,
  leaveDelay = 150,
  offset = 12,
  className = '',
  ...props
}: PopoverProps) {
  const { SCALES } = useScale();
  const classes = useClasses('popover', portalClassName);

  const [visible, setVisible] = useState(initialVisible);

  const textNode = useMemo(() => getReactNode(content), [content]);

  const onChildClick = () => {
    onPopoverVisibleChange(false);
  };

  const value = useMemo<PopoverConfig>(
    () => ({ onItemClick: onChildClick, disableItemsAutoClose }),
    [disableItemsAutoClose]
  );

  const onPopoverVisibleChange = (next: boolean) => {
    setVisible(next);
    onVisibleChange(next);
  };

  useEffect(() => {
    if (customVisible === undefined) return;
    onPopoverVisibleChange(customVisible);
  }, [customVisible]);

  return (
    <PopoverContext.Provider value={value}>
      <Tooltip
        text={textNode}
        trigger={trigger}
        placement={placement}
        portalClassName={classes}
        visible={visible}
        onVisibleChange={onPopoverVisibleChange}
        hideArrow={hideArrow}
        enterDelay={enterDelay}
        leaveDelay={leaveDelay}
        offset={offset}
        className={className}
        {...props}
      >
        {children}

        <style jsx>{`
          :global(.tooltip-content.popover > .inner) {
            padding: ${SCALES.pt(0.9)} ${SCALES.pr(0)} ${SCALES.pb(0.9)}
              ${SCALES.pl(0)};
          }
        `}</style>
      </Tooltip>
    </PopoverContext.Provider>
  );
}

export default withScale(Popover);
