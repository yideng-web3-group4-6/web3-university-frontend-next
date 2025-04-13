import React from 'react';
import { Box, Container } from '@mui/material';

import Banner from './banner';
import Course, { CourseSectionProps } from './course';
import FAQ from './faq';
import Contact from './contact';
import Footer from '../layout/footer';

interface HomeContentProps extends CourseSectionProps {}
export default function HomeContent({ courseList }: HomeContentProps) {
  return (
    <Box className='w-full mb-30'>
      <Container maxWidth='lg'>
        <Banner />
        <Course courseList={courseList} />
        <FAQ />
        <Contact />
        <Footer />
      </Container>
    </Box>
  );
}
