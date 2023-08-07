import { PropsWithChildren, useEffect } from 'react';
import useWarning from '../utils/use-warning';
import { useTableContext } from './table-context';
import { TableColumnRender, TableDataItemBase } from './table-types';

export type TableColumnProps<TableDataItem extends TableDataItemBase> = {
  prop: keyof TableDataItem;
  label?: string;
  width?: number;
  className?: string;
  render?: TableColumnRender<TableDataItem>;
};

export default function TableColumn<TableDataItem extends TableDataItemBase>({
  children,
  prop,
  label,
  width,
  className = '',
  render: renderHandler = () => {},
}: PropsWithChildren<TableColumnProps<TableDataItem>>) {
  const { updateColumn } = useTableContext<TableDataItem>();
  const safeProp = `${String(prop)}`.trim();

  if (!safeProp) useWarning('Props "prop" is required.', 'Table.Column');

  useEffect(
    () =>
      updateColumn({
        label: children || label,
        prop: safeProp,
        width,
        className,
        renderHandler,
      }),
    [children, label, prop, width, className, renderHandler]
  );

  return null;
}
