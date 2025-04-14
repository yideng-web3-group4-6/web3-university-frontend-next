import React from 'react';
import { useAccount } from 'wagmi';
import Link from 'next/link';
import { Course } from '@/types/course/courseType';
import './style.css';

interface CourseItemProps {
  course: Course;
  hasCourse: boolean;
  tokenBalance: string;
  onBuyCourse: (course: Course) => Promise<void>;
}

const CourseItem: React.FC<CourseItemProps> = ({
  course,
  hasCourse,
  tokenBalance,
  onBuyCourse,
}) => {
  const { isConnected } = useAccount();

  return (
    <div className='course-item cursor-pointer'>
      <div className='course-info'>
        <img src={course.coverImage || '/static/course/course-1.png'} alt='Course Image' />
        <div className='course-title'>
          <h2 className='pb-2 pt-2'>{course.title}</h2>
          <p>{course.description}</p>
        </div>
      </div>
      <div className='course-content'>
        <ul className='course-listing'>
          <li className='flex justify-between'>
            <p>Category</p>
            <p>{course.level}</p>
          </li>
          <li className='flex justify-between'>
            <p className='font-bolder'>Price</p>
            <p>{course.price} YD</p>
          </li>
          {isConnected && (
            <li className='flex justify-between'>
              <p>Your Balance</p>
              <p>{tokenBalance} YD</p>
            </li>
          )}
        </ul>
      </div>
      {isConnected && (
        <div className='actions-btn'>
          <button>Like</button>
          {!hasCourse ? (
            <button onClick={() => onBuyCourse(course)}>Buy Now</button>
          ) : (
            <Link href={`/course/${course.id}`}>
              <button>View Course</button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseItem;
