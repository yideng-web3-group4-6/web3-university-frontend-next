import React from 'react';
import Link from 'next/link';
import { Info, ShoppingCart } from 'lucide-react';
import { Course } from '@/types/course/courseType';
import { transitionBigNumber } from '@/utils/common';
import { useTranslation } from '@/i18n/client';

interface CourseCardProps extends Course {
  lng: string;
  onAddToCart: (course: { title: string; price: number }) => void;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  icon,
  title,
  description,
  level,
  duration,
  price,
  tags,
  lng,
  onAddToCart,
}) => {
  const { t } = useTranslation(lng);

  return (
    <div className='feature-card p-6 rounded-xl hover:shadow-neon transition-all duration-300'>
      <div className='flex items-center justify-center w-12 h-12 mb-4 bg-dark-card rounded-full float-animation'>
        {icon}
      </div>
      <h3 className='text-xl font-semibold mb-2 text-cyber-blue'>{title}</h3>
      <p className='mb-4'>{description}</p>
      <div className='flex justify-between items-center mb-4'>
        <span className='text-sm bg-dark-card px-3 py-1 rounded-full text-cyber-blue'>{level}</span>
        <span className='text-sm'>
          {duration} {t('courses.week')}
        </span>
      </div>
      <div className='flex flex-wrap gap-2 mb-5'>
        {tags
          ? tags.split(',').map((tag, index) => (
              <span key={index} className='text-xs bg-dark-card/50 px-2 py-1 rounded-full'>
                {tag.trim()}
              </span>
            ))
          : null}
      </div>
      <div className='flex justify-between items-center mt-auto'>
        <span className='text-xl font-bold text-cyber-blue'>{transitionBigNumber(price)} $YD</span>
        <div className='flex gap-2'>
          <div className='relative group'>
            <Link
              href={`/${lng}/course/[id]`}
              as={`/${lng}/course/${id}`}
              className='bg-transparent cursor-pointer border-2 border-cyber-blue text-cyber-blue p-2 rounded-lg text-sm font-medium flex items-center hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
            >
              <Info className='h-4 w-4 group-hover:animate-pulse' />
            </Link>
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {t('courses.courseDetails')}
            </span>
          </div>
          <div className='relative group'>
            <button
              onClick={() => onAddToCart({ title, price })}
              className='bg-transparent cursor-pointer border-2 border-cyber-blue text-cyber-blue p-2 rounded-lg text-sm font-medium flex items-center hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
            >
              <ShoppingCart className='h-4 w-4 group-hover:animate-pulse' />
            </button>
            <span className='absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              {t('courses.addShopping')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
