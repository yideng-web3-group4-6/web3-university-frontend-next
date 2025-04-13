'use client';
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import RightSidebar from '@components/sidebar/RightSidebar';
import CartSidebar from '@components/sidebar/CartSidebar';
import { Course, CartItem } from '@/types/course/courseType';
import { fetchCourse, fetchCourseById } from '@/apis/courseApi';
import CourseDetailInfo from '@components/courseDetail/CourseDetailInfo';
import CourseChapters from '@components/courseDetail/CourseChapters';
import VideoModal from '@components/courseDetail/VideoModal';
import RelatedCourses from '@components/courseDetail/RelatedCourses';
import { useTranslation } from '@/i18n/client';

const CourseDetail: React.FC = () => {
  const paramData = useParams();
  const lng = (paramData?.lng as string) || 'en';
  const id = paramData?.id as string;
  const { t } = useTranslation(lng);
  const [course, setCourse] = useState<Course | null>(null);
  const [allCourse, setAllCourse] = useState<Course[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isPurchased, setIsPurchased] = useState(false);

  useEffect(() => {
    const loadAllCourses = async () => {
      try {
        const fetchedCourses = await fetchCourse();
        setAllCourse(fetchedCourses?.courses);
      } catch (error) {
        console.error('Failed to fetch all courses:', error);
        setAllCourse([]);
      }
    };
    loadAllCourses();
  }, []);

  useEffect(() => {
    const loadCourse = async () => {
      if (id) {
        try {
          const fetchedCourse = await fetchCourseById(id);
          setCourse(fetchedCourse);
        } catch (error) {
          console.error('Failed to fetch course:', error);
          setCourse(null);
        }
      }
    };
    loadCourse();
  }, [id]);

  const handleAddToCart = (course: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === course.id);

      if (existingItemIndex !== -1) {
        const updatedItems = [...prev];
        updatedItems[existingItemIndex] = course;
        return updatedItems;
      }

      return [...prev, course];
    });
  };

  const handlePurchase = () => {
    if (course) {
      handleAddToCart({
        id: course.id,
        title: course.title,
        price: course.price,
        image: course.coverImage,
      });
    }
  };

  const handlePlayVideo = (videoUrl: string, locked: boolean) => {
    if (locked && !isPurchased) {
      alert(t('courses.purchaseRequired'));
      return;
    }
    setCurrentVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVideo(null);
  };

  if (!course) {
    return (
      <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 text-center'>
        <p className='text-cyber-blue'>{t('courses.notFound')}</p>
      </div>
    );
  }

  return (
    <div className='relative'>
      <CourseDetailInfo
        lng={lng}
        course={course}
        isPurchased={isPurchased}
        handlePurchase={handlePurchase}
      />
      <CourseChapters
        lng={lng}
        course={course}
        isPurchased={isPurchased}
        handlePlayVideo={handlePlayVideo}
      />
      <VideoModal isModalOpen={isModalOpen} currentVideo={currentVideo} closeModal={closeModal} />
      <RelatedCourses lng={lng} allCourse={allCourse} handleAddToCart={handleAddToCart} />
      <RightSidebar lng={lng} cartItems={cartItems} setIsCartOpen={setIsCartOpen} />
      <CartSidebar
        lng={lng}
        cartItems={cartItems}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        setCartItems={setCartItems}
      />
    </div>
  );
};

export default CourseDetail;
