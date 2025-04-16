import { ArticleQueryParams } from "@/types/other/artical";
import request from "@/utils/request";

// 获取文章列表
export const getArticleList = async (params: ArticleQueryParams) => {
  const response = await request<object>({
    method: "get",
    url: "/article/search",
    config: {
      params
    },
  });
  return response;
};

// 获取文章详情
export const getArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "get",
    url: `/article/${id}`,
  });
  return response;
}

// 更新文章详情
export const putArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "put",
    url: `/article/${id}`,
  });
  return response;
}

// 删除文章
export const delArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "delete",
    url: `/article/${id}`,
  });
  return response;
}


// 获取喜欢的文章详情
export const getLikeArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "get",
    url: `/article/like/${id}`,
  });
  return response;
}

// 获取不喜欢的文章详情
export const getUnlikeArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "get",
    url: `/article/unlike/${id}`,
  });
  return response;
}

// 获取喜爱的文章详情
export const getFavoriteArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "get",
    url: `/article/favorite/${id}`,
  });
  return response;
}

// 获取喜爱的文章详情
export const getUnfavoriteArticleDetail = async (id: string | number) => {
  const response = await request<object>({
    method: "get",
    url: `/article/unfavorite/${id}`,
  });
  return response;
}

