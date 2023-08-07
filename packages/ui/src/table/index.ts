import Table from './table';
import TableColumn from './table-column';

export type TableType = typeof Table & {
  Column: typeof TableColumn;
};

(Table as TableType).Column = TableColumn;

export type { TableProps } from './table';
export type { TableColumnProps } from './table-column';

export type {
  TableAbstractColumn,
  TableColumnRender,
  TableDataItemBase,
  TableOnCellClick,
  TableOnChange,
  TableOnRowClick,
  TableRowClassNameHandler,
} from './table-types';

export default Table as TableType;
