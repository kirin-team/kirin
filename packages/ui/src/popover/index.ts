import Popover from './popover';
import PopoverItem from './popover-item';

export type PopoverType = typeof Popover & {
  Item: typeof PopoverItem;
  Option: typeof PopoverItem;
};

(Popover as PopoverType).Item = PopoverItem;
(Popover as PopoverType).Option = PopoverItem;

export type {
  PopoverPlacement,
  PopoverProps,
  PopoverTriggerTypes,
} from './popover';

export type { PopoverItemProps } from './popover-item';

export default Popover as PopoverType;
