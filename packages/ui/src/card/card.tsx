import React, { useMemo } from 'react';
import Image from '../image';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { hasChild, pickChild } from '../utils/collections';
import { CardTypes } from '../utils/prop-types';
import CardContent from './card-content';
import CardFooter from './card-footer';
import { getStyles } from './styles';

interface Props {
  hoverable?: boolean;
  shadow?: boolean;
  className?: string;
  type?: CardTypes;
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>;
export type CardProps = Props & NativeAttrs;

function Card({
  children,
  hoverable = false,
  className = '',
  shadow = false,
  type = 'default',
  ...props
}: CardProps) {
  const theme = useTheme();
  const { SCALES } = useScale();

  const hoverShadow = useMemo(() => {
    if (shadow) return theme.expressiveness.shadowMedium;
    return hoverable ? theme.expressiveness.shadowSmall : 'none';
  }, [hoverable, shadow, theme.expressiveness]);

  const { color, bgColor, borderColor } = useMemo(
    () => getStyles(type, theme.palette, shadow),
    [type, theme.palette, shadow]
  );

  const [withoutFooterChildren, footerChildren] = pickChild(
    children,
    CardFooter
  );

  const [withoutImageChildren, imageChildren] = pickChild(
    withoutFooterChildren,
    Image
  );

  const hasContent = hasChild(withoutImageChildren, CardContent);

  return (
    <div className={useClasses('card', className)} {...props}>
      {imageChildren}

      {hasContent ? (
        withoutImageChildren
      ) : (
        <CardContent>{withoutImageChildren}</CardContent>
      )}

      {footerChildren}

      <style jsx>{`
        .card {
          background: ${theme.palette.background};
          transition: all 0.2s ease;
          border-radius: ${theme.layout.radius};
          box-shadow: ${shadow ? theme.expressiveness.shadowSmall : 'none'};
          box-sizing: border-box;
          color: ${color};
          background-color: ${bgColor};
          border: 1px solid ${borderColor};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }

        .card:hover {
          box-shadow: ${hoverShadow};
        }

        .card :global(img) {
          width: 100%;
        }

        .card :global(.image) {
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
        }
      `}</style>
    </div>
  );
}

export default withScale(Card);
