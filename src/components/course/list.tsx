import React from 'react';

import CourseItem from './item';
import { Course } from '@/types/course/courseType';

const CourseList = ({ courses }: { courses: Course[] }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 xs:p-4 pb-20'>
      {courses.map(course => (
        <CourseItem key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
