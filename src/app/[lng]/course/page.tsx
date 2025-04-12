'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
// import CourseList from '@components/course/CourseList';
import CartSidebar from '@components/sidebar/CartSidebar';
import RightSidebar from '@components/sidebar/RightSidebar';
import CourseList from '@/components/course/list';
import CourseContent from '@/components/course/index'
import { Course } from '@utils/courseType';
import { fetchCourse } from '@/apis/courseApi';
import { useTranslation } from '@/i18n/client';
import { useCart } from '@/context/CartContext';

const CoursePage: React.FC = () => {
  const params = useParams();
  const lng = (params?.lng as string) || 'en';
  const { t } = useTranslation(lng);
  const { cartItems, addToCart, setCartItems, isCartOpen, setIsCartOpen } = useCart();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const response = await fetchCourse();
        setCourses(response?.courses || []);
      } catch (error) {
        console.error('Failed to load courses:', error);
        setError(t('fetchCoursesError'));
        setCourses([]);
      } finally {
        setLoading(false);
      }
    };

    loadCourses();
  }, [t]);

  if (loading) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <p className='text-cyber-blue'>{t('loading')}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <p className='text-red-500'>{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* <CourseList onAddToCart={addToCart} lng={lng} courses={courses} /> */}
      <RightSidebar cartItems={cartItems} setIsCartOpen={setIsCartOpen} lng={lng} />
      <CartSidebar
         cartItems={cartItems}
         isCartOpen={isCartOpen}
         setIsCartOpen={setIsCartOpen}
         setCartItems={setCartItems}
         lng={lng}
      /> 
      <CourseContent/>
    </>
  );
};

export default CoursePage;
