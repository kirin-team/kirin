import { PropsWithChildren } from 'react';
import Grid from '../grid';
import useTheme from '../use-theme';
import SelectClearIcon from './select-icon-clear';

interface Props {
  disabled: boolean;
  onClear: (() => void) | null;
}

export type SelectMultipleValueProps = Props;

export default function SelectMultipleValue({
  disabled,
  onClear,
  children,
}: PropsWithChildren<SelectMultipleValueProps>) {
  const theme = useTheme();

  return (
    <Grid>
      <div className="item">
        {children}
        {onClear && <SelectClearIcon onClick={onClear} />}
      </div>

      <style jsx>{`
        .item {
          display: inline-flex;
          justify-items: center;
          align-items: center;
          line-height: 1;
          padding: 0 0.5em;
          font-size: var(--select-font-size);
          height: calc(var(--select-font-size) * 2);
          border-radius: ${theme.layout.radius};
          background-color: ${theme.palette.accents_2};
          color: ${disabled
            ? theme.palette.accents_4
            : theme.palette.accents_6};
        }

        .item > :global(div:not(.clear-icon)),
        .item > :global(div:not(.clear-icon):hover) {
          border-radius: 0;
          background-color: transparent;
          padding: 0;
          margin: 0;
          color: inherit;
        }
      `}</style>
    </Grid>
  );
}
