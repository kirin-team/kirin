import {
  InputHTMLAttributes,
  Ref,
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useScale, withScale } from '../use-scale';
import Input from './input';
import { Props } from './input-props';
import PasswordIcon from './password-icon';

interface PasswordProps extends Props {
  hideToggle?: boolean;
}

type NativeAttrs = Omit<InputHTMLAttributes<any>, keyof PasswordProps>;
export type InputPasswordProps = PasswordProps & NativeAttrs;

const InputPassword = forwardRef(
  (
    { hideToggle = false, children, ...props }: InputPasswordProps,
    ref: Ref<HTMLInputElement | null>
  ) => {
    const { getAllScaleProps } = useScale();

    const [visible, setVisible] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    useImperativeHandle(ref, () => inputRef.current);

    const iconClickHandler = () => {
      setVisible((v) => !v);
      inputRef.current?.focus();
    };

    const inputProps = useMemo(
      () => ({
        ...props,
        ref: inputRef,
        iconClickable: true,
        onIconClick: iconClickHandler,
        htmlType: visible ? 'text' : 'password',
      }),
      [props, iconClickHandler, visible, inputRef]
    );

    const icon = useMemo(() => {
      if (hideToggle) return null;
      return <PasswordIcon visible={visible} />;
    }, [hideToggle, visible]);

    return (
      <Input iconRight={icon} {...getAllScaleProps()} {...inputProps}>
        {children}
      </Input>
    );
  }
);

InputPassword.displayName = 'InputPassword';

export default withScale(InputPassword);
