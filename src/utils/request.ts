import { ResBase } from "@/types/common";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 创建 axios 实例
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_BASE_API || "", // 基础 URL
  timeout: 10000, // 请求超时时间
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（可选）
apiClient.interceptors.request.use(
  (config) => {
    // 在请求发送前可以添加 token 等
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（可选）
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // 统一处理错误
    if (error.response) {
      console.error("API Error:", error.response.data);
    } else {
      console.error("Network Error:", error.message);
    }
    return Promise.reject(error);
  }
);

const request = async <T>({
  method,
  url,
  data,
  config,
}: {
  method: "get" | "post" | "put" | "delete";
  url: string;
  data?: any;
  config?: AxiosRequestConfig;
}): Promise<T> => {
  try {
    const response: AxiosResponse<ResBase<T>> = await apiClient({
      method,
      url,
      data,
      ...config,
    });
    const { code, msg, data: responseData } = response.data;
    if (code !== 10000 && code !== "10000") {
      return Promise.reject(msg || "Request failed with unknown error");
    }

    // 返回 ResBase 格式的响应
    return responseData as T;
  } catch (error: any) {
    return Promise.reject(error.response?.data?.message || error.message || "Request failed");
  }
};

export default request;
