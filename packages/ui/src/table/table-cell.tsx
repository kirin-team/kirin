import { HTMLAttributes } from 'react';
import {
  TableAbstractColumn,
  TableDataItemBase,
  TableOnCellClick,
} from './table-types';

interface Props<TableDataItem extends TableDataItemBase> {
  columns: Array<TableAbstractColumn<TableDataItem>>;
  row: TableDataItem;
  rowIndex: number;
  emptyText: string;
  onCellClick?: TableOnCellClick<TableDataItem>;
}

export type TableCellData<TableDataItem extends TableDataItemBase> = {
  row: number;
  column: number;
  rowValue: TableDataItem;
};

type NativeAttrs = Omit<HTMLAttributes<any>, keyof Props<any>>;
export type TableCellProps<TableDataItem extends TableDataItemBase> =
  Props<TableDataItem> & NativeAttrs;

export default function TableCell<TableDataItem extends TableDataItemBase>({
  columns,
  row,
  rowIndex,
  emptyText,
  onCellClick,
}: TableCellProps<TableDataItem>) {
  return (
    <>
      {columns.map((column, index) => {
        const currentRowValue = row[column.prop];
        const cellValue = currentRowValue || emptyText;
        const shouldBeRenderElement = column.renderHandler(
          currentRowValue,
          row,
          rowIndex
        );

        return (
          <td
            key={`row-td-${index}-${String(column.prop)}`}
            onClick={() => onCellClick?.(currentRowValue, rowIndex, index)}
            className={column.className}
          >
            <div className="cell">
              {shouldBeRenderElement ? shouldBeRenderElement : cellValue}
            </div>
          </td>
        );
      })}
    </>
  );
}
