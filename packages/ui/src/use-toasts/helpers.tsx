import { MouseEvent } from 'react';
import Button from '../../../ui/src/button';
import { KirinThemesPalette } from '../themes';
import { NormalTypes, tuple } from '../utils/prop-types';
import { Toast, ToastAction } from './use-toast';

export function makeToastActions(
  actions: Toast['actions'],
  cancelHandle: () => void
) {
  const handler = (
    event: MouseEvent<HTMLButtonElement>,
    userHandler: ToastAction['handler']
  ) => userHandler?.(event, cancelHandle);

  if (!actions?.length) return null;

  return actions.map((action, index) => (
    <Button
      auto
      scale={1 / 3}
      font="13px"
      type={action.passive ? 'default' : 'secondary'}
      key={`action-${index}`}
      onClick={(event: MouseEvent<HTMLButtonElement>) =>
        handler(event, action.handler)
      }
    >
      {action.name}
    </Button>
  ));
}

export function getColors(palette: KirinThemesPalette, type?: NormalTypes) {
  const colors: { [key in NormalTypes]: string } = {
    default: palette.background,
    secondary: palette.secondary,
    success: palette.success,
    warning: palette.warning,
    error: palette.error,
  };

  const isDefault = !type || type === 'default';

  if (isDefault)
    return {
      bgColor: colors.default,
      color: palette.foreground,
    };

  return {
    bgColor: colors[type as NormalTypes],
    color: 'white',
  };
}

const toastPlacement = tuple(
  'topLeft',
  'topRight',
  'bottomLeft',
  'bottomRight'
);

export type ToastPlacement = (typeof toastPlacement)[number];

export function isTopPlacement(placement: ToastPlacement) {
  return `${placement}`.toLowerCase().startsWith('top');
}

export function isLeftPlacement(placement: ToastPlacement) {
  return `${placement}`.toLowerCase().endsWith('left');
}

export function getTranslateByPlacement(placement: ToastPlacement) {
  const translateInByPlacement: Record<ToastPlacement, string> = {
    topLeft: 'translate(-60px, -60px)',
    topRight: 'translate(60px, -60px)',
    bottomLeft: 'translate(-60px, 60px)',
    bottomRight: 'translate(60px, 60px)',
  };

  const translateOutByPlacement: Record<ToastPlacement, string> = {
    topLeft: 'translate(-50px, 15px) scale(0.85)',
    topRight: 'translate(50px, 15px) scale(0.85)',
    bottomLeft: 'translate(-50px, -15px) scale(0.85)',
    bottomRight: 'translate(50px, -15px) scale(0.85)',
  };

  return {
    enter: translateInByPlacement[placement],
    leave: translateOutByPlacement[placement],
  };
}
