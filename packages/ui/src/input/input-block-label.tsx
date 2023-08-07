import { PropsWithChildren, memo } from 'react';
import useTheme from '../use-theme';

export type InputBlockLabelProps = PropsWithChildren;

function InputBlockLabel({ children }: InputBlockLabelProps) {
  const theme = useTheme();

  return (
    <label>
      {children}

      <style jsx>{`
        label {
          display: block;
          font-weight: normal;
          color: ${theme.palette.accents_6};
          padding: 0 0 0 1px;
          margin-bottom: 0.5em;
          font-size: 1em;
          line-height: 1.5;
        }

        label > :global(*:first-child) {
          margin-top: 0;
        }

        label > :global(*:last-child) {
          margin-bottom: 0;
        }
      `}</style>
    </label>
  );
}

export default memo(InputBlockLabel);
