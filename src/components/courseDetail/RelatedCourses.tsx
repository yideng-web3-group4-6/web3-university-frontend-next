import React from 'react';
import CourseGrid from '@components/course/CourseGrid';
import { CartItem, Course } from '@/types/course/courseType';
import { useTranslation } from '@/i18n/client';

interface RelatedCoursesProps {
  lng: string;
  allCourse: Course[];
  handleAddToCart: (course: CartItem) => void;
}

const RelatedCourses: React.FC<RelatedCoursesProps> = ({ lng, allCourse, handleAddToCart }) => {
  const { t } = useTranslation(lng);

  if (allCourse.length === 0) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
        <h2 className='text-2xl font-bold text-cyber-blue mb-8'>{t('courses.relatedCourses')}</h2>
        <p className='text-center text-gray-400 py-8'>{t('courses.noRelatedCourses')}</p>
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold text-cyber-blue mb-8'>{t('courses.relatedCourses')}</h2>
      <CourseGrid
        courses={allCourse}
        displayCount={3}
        randomize={true}
        lng={lng}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default RelatedCourses;
