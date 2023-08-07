import { HTMLAttributes, ReactNode, useMemo } from 'react';
import { withScale } from '../use-scale';
import { NormalTypes } from '../utils/prop-types';
import TextChild from './child';

export type TextTypes = NormalTypes;
interface Props {
  h1?: boolean;
  h2?: boolean;
  h3?: boolean;
  h4?: boolean;
  h5?: boolean;
  h6?: boolean;
  p?: boolean;
  b?: boolean;
  small?: boolean;
  i?: boolean;
  span?: boolean;
  del?: boolean;
  em?: boolean;
  blockquote?: boolean;
  className?: string;
  type?: TextTypes;
}

type ElementMap = { [key in keyof JSX.IntrinsicElements]?: boolean };

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props>;
export type TextProps = Props & NativeAttrs;

type TextRenderableElements = Array<keyof JSX.IntrinsicElements>;

function getModifierChild(tags: TextRenderableElements, children: ReactNode) {
  if (!tags.length) return children;

  const nextTag = tags.slice(1, tags.length);

  return (
    <TextChild tag={tags[0]}>{getModifierChild(nextTag, children)}</TextChild>
  );
}

function Text({
  h1 = false,
  h2 = false,
  h3 = false,
  h4 = false,
  h5 = false,
  h6 = false,
  p = false,
  b = false,
  small = false,
  i = false,
  span = false,
  del = false,
  em = false,
  blockquote = false,
  children,
  className = '',
  type = 'default',
  ...props
}: TextProps) {
  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, blockquote };
  const inlineElements: ElementMap = { span, small, b, em, i, del };

  const names = Object.keys(elements).filter(
    (name) => elements[name as keyof JSX.IntrinsicElements]
  ) as TextRenderableElements;

  const inlineNames = Object.keys(inlineElements).filter(
    (name) => inlineElements[name as keyof JSX.IntrinsicElements]
  ) as TextRenderableElements;

  const tag = useMemo(() => {
    if (names[0]) return names[0];
    if (inlineNames[0]) return inlineNames[0];

    return 'p' as keyof JSX.IntrinsicElements;
  }, [names, inlineNames]);

  const renderableChildElements = inlineNames.filter(
    (name) => name !== tag
  ) as TextRenderableElements;

  const modifers = useMemo(() => {
    if (!renderableChildElements.length) return children;
    return getModifierChild(renderableChildElements, children);
  }, [renderableChildElements, children]);

  return (
    <TextChild className={className} tag={tag} {...props}>
      {modifers}
    </TextChild>
  );
}

export default withScale(Text);
