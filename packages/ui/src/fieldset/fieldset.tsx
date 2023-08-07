import {
  FieldsetHTMLAttributes,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { hasChild, pickChild } from '../utils/collections';
import useWarning from '../utils/use-warning';
import FieldsetContent from './fieldset-content';
import { useFieldset } from './fieldset-context';
import FieldsetFooter from './fieldset-footer';
import FieldsetSubtitle from './fieldset-subtitle';
import FieldsetTitle from './fieldset-title';

interface Props {
  value?: string;
  label?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  className?: string;
}

type NativeAttrs = Omit<FieldsetHTMLAttributes<any>, keyof Props>;
export type FieldsetProps = Props & NativeAttrs;

function Fieldset({
  className = '',
  title = '',
  subtitle = '',
  children,
  value = '',
  label = '',
  ...props
}: FieldsetProps) {
  const theme = useTheme();
  const { SCALES } = useScale();
  const { inGroup, currentValue, register } = useFieldset();
  const classes = useClasses('fieldset', className);

  const [hidden, setHidden] = useState(inGroup);

  const [withoutFooterChildren, FooterChildren] = pickChild(
    children,
    FieldsetFooter
  );

  const hasTitle = hasChild(withoutFooterChildren, FieldsetTitle);
  const hasSubtitle = hasChild(withoutFooterChildren, FieldsetSubtitle);
  const hasContent = hasChild(withoutFooterChildren, FieldsetContent);

  if (inGroup) {
    if (!label)
      useWarning(
        'Props "label" is required when in a group.',
        'Fieldset Group'
      );

    if (!value || value === '') value = label;

    useEffect(() => register?.({ value, label }), []);

    useEffect(() => {
      if (!currentValue) return;
      setHidden(currentValue !== value);
    }, [currentValue]);
  }

  const content = useMemo(
    () => (
      <>
        {withoutFooterChildren}
        {!hasTitle && title && <FieldsetTitle>{title}</FieldsetTitle>}
        {!hasSubtitle && subtitle && (
          <FieldsetSubtitle>{subtitle}</FieldsetSubtitle>
        )}
      </>
    ),
    [withoutFooterChildren, hasTitle, hasSubtitle, title, subtitle]
  );

  return (
    <div className={classes} {...props}>
      {hasContent ? content : <FieldsetContent>{content}</FieldsetContent>}
      {FooterChildren && FooterChildren}

      <style jsx>{`
        .fieldset {
          background-color: ${theme.palette.background};
          border: 1px solid ${theme.palette.border};
          border-radius: ${theme.layout.radius};
          overflow: hidden;
          display: ${hidden ? 'none' : 'block'};
          font-size: ${SCALES.font(1)};
          width: ${SCALES.width(1, 'auto')};
          height: ${SCALES.height(1, 'auto')};
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)}
            ${SCALES.pl(0)};
          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
            ${SCALES.ml(0)};
        }
      `}</style>
    </div>
  );
}

export default withScale(Fieldset);
