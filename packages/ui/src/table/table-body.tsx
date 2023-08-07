import { HTMLAttributes } from 'react';
import useClasses from '../use-classes';
import useTheme from '../use-theme';
import TableCell from './table-cell';
import { useTableContext } from './table-context';
import {
  TableDataItemBase,
  TableOnCellClick,
  TableOnRowClick,
  TableRowClassNameHandler,
} from './table-types';

interface Props<TableDataItem extends TableDataItemBase> {
  hover: boolean;
  emptyText: string;
  onRow?: TableOnRowClick<TableDataItem>;
  onCell?: TableOnCellClick<TableDataItem>;
  data: Array<TableDataItem>;
  className?: string;
  rowClassName: TableRowClassNameHandler<TableDataItem>;
}

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props<any>>;
export type TableBodyProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs;

export default function TableBody<TableDataItem extends TableDataItemBase>({
  data,
  hover,
  emptyText,
  onRow,
  onCell,
  rowClassName,
}: TableBodyProps<TableDataItem>) {
  const theme = useTheme();
  const { columns } = useTableContext<TableDataItem>();

  const rowClickHandler = (row: TableDataItem, index: number) =>
    onRow?.(row, index);

  return (
    <tbody>
      {data.map((row, index) => {
        const className = rowClassName(row, index);
        return (
          <tr
            key={`tbody-row-${index}`}
            className={useClasses({ hover }, className)}
            onClick={() => rowClickHandler(row, index)}
          >
            <TableCell<TableDataItem>
              columns={columns}
              row={row}
              rowIndex={index}
              emptyText={emptyText}
              onCellClick={onCell}
            />
          </tr>
        );
      })}

      <style jsx>{`
        tr {
          transition: background-color 0.25s ease;
          font-size: inherit;
        }
        tr.hover:hover {
          background-color: ${theme.palette.accents_1};
        }
        tr :global(td) {
          padding: 0 0.5em;
          border-bottom: 1px solid ${theme.palette.border};
          color: ${theme.palette.accents_6};
          font-size: calc(0.875 * var(--table-font-size));
          text-align: left;
        }
        tr :global(.cell) {
          min-height: calc(3.125 * var(--table-font-size));
          display: flex;
          -webkit-box-align: center;
          align-items: center;
          flex-flow: row wrap;
        }
      `}</style>
    </tbody>
  );
}
