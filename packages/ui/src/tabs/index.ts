import Tabs from './tabs';
import TabsItem from './tabs-item';

export type TabsType = typeof Tabs & {
  Item: typeof TabsItem;
  Tab: typeof TabsItem;
};

(Tabs as TabsType).Item = TabsItem;
(Tabs as TabsType).Tab = TabsItem;

export type { TabsProps } from './tabs';

export default Tabs as TabsType;
