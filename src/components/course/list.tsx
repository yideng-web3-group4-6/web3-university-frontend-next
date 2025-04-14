import React from 'react';

import CourseItem from './item';
import { Course } from '@/types/course/courseType';

interface CourseListProps {
  courses: Course[];
  userCourses: Record<string, boolean>;
  tokenBalance: string;
  onBuyCourse: (course: Course) => Promise<void>;
}

const CourseList = ({ courses, userCourses, tokenBalance, onBuyCourse }: CourseListProps) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-8 xs:p-4 pb-20'>
      {courses.map(course => (
        <CourseItem
          key={course.id}
          course={course}
          hasCourse={userCourses[course.id] || false}
          tokenBalance={tokenBalance}
          onBuyCourse={onBuyCourse}
        />
      ))}
    </div>
  );
};

export default CourseList;
