import {
  CSSProperties,
  ComponentType,
  MouseEvent,
  createContext,
  useContext,
} from 'react';

export type TabsInternalCellProps = {
  onClick: (value: string) => void;
  onMouseOver: (e: MouseEvent<HTMLDivElement>) => void;
  activeClassName?: string;
  activeStyle?: CSSProperties;
  hideBorder?: boolean;
};

export type TabsInternalCell = ComponentType<TabsInternalCellProps>;

export interface TabsHeaderItem {
  value: string;
  cell: TabsInternalCell;
}

export interface TabsConfig {
  register?: (item: TabsHeaderItem) => void;
  currentValue?: string;
  inGroup: boolean;
  leftSpace?: CSSProperties['marginLeft'];
}

const defaultContext: TabsConfig = {
  inGroup: false,
};

export const TabsContext = createContext(defaultContext);
export const useTabsContext = () => useContext(TabsContext);
