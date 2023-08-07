import Pagination from './pagination';
import PaginationNext from './pagination-next';
import PaginationPrevious from './pagination-previous';

export type PaginationType = typeof Pagination & {
  Previous: typeof PaginationPrevious;
  Next: typeof PaginationNext;
};

(Pagination as PaginationType).Previous = PaginationPrevious;
(Pagination as PaginationType).Next = PaginationNext;

export type { PaginationProps } from './pagination';
export type { PaginationNextProps } from './pagination-next';
export type { PaginationPreviousProps } from './pagination-previous';

export default Pagination as PaginationType;
