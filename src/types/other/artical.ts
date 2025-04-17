import { UserInfo } from './user';

export interface ArticleQueryParams {
  page: number;
  pageSize: number;
  title?: string;
  slug?: string;
  status?: 'draft' | 'published' | 'archived';
  authorId?: number;
  likedUserId?: number;
  favoritedUserId?: number;
}

export type ArticleItem = Required<Pick<ArticleQueryParams, 'title' | 'slug' | 'status'>> &
  Pick<UserInfo, 'createdAt' | 'updatedAt' | 'id'> & {
    content: string;
    author: UserInfo;
    favoritedBy: UserInfo[];
    likedBy: UserInfo[];
    metaDescription: string;
    metaTitle: string;
  };

export interface ArtileListRes {
  list: ArticleItem[];
  page: number;
  pageSize: number;
  total: number;
}

// 发布文章参数
export interface ArticleBody {
  title: string;
  content: string;
  subtitle?: string;
  slug?: string;
  cover?: string;
  keywords?: string;
  metaTitle?: string;
  metaDescription?: string;
  status?: 'draft' | 'published' | 'archived';
}
