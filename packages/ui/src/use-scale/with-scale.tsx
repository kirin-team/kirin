import { ComponentType, PropsWithChildren, Ref, forwardRef } from 'react';
import useTheme from '../use-theme';
import { isCSSNumberValue } from '../utils/collections';
import {
  DynamicLayoutPipe,
  ScaleConfig,
  ScaleContext,
  ScaleProps,
} from './scale-context';
import { generateGetAllScaleProps, generateGetScaleProps } from './utils';

function reduceScaleCoefficient(scale: number) {
  if (scale === 1) return scale;
  const diff = Math.abs((scale - 1) / 2);
  return scale > 1 ? 1 + diff : 1 - diff;
}

export default function withScale<T, P = {}>(
  Render: ComponentType<P & { ref?: Ref<T> }>
) {
  const ScaleFC = forwardRef(
    (
      { children, ...props }: PropsWithChildren<P & ScaleProps>,
      ref: Ref<T>
    ) => {
      const { layout } = useTheme();

      const {
        paddingLeft,
        pl,
        paddingRight,
        pr,
        paddingTop,
        pt,
        paddingBottom,
        pb,
        marginTop,
        mt,
        marginRight,
        mr,
        marginBottom,
        mb,
        marginLeft,
        ml,
        px,
        py,
        mx,
        my,
        width,
        height,
        font,
        w,
        h,
        margin,
        padding,
        unit = layout.unit,
        scale = 1,
        ...innerProps
      } = props;

      const makeScaleHandler =
        (attrValue: string | number | undefined): DynamicLayoutPipe =>
        (scale1x, defaultValue) => {
          if (!scale1x) {
            scale1x = 1;
            defaultValue = defaultValue || 0;
          }

          const factor = reduceScaleCoefficient(scale) * scale1x;

          if (typeof attrValue === 'undefined') {
            if (typeof defaultValue !== 'undefined') return `${defaultValue}`;
            return `calc(${factor} * ${unit})`;
          }

          if (!isCSSNumberValue(attrValue)) return `${attrValue}`;

          const customFactor = factor * Number(attrValue);

          return `calc(${customFactor} * ${unit})`;
        };

      const value: ScaleConfig = {
        unit: unit,
        SCALES: {
          pt: makeScaleHandler(paddingTop ?? pt ?? py ?? padding),
          pr: makeScaleHandler(paddingRight ?? pr ?? px ?? padding),
          pb: makeScaleHandler(paddingBottom ?? pb ?? py ?? padding),
          pl: makeScaleHandler(paddingLeft ?? pl ?? px ?? padding),
          px: makeScaleHandler(
            px ?? paddingLeft ?? paddingRight ?? pl ?? pr ?? padding
          ),
          py: makeScaleHandler(
            py ?? paddingTop ?? paddingBottom ?? pt ?? pb ?? padding
          ),
          mt: makeScaleHandler(marginTop ?? mt ?? my ?? margin),
          mr: makeScaleHandler(marginRight ?? mr ?? mx ?? margin),
          mb: makeScaleHandler(marginBottom ?? mb ?? my ?? margin),
          ml: makeScaleHandler(marginLeft ?? ml ?? mx ?? margin),
          mx: makeScaleHandler(
            mx ?? marginLeft ?? marginRight ?? ml ?? mr ?? margin
          ),
          my: makeScaleHandler(
            my ?? marginTop ?? marginBottom ?? mt ?? mb ?? margin
          ),
          width: makeScaleHandler(width ?? w),
          height: makeScaleHandler(height ?? h),
          font: makeScaleHandler(font),
        },
        getScaleProps: generateGetScaleProps(props),
        getAllScaleProps: generateGetAllScaleProps(props),
      };

      return (
        <ScaleContext.Provider value={value}>
          <Render {...(innerProps as P)} ref={ref}>
            {children}
          </Render>
        </ScaleContext.Provider>
      );
    }
  );

  ScaleFC.displayName = `Scale${Render.displayName || 'Wrapper'}`;

  return ScaleFC;
}
