import React from 'react';
import { Course } from '@/types/course/courseType';
import { useTranslation } from '@/i18n/client';
import { transitionBigNumber } from '@/utils/common';

interface CourseDetailInfoProps {
  lng: string;
  course: Course;
  isPurchased: boolean;
  handlePurchase: () => void;
}

const CourseDetailInfo: React.FC<CourseDetailInfoProps> = ({
  lng,
  course,
  isPurchased,
  handlePurchase,
}) => {
  const { t } = useTranslation(lng);

  const handlePurchaseClick = () => {
    handlePurchase();
  };

  return (
    <div className='hero-gradient pt-24'>
      <div className='max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8'>
        <div className='flex flex-col lg:flex-row gap-8'>
          <div className='flex-1'>
            <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-cyber-blue to-cyber-purple'>
              {course.title}
            </h1>
            <p className='mt-6 text-xl'>{course.description}</p>
            <div className='flex items-center mt-4'>
              <span className='text-sm bg-dark-card px-3 py-1 rounded-full text-cyber-blue'>
                {course.level}
              </span>
              <span className='text-sm ml-4'>
                {course.duration} {t('courses.week')}
              </span>
            </div>
            <div className='flex flex-wrap gap-2 mt-4'>
              {course.tags
                ? course.tags.split(',').map((tag, index) => (
                    <span key={index} className='text-xs bg-dark-card/50 px-2 py-1 rounded-full'>
                      {tag.trim()}
                    </span>
                  ))
                : null}
            </div>
            <div className='mt-6'>
              <span className='text-xl font-bold text-cyber-blue'>
                {transitionBigNumber(course.price)} $YD
              </span>
            </div>
            {!isPurchased && (
              <button
                onClick={handlePurchaseClick}
                className='mt-6 bg-transparent border-2 border-cyber-blue text-cyber-blue px-6 py-3 rounded-lg font-medium hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple hover:shadow-neon transition-all duration-300'
              >
                {t('courses.buyNow')}
              </button>
            )}
          </div>
          <div className='w-full lg:w-1/3'>
            <img
              src={course.coverImage}
              alt={course.title}
              className='w-full h-64 object-cover rounded-lg shadow-neon'
              // onError={e => (e.currentTarget.src = '/placeholder-image.jpg')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetailInfo;
