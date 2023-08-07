import Checkbox from './checkbox';
import CheckboxGroup from './checkbox-group';

export type CheckboxType = typeof Checkbox & {
  Group: typeof CheckboxGroup;
};

(Checkbox as CheckboxType).Group = CheckboxGroup;

export type {
  CheckboxEvent,
  CheckboxEventTarget,
  CheckboxProps,
  CheckboxTypes,
} from './checkbox';

export type { CheckboxGroupProps } from './checkbox-group';

export default Checkbox as CheckboxType;
