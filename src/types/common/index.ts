export interface ResBase<T> {
  code: number | string;
  msg: string;
  data?: T;
}

export interface PaginationParmas {
  page?: number;
  size?: number;
}
