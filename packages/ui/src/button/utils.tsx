import { Children, ReactNode } from 'react';
import { ButtonGroupConfig } from '../button-group/button-group-context';
import useClasses from '../use-classes';
import { ButtonProps } from './button';
import ButtonIcon from './button-icon';

export const getButtonChildrenWithIcon = (
  auto: boolean,
  children: ReactNode,
  icons: {
    icon?: ReactNode;
    iconRight?: ReactNode;
  }
) => {
  const { icon, iconRight } = icons;

  const hasIcon = icon || iconRight;
  const isRight = !!iconRight;

  const paddingForAutoMode = auto
    ? `calc(var(--kirin-button-height) / 2 + var(--kirin-button-icon-padding) * .5)`
    : 0;

  if (!hasIcon) return <div className="text">{children}</div>;

  if (!Children.count(children))
    return (
      <ButtonIcon isRight={isRight} isSingle>
        {hasIcon}
      </ButtonIcon>
    );

  const classes = useClasses('text', isRight ? 'right' : 'left');

  return (
    <>
      <ButtonIcon isRight={isRight}>{hasIcon}</ButtonIcon>
      <div className={classes}>
        {children}

        <style jsx>{`
          .left {
            padding-left: ${paddingForAutoMode};
          }

          .right {
            padding-right: ${paddingForAutoMode};
          }
        `}</style>
      </div>
    </>
  );
};

export function filterPropsWithGroup<T extends ButtonProps>(
  props: T,
  config: ButtonGroupConfig
): T {
  if (!config.isButtonGroup) return props;

  return {
    ...props,
    auto: true,
    shadow: false,
    ghost: config.ghost || props.ghost,
    type: config.type || props.type,
    disabled: config.disabled || props.disabled,
  };
}
