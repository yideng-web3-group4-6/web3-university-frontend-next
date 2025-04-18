import { CourseData, Course, PaginationParams } from '@/types/course/courseType';
import { fetchApi } from './fetch';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 获取课程列表
export const fetchCourse = async (params: PaginationParams): Promise<CourseData> => {
  return fetchApi<CourseData>('/api/course/list', { params });
};

// 获取课程详情
export const fetchCourseById = async (id: string): Promise<Course> => {
  return fetchApi<Course>(`/api/course/${id}`);
};

// React Query Hooks
export const useCourseList = (params: PaginationParams) => {
  return useQuery({
    queryKey: ['courses', params],
    queryFn: () => fetchCourse(params),
  });
};

export const useCourse = (id: string) => {
  return useQuery({
    queryKey: ['course', id],
    queryFn: () => fetchCourseById(id),
    enabled: !!id, // 只有当 id 存在时才执行查询
  });
};

// 示例：添加课程
export const useAddCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (newCourse: Partial<Course>) => 
      fetchApi<Course>('/api/course', {
        method: 'POST',
        body: JSON.stringify(newCourse),
      }),
    onSuccess: () => {
      // 使课程列表缓存失效，触发重新获取
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// 示例：更新课程
export const useUpdateCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Course> }) =>
      fetchApi<Course>(`/api/course/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),
    onSuccess: (_, { id }) => {
      // 使课程列表和单个课程缓存失效
      queryClient.invalidateQueries({ queryKey: ['courses'] });
      queryClient.invalidateQueries({ queryKey: ['course', id] });
    },
  });
};

// 示例：删除课程
export const useDeleteCourse = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: string) =>
      fetchApi<void>(`/api/course/${id}`, {
        method: 'DELETE',
      }),
    onSuccess: () => {
      // 使课程列表缓存失效
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};
