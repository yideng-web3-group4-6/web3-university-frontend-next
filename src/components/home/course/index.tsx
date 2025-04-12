'use client';

import React, { useEffect, useRef } from 'react';
import { Box, Container } from '@mui/material';
import './style.css';

const courseList = [
  {
    id: 1,
    title: 'Aora',
    category: 'Development',
    year: '2024',
    image: '/static/home/course.png',
    bgColor: '#8c8472',
  },
  {
    id: 2,
    title: 'Code Screenshot',
    category: 'Development & Design',
    year: '2024',
    image: '/static/home/course.png',
    bgColor: '#f8d7ea',
  },
  {
    id: 3,
    title: 'Code Screenshot',
    category: 'Development & Design',
    year: '2024',
    image: '/static/home/course.png',
    bgColor: '#fff',
  },
  {
    id: 4,
    title: 'Code Screenshot',
    category: 'Development & Design',
    year: '2024',
    image: '/static/home/course.png',
    bgColor: 'rgba(187 247 208)',
  },
];

const ProjectsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const children = entry.target.children;
            Array.from(children).forEach((child, index) => {
              setTimeout(() => {
                child.classList.add('slide-in');
              }, index * 200); // Stagger the animation
            });
          }
        });
      },
      { threshold: 0.1 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <Box className='w-full py-6 md:mt-20 md:mb-20'>
      <Container maxWidth='lg'>
        <h1 className='mb-2 font-bold text-4xl text-primary-500'>Popular Course</h1>

        <h2 className='text-white mb-10 text-xl'>
          There are all kinds of courses, buy the courses you like.
        </h2>
        <div
          ref={containerRef}
          className='pb-20 opacity-container grid row-gap-10 grid-cols-1 grid-rows-[masonry] gap-y-10 py-md sm:grid-cols-2 sm:gap-x-16 sm:gap-y-0'
        >
          {courseList.map((item, index) => (
            <div
              key={item.id}
              className={`opacity-container-child group h-fit w-full cursor-pointer even:sm:mt-14 ${
                index % 2 === 0 ? 'slide-from-left' : 'slide-from-right'
              }`}
            >
              <a className='h-fit w-full'>
                <span className='opacity-container-child__image'>
                  <div
                    className='aspect-[3/2] w-full overflow-hidden rounded-3xl'
                    style={{ backgroundColor: item.bgColor }}
                  >
                    <img
                      src={item.image}
                      alt='image'
                      className='aspect-[3/2] w-full object-cover transition duration-300 group-hover:scale-[1.015]'
                    />
                  </div>
                </span>
                <span className='text-white'>
                  <div className='mt-4 space-y-2'>
                    <h5 className='text-white text-2xl font-bold'>{item.title}</h5>
                    <div className='flex justify-between'>
                      <div className='flex flex-wrap gap-2'>
                        <p className='text-sm text-white'>{item.category}</p>
                      </div>
                      <p className='text-sm text-white'>{item.year}</p>
                    </div>
                  </div>
                </span>
              </a>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <a
            href='/course'
            className='cursor-pointer w-fit text-white rounded-full bg-primary-600 px-4 py-2'
          >
            View All Course
          </a>
        </div>
      </Container>
    </Box>
  );
};

export default ProjectsSection;
