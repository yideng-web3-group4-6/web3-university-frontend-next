import request from '@/utils/request';
import { CourseData, Course } from '@/utils/courseType';

export const fetchCourse = async (): Promise<CourseData> => {
  const res = await request<CourseData>({
    method: 'get',
    url: '/course/list',
  })
  console.log(res, '课程列表数据')
  return res
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  const res = await request<Course>({
    method: 'get',
    url: `/course/${id}`
  })
  console.log(res, '课程详情')
  return res
};
