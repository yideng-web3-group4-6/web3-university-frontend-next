import api from './axios';
import { CourseData, Course } from '@/utils/courseType';

export const fetchCourse = async (): Promise<CourseData> => {
  try {
    const response = await api.get('/api/course/list');
    const data = response.data?.data;
    if (!data) {
      throw new Error('No course data found in response');
    }
    return data as CourseData;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw new Error('Failed to fetch courses. Please try again later.');
  }
};

export const fetchCourseById = async (id: string): Promise<Course> => {
  try {
    const response = await api.get(`/api/course/${id}`);
    const data = response.data?.data;
    if (!data) {
      throw new Error(`No course found with id ${id}`);
    }
    return data as Course;
  } catch (error) {
    console.error(`Failed to fetch course with id ${id}:`, error);
    throw new Error(`Failed to fetch course with id ${id}. Please try again later.`);
  }
};
