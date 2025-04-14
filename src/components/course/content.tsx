import React from 'react';
import CourseList, { CourseListProps } from './list';
import Empty from './empty';

interface CourseContentProps extends CourseListProps {}
const CourseContent: React.FC<CourseContentProps> = ({ courses, userCourses, tokenBalance, onBuyCourse }: CourseContentProps) => {
  return (
    <div className='flex justify-center items-center min-h-[500px]'>
        {
          courses.length === 0 ? (
            <Empty />
          ) : (
            <CourseList courses={courses} userCourses={userCourses} tokenBalance={tokenBalance} onBuyCourse={onBuyCourse} />
          )
        }
    </div>
  );
};

export default CourseContent;