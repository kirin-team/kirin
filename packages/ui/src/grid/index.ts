import Grid from './grid';
import GridContainer from './grid-container';

export type GridType = typeof Grid & {
  Container: typeof GridContainer;
};

(Grid as GridType).Container = GridContainer;

export type { GridBreakpointsValue } from './basic-item';
export type { GridProps } from './grid';
export type { GridContainerProps } from './grid-container';

export type {
  GridAlignContent,
  GridAlignItems,
  GridDirection,
  GridJustify,
  GridWrap,
} from './grid-types';

export default Grid as GridType;
