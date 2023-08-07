import { PropsWithChildren, memo } from 'react';

interface Props {
  height: string;
}

export type EllipsisProps = Props;

function Ellipsis({ children, height }: PropsWithChildren<EllipsisProps>) {
  return (
    <span>
      {children}

      <style jsx>{`
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: ${height};
          min-width: 0;
        }
      `}</style>
    </span>
  );
}

export default memo(Ellipsis);
