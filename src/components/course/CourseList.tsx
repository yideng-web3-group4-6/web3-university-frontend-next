import React, { useState } from 'react';
import CourseGrid from './CourseGrid';
import { Course, CartItem } from '@/types/course/courseType';
import { useTranslation } from '@/i18n/client';

interface CourseListProps {
  lng: string;
  onAddToCart: (course: CartItem) => void;
  courses: Course[];
}

const CourseList: React.FC<CourseListProps> = ({ onAddToCart, lng, courses }) => {
  const { t } = useTranslation(lng);
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [sortOption, setSortOption] = useState<string>('newest');
  const [displayCount, setDisplayCount] = useState<number>(6);

  const filteredCourses = courses.filter(course => {
    if (filterLevel === 'all') return true;
    return course.level.toLowerCase() === filterLevel.toLowerCase();
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (sortOption === 'priceLowToHigh') {
      return a.price - b.price;
    }
    return sortOption === 'newest' ? parseInt(b.id) - parseInt(a.id) : 0;
  });

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 6);
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-18 sm:px-6 lg:px-8'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-cyber-blue'>{t('courses.allCourses')}</h2>
        <div className='flex gap-4'>
          <select
            className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'
            value={filterLevel}
            onChange={e => setFilterLevel(e.target.value)}
          >
            <option value='all'>{t('courses.allLevels')}</option>
            <option value='beginner'>{t('courses.beginner')}</option>
            <option value='intermediate'>{t('courses.intermediate')}</option>
            <option value='advanced'>{t('courses.advanced')}</option>
          </select>
          <select
            className='bg-dark-card rounded-lg px-4 py-2 border border-cyber-blue/30'
            value={sortOption}
            onChange={e => setSortOption(e.target.value)}
          >
            <option value='newest'>{t('courses.newest')}</option>
            <option value='priceLowToHigh'>{t('courses.priceLowToHigh')}</option>
          </select>
        </div>
      </div>

      <CourseGrid
        courses={sortedCourses}
        displayCount={displayCount}
        onAddToCart={onAddToCart}
        lng={lng}
      />

      {displayCount < sortedCourses.length && (
        <div className='mt-12 text-center'>
          <button
            onClick={handleLoadMore}
            className='bg-dark-card text-cyber-blue px-8 py-3 rounded-lg font-medium hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'
          >
            {t('loadMore')}
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseList;
