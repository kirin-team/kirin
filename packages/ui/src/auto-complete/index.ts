import AutoComplete from './auto-complete';
import AutoCompleteEmpty from './auto-complete-empty';
import AutoCompleteItem from './auto-complete-item';
import AutoCompleteSearching from './auto-complete-searching';

export type AutoCompleteType = typeof AutoComplete & {
  Item: typeof AutoCompleteItem;
  Option: typeof AutoCompleteItem;
  Searching: typeof AutoCompleteSearching;
  Empty: typeof AutoCompleteEmpty;
};

(AutoComplete as AutoCompleteType).Item = AutoCompleteItem;
(AutoComplete as AutoCompleteType).Option = AutoCompleteItem;
(AutoComplete as AutoCompleteType).Searching = AutoCompleteSearching;
(AutoComplete as AutoCompleteType).Empty = AutoCompleteEmpty;

export type {
  AutoCompleteOption,
  AutoCompleteOptions,
  AutoCompleteProps,
  AutoCompleteTypes,
} from './auto-complete';

export default AutoComplete as AutoCompleteType;
