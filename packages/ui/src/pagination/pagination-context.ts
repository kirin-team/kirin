import { createContext, useContext } from 'react';
import { tuple } from '../utils/prop-types';

const paginationUpdateTypes = tuple('prev', 'next', 'click');

export type PaginationUpdateType = (typeof paginationUpdateTypes)[number];

export interface PaginationConfig {
  isFirst?: boolean;
  isLast?: boolean;
  update?: (type: PaginationUpdateType) => void;
}

const defaultContext: PaginationConfig = {};

export const PaginationContext = createContext(defaultContext);
export const usePaginationContext = () => useContext(PaginationContext);
