import {
  PropsWithChildren,
  cloneElement,
  isValidElement,
  useEffect,
  useState,
} from 'react';
import useClasses from '../use-classes';

interface Props {
  visible?: boolean;
  enterTime?: number;
  leaveTime?: number;
  clearTime?: number;
  className?: string;
  name?: string;
}

export type CssTransitionProps = Props;

export default function CssTransition({
  children,
  className = '',
  visible = false,
  enterTime = 60,
  leaveTime = 60,
  clearTime = 60,
  name = 'Transition',
  ...props
}: PropsWithChildren<CssTransitionProps>) {
  const [classes, setClasses] = useState('');
  const [renderable, setRenderable] = useState(visible);

  useEffect(() => {
    const statusClassName = visible ? 'enter' : 'leave';
    const time = visible ? enterTime : leaveTime;

    if (visible && !renderable) setRenderable(true);

    setClasses(`${name}-${statusClassName}`);

    const timer = setTimeout(() => {
      setClasses(
        `${name}-${statusClassName} ${name}-${statusClassName}-active`
      );

      clearTimeout(timer);
    }, time);

    const clearClassesTimer = setTimeout(() => {
      if (!visible) {
        setClasses('');
        setRenderable(false);
      }

      clearTimeout(clearClassesTimer);
    }, time + clearTime);

    return () => {
      clearTimeout(timer);
      clearTimeout(clearClassesTimer);
    };
  }, [visible, renderable]);

  if (!isValidElement(children) || !renderable) return null;

  return cloneElement(children, {
    ...props,
    className: useClasses(children.props.className, className, classes),
  } as { className: string });
}
