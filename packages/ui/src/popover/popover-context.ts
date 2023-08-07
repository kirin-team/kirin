import { MouseEvent, createContext, useContext } from 'react';

export type PopoverConfig = {
  disableItemsAutoClose: boolean;
  onItemClick: (e: MouseEvent<HTMLDivElement>) => void;
};

const defaultContext: PopoverConfig = {
  disableItemsAutoClose: false,
  onItemClick: () => {},
};

export const PopoverContext = createContext(defaultContext);
export const usePopoverContext = () => useContext(PopoverContext);
