import Select from './select';
import SelectOption from './select-option';

export type SelectType = typeof Select & {
  Option: typeof SelectOption;
};

(Select as SelectType).Option = SelectOption;

export type { SelectProps, SelectRef, SelectTypes } from './select';
export type { SelectOptionProps } from './select-option';

export default Select as SelectType;
