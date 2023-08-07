import {
  ChangeEvent,
  FocusEvent,
  Ref,
  TextareaHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import { getColors } from '../input/styles';
import useClasses from '../use-classes';
import useScale, { withScale } from '../use-scale';
import useTheme from '../use-theme';
import { NormalTypes, tuple } from '../utils/prop-types';

const resizeTypes = tuple(
  'none',
  'both',
  'horizontal',
  'vertical',
  'initial',
  'inherit'
);

export type TextareaResizes = (typeof resizeTypes)[number];

export type TextareaTypes = NormalTypes;

interface Props {
  value?: string;
  initialValue?: string;
  placeholder?: string;
  type?: TextareaTypes;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onBlur?: (e: FocusEvent<HTMLTextAreaElement>) => void;
  className?: string;
  resize?: TextareaResizes;
}

type NativeAttrs = Omit<TextareaHTMLAttributes<any>, keyof Props>;
export type TextareaProps = Props & NativeAttrs;

const Textarea = forwardRef(
  (
    {
      type = 'default',
      disabled = false,
      readOnly = false,
      onFocus,
      onBlur,
      className = '',
      initialValue = '',
      onChange,
      value,
      placeholder,
      resize = 'none',
      ...props
    }: TextareaProps,
    ref: Ref<HTMLTextAreaElement | null>
  ) => {
    const theme = useTheme();
    const { SCALES } = useScale();

    const textareaRef = useRef<HTMLTextAreaElement>(null);
    useImperativeHandle(ref, () => textareaRef.current);

    const isControlledComponent = useMemo(() => value !== undefined, [value]);

    const [selfValue, setSelfValue] = useState(initialValue);
    const [hover, setHover] = useState(false);

    const classes = useClasses('wrapper', { hover, disabled }, className);

    const { color, borderColor, hoverBorder } = useMemo(
      () => getColors(theme.palette, type),
      [theme.palette, type]
    );

    const changeHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (disabled || readOnly) return;

      setSelfValue(event.target.value);
      onChange?.(event);
    };

    const focusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
      setHover(true);
      onFocus?.(e);
    };

    const blurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
      setHover(false);
      onBlur?.(e);
    };

    useEffect(() => {
      isControlledComponent && setSelfValue(value as string);
    });

    const controlledValue = isControlledComponent
      ? { value: selfValue }
      : { defaultValue: initialValue };

    const textareaProps = {
      ...props,
      ...controlledValue,
    };

    return (
      <div className={classes}>
        <textarea
          ref={textareaRef}
          disabled={disabled}
          placeholder={placeholder}
          readOnly={readOnly}
          onFocus={focusHandler}
          onBlur={blurHandler}
          onChange={changeHandler}
          {...textareaProps}
        />

        <style jsx>{`
          .wrapper {
            display: inline-flex;
            box-sizing: border-box;
            user-select: none;
            border-radius: ${theme.layout.radius};
            border: 1px solid ${borderColor};
            color: ${color};
            transition: border 0.2s ease 0s, color 0.2s ease 0s;
            min-width: 12.5rem;
            max-width: 95vw;
            --textarea-font-size: ${SCALES.font(0.875)};
            --textarea-height: ${SCALES.height(1, 'auto')};
            width: ${SCALES.width(1, 'initial')};
            height: var(--textarea-height);
            margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)}
              ${SCALES.ml(0)};
          }

          .wrapper.hover {
            border-color: ${hoverBorder};
          }

          .wrapper.disabled {
            background-color: ${theme.palette.accents_1};
            border-color: ${theme.palette.accents_2};
            cursor: not-allowed;
          }

          textarea {
            background-color: transparent;
            box-shadow: none;
            display: block;
            font-family: ${theme.font.sans};
            font-size: var(--textarea-font-size);
            width: 100%;
            height: var(--textarea-height);
            border: none;
            outline: none;
            padding: ${SCALES.pt(0.5)} ${SCALES.pr(0.5)} ${SCALES.pb(0.5)}
              ${SCALES.pl(0.5)};
            resize: ${resize};
          }

          .disabled > textarea {
            cursor: not-allowed;
          }

          textarea:-webkit-autofill,
          textarea:-webkit-autofill:hover,
          textarea:-webkit-autofill:active,
          textarea:-webkit-autofill:focus {
            -webkit-box-shadow: 0 0 0 30px ${theme.palette.background} inset !important;
          }
        `}</style>
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default withScale(Textarea);
