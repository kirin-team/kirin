import { createContext, useContext } from 'react';
import { TableAbstractColumn, TableDataItemBase } from './table-types';

export interface TableConfig<T extends TableDataItemBase> {
  columns: Array<TableAbstractColumn<T>>;
  updateColumn: (column: TableAbstractColumn<T>) => void;
}

const defaultContext: TableConfig<any> = {
  columns: [],
  updateColumn: () => {},
};

export const TableContext = createContext(defaultContext);

export const useTableContext = <
  T extends TableDataItemBase
>(): TableConfig<T> => useContext<TableConfig<T>>(TableContext);
