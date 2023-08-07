import { ChangeEvent, FocusEvent, MouseEvent, ReactNode } from 'react';
import { NormalTypes } from '../utils/prop-types';

export type InputTypes = NormalTypes;

export interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: InputTypes;
  htmlType?: string;
  readOnly?: boolean;
  disabled?: boolean;
  label?: string;
  labelRight?: string;
  icon?: ReactNode;
  iconRight?: ReactNode;
  iconClickable?: boolean;
  className?: string;
  clearable?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onClearClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onFocus?: (e: FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
  onIconClick?: (e: MouseEvent<HTMLDivElement>) => void;
  autoComplete?: string;
}
