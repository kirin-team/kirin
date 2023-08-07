import Radio from './radio';
import RadioDescription from './radio-description';
import RadioGroup from './radio-group';

export type RadioType = typeof Radio & {
  Group: typeof RadioGroup;
  Description: typeof RadioDescription;
  Desc: typeof RadioDescription;
};

(Radio as RadioType).Group = RadioGroup;
(Radio as RadioType).Description = RadioDescription;
(Radio as RadioType).Desc = RadioDescription;

export type {
  RadioEvent,
  RadioEventTarget,
  RadioProps,
  RadioTypes,
} from './radio';

export type { RadioDescriptionProps } from './radio-description';
export type { RadioGroupProps } from './radio-group';

export default Radio as RadioType;
