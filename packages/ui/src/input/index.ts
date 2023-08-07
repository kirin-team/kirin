import Textarea from '../textarea';
import Input from './input';
import InputPassword from './password';

export type InputType = typeof Input & {
  Textarea: typeof Textarea;
  Password: typeof InputPassword;
};

(Input as InputType).Textarea = Textarea;
(Input as InputType).Password = InputPassword;

export type { TextareaProps } from '../textarea/textarea';
export type { InputProps } from './input';
export type { InputTypes } from './input-props';
export type { InputPasswordProps } from './password';

export default Input as InputType;
