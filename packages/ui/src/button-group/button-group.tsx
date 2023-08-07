import { HTMLAttributes, useMemo } from 'react';
import { KirinThemesPalette } from '../themes/presets';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { ButtonTypes } from '../utils/prop-types';
import { ButtonGroupConfig, ButtonGroupContext } from './button-group-context';

interface Props {
  disabled?: boolean;
  vertical?: boolean;
  ghost?: boolean;
  type?: ButtonTypes;
  className?: string;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type ButtonGroupProps = Props & NativeAttrs;

function getGroupBorderColors(
  palette: KirinThemesPalette,
  props: ButtonGroupProps
) {
  const { ghost = false, type = 'default' } = props;

  if (!ghost && type !== 'default') return palette.background;

  const colors: { [key in ButtonTypes]?: string } = {
    default: palette.border,
    success: palette.success,
    secondary: palette.secondary,
    error: palette.error,
    warning: palette.warning,
  };

  const withoutLightType = type.replace('-light', '') as ButtonTypes;

  return colors[withoutLightType] || (colors.default as string);
}

function ButtonGroup(groupProps: ButtonGroupProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const {
    disabled = false,
    type = 'default',
    ghost = false,
    vertical = false,
    children,
    className = '',
    ...props
  } = groupProps;

  const initialValue = useMemo<ButtonGroupConfig>(
    () => ({
      disabled,
      type,
      ghost,
      isButtonGroup: true,
    }),
    [disabled, type]
  );

  const border = useMemo(
    () => getGroupBorderColors(theme.palette, groupProps),
    [theme, type, disabled, ghost]
  );

  const classes = useClasses(
    'btn-group',
    { vertical: vertical, horizontal: !vertical },
    className
  );

  return (
    <ButtonGroupContext.Provider value={initialValue}>
      <div className={classes} {...props}>
        {children}

        <style jsx>{`
          .btn-group {
            display: inline-flex;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${border};
            background-color: transparent;
            overflow: hidden;
            width: ${SCALES.width(1, 'auto')};
            height: ${SCALES.height(1, 'min-content')};
            margin: ${SCALES.mt(0.313)} ${SCALES.mr(0.313)} ${SCALES.mb(0.313)}
              ${SCALES.ml(0.313)};
            padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
              ${SCALES.pl(0)};
          }
          .vertical {
            flex-direction: column;
          }
          .btn-group :global(.btn) {
            border: none;
          }
          .btn-group :global(.btn .text) {
            top: 0;
          }
          .horizontal :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-left: 1px solid ${border};
          }
          .horizontal :global(.btn:not(:last-child)) {
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
          }
          .vertical :global(.btn:not(:first-child)) {
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-top: 1px solid ${border};
          }
          .vertical :global(.btn:not(:last-child)) {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
          }
        `}</style>
      </div>
    </ButtonGroupContext.Provider>
  );
}

export default withScale(ButtonGroup);
