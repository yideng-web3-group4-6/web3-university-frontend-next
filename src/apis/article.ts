import { ArticalItem } from "@/types/other/artical";
import request from "@/utils/request";

// 获取文章列表
export const getArticleList = async (): Promise<ArticalItem[]> => {
  const response = await request<ArticalItem[]>({
    method: "get",
    url: "/artical/list",
    config: {
      params: {
        page: 1,
        size: 10,
      },
    },
  });
  return response;
};
