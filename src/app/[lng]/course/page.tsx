'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import CartSidebar from '@components/sidebar/CartSidebar';
import RightSidebar from '@components/sidebar/RightSidebar';
import CourseContent from '@/components/course/index';
import { useCourseList } from '@/apis/courseApi';
import { useTranslation } from '@/i18n/client';
import { useCart } from '@/context/CartContext';
import { LoadingScreen } from '@/components/common/LoadingScreen';
import { ErrorScreen } from '@/components/common/ErrorScreen';

const CoursePage: React.FC = () => {
  const params = useParams();
  const lng = (params?.lng as string) || 'en';
  const { t } = useTranslation(lng);
  const { cartItems, addToCart, setCartItems, isCartOpen, setIsCartOpen } = useCart();
  
  const { data, isLoading, error, refetch } = useCourseList({});
  const courses = data?.courses || [];

  if (isLoading) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <LoadingScreen
          title={t('loading')}
          subtitle={t('course.loading.subtitle')}
          status={t('course.loading.status')}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <ErrorScreen
          title={t('error.title')}
          subtitle={t('fetchCoursesError')}
          onRefresh={refetch}
        />
      </div>
    );
  }

  return (
    <div>
      <RightSidebar cartItems={cartItems} setIsCartOpen={setIsCartOpen} lng={lng} />
      <CartSidebar
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setCartItems={setCartItems}
        lng={lng}
      />
      <CourseContent courses={courses} />
    </div>
  );
};

export default CoursePage;
