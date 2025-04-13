import React from 'react';
import { Box, Container } from '@mui/material';
import { Course } from '@/types/course/courseType';

import CourseList from './list';
import Filter from './filter';
import Info from './info';
import Footer from '../layout/footer';

export default function Home({ courses }: { courses: Course[] }) {
  return (
    <Box className='w-full pt-20 bg-black pb-0'>
      <Container maxWidth='lg'>
        <Info />
        <Filter />
        <CourseList courses={courses} />
        <Footer />
      </Container>
    </Box>
  );
}
