import Collapse from './collapse';
import CollapseGroup from './collapse-group';

export type CollapseType = typeof Collapse & {
  Group: typeof CollapseGroup;
};

(Collapse as CollapseType).Group = CollapseGroup;

export type { CollapseProps } from './collapse';
export type { CollapseGroupProps } from './collapse-group';

export default Collapse as CollapseType;
