import React from "react";
import { Box, Container } from "@mui/material";

import FAQList from "./list";
import './style.css'

const FAQ: React.FC = () => {
  return (
    <Box className="w-full md:mb-30 md:mt-20">
      <Container maxWidth="lg">
        <Box className="faq-area text-white p-6 rounded-lg">
          <Box className="mb-10">
          <h1 className='mb-15 font-bold text-4xl text-[#A3FF12]'>
            FAQs
          </h1>
          </Box>
          <FAQList />
        </Box>
      </Container> 
    </Box>
  );
};

export default FAQ;
