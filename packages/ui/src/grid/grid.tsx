import css from 'styled-jsx/css';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import GridBasicItem, { GridBasicItemProps } from './basic-item';

interface Props {
  className?: string;
}

export type GridProps = Props & GridBasicItemProps;

function Grid({ children, className = '', ...props }: GridProps) {
  const { SCALES } = useScale();

  const { className: resolveClassName, styles } = css.resolve`
    div {
      margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
      box-sizing: border-box;
      padding: ${SCALES.pt(0, 'var(--grid-gap-unit)')}
        ${SCALES.pr(0, 'var(--grid-gap-unit)')}
        ${SCALES.pb(0, 'var(--grid-gap-unit)')}
        ${SCALES.pl(0, 'var(--grid-gap-unit)')};
    }
  `;

  const classes = useClasses(resolveClassName, className);

  return (
    <GridBasicItem className={classes} {...props}>
      {children}
      {styles}
    </GridBasicItem>
  );
}

export default withScale(Grid);
