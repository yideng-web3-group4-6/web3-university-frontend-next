import React from 'react';
import { Box, Container } from '@mui/material';

import CourseList from './list';

export default function Home() {
  return (
    <Box className='w-full pt-20 bg-black'>
      <Container maxWidth='lg'>
        <CourseList />
      </Container>
    </Box>
  );
}
