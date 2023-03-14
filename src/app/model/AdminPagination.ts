export interface Pagination<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
}
