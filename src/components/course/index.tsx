import React from 'react';
import { Box, Container } from '@mui/material';

import CourseList from './list';
import Filter from './filter';

export default function Home() {
  return (
    <Box className='w-full pt-20 bg-black'>
      <Container maxWidth='lg'>
        <Filter />
        <CourseList />
      </Container>
    </Box>
  );
}
