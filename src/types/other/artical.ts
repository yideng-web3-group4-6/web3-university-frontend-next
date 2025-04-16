export interface ArticalItem {
  id: number;
  authoud: string;
  createAt: Date;
  title: string;
  content: string;
}

export interface ArticleQueryParams {
  page: number,
  pageSize: number,
  title?: string,
  slug?: string,
  status?: string,
  authorId?: number,
  likedUserId?: number,
  favoritedUserId?: number
}
