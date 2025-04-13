import { Box, Container } from '@mui/material';
import React from 'react';

import './style.css';

const ContactUs = () => {
  return (
    <Box className='md:mt-10 md:mb-30 w-full mb-20 mt-20'>
      <Container>
        <Box className='email-area text-center active-shape hover-shape-inner'>
          <h2 className='title mb-8 text-3xl font-bold text-white'>
            Get alerts 💌 for new IGOs & IDOs
          </h2>
          <div className='des mb-10 md:mb-8 text-white'>
            Sign up for newsletter to get more IGO/IDO News and Updates
          </div>
          <div className='flex items-center justify-center gap-2'>
            <input
              type='email'
              placeholder='Enter your email'
              className='px-3 py-2 w-30% md:h-11 fadeInUp border-1 border-gray-300 rounded-lg focus:outline-none'
            />
            <button className='md:h-11 rounded-md bg-primary-500 hover:bg-primary-600 px-3 py-2 cursor-pointer'>
              <span className='text-white text-bold'>Contact</span>
              <span className='hover-shape1'></span>
              <span className='hover-shape2'></span>
              <span className='hover-shape3'></span>
            </button>
          </div>
          <span className='border-shadow shadow-1'></span>
          <span className='border-shadow shadow-2'></span>
          <span className='border-shadow shadow-3'></span>
          <span className='border-shadow shadow-4'></span>
          <span className='hover-shape-bg hover_shape1'></span>
          <span className='hover-shape-bg hover_shape2'></span>
          <span className='hover-shape-bg hover_shape3'></span>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactUs;
