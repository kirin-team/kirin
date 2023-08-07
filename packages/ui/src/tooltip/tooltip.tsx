import {
  HTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import useClasses from '../use-classes';
import { withScale } from '../use-scale';
import { Placement, SnippetTypes, TriggerTypes } from '../utils/prop-types';
import useClickAway from '../utils/use-click-away';
import { getRect } from './helper';
import TooltipContent, { TooltipIconOffset } from './tooltip-content';

export type TooltipOnVisibleChange = (visible: boolean) => void;
export type TooltipTypes = SnippetTypes;
export type TooltipTriggers = TriggerTypes;
export type TooltipPlacement = Placement;

interface Props {
  text: string | ReactNode;
  type?: TooltipTypes;
  placement?: TooltipPlacement;
  visible?: boolean;
  initialVisible?: boolean;
  hideArrow?: boolean;
  trigger?: TooltipTriggers;
  enterDelay?: number;
  leaveDelay?: number;
  offset?: number;
  className?: string;
  portalClassName?: string;
  onVisibleChange?: TooltipOnVisibleChange;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type TooltipProps = Props & NativeAttrs;

function Tooltip({
  children,
  initialVisible = false,
  text,
  offset = 12,
  placement = 'top',
  portalClassName = '',
  enterDelay = 100,
  leaveDelay = 150,
  trigger = 'hover',
  type = 'default',
  className = '',
  onVisibleChange = () => {},
  hideArrow = false,
  visible: customVisible,
  ...props
}: TooltipProps) {
  const timer = useRef<number>();
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(initialVisible);

  const iconOffset = useMemo<TooltipIconOffset>(() => {
    if (!ref?.current) return { x: '0.75em', y: '0.75em' };

    const rect = getRect(ref);

    return {
      x: `${rect.width ? rect.width / 2 : 0}px`,
      y: `${rect.height ? rect.height / 2 : 0}px`,
    };
  }, [ref?.current]);

  const contentProps = {
    type,
    visible,
    offset,
    placement,
    hideArrow,
    iconOffset,
    parent: ref,
    className: portalClassName,
  };

  const changeVisible = (nextState: boolean) => {
    const clear = () => {
      clearTimeout(timer.current);
      timer.current = undefined;
    };

    const handler = (nextState: boolean) => {
      setVisible(nextState);
      onVisibleChange(nextState);
      clear();
    };

    clear();

    if (nextState) {
      timer.current = window.setTimeout(() => handler(true), enterDelay);
      return;
    }

    const leaveDelayWithoutClick = trigger === 'click' ? 0 : leaveDelay;

    timer.current = window.setTimeout(
      () => handler(false),
      leaveDelayWithoutClick
    );
  };

  const mouseEventHandler = (next: boolean) =>
    trigger === 'hover' && changeVisible(next);

  const clickEventHandler = () =>
    trigger === 'click' && changeVisible(!visible);

  useClickAway(ref, () => trigger === 'click' && changeVisible(false));

  useEffect(() => {
    if (customVisible === undefined) return;
    changeVisible(customVisible);
  }, [customVisible]);

  return (
    <div
      ref={ref}
      className={useClasses('tooltip', className)}
      onClick={clickEventHandler}
      onMouseEnter={() => mouseEventHandler(true)}
      onMouseLeave={() => mouseEventHandler(false)}
      {...props}
    >
      {children}

      <TooltipContent {...contentProps}>{text}</TooltipContent>

      <style jsx>{`
        .tooltip {
          width: max-content;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}

export default withScale(Tooltip);
