export interface AdminPagination<T> {
  currentPage: number;
  totalPages: number;
  items: T[];
}
