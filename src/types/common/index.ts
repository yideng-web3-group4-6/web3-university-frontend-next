export interface ResBase<T> {
  code: number | string;
  message: string;
  data?: T;
}

export interface PaginationParmas {
  page?: number;
  size?: number;
}
