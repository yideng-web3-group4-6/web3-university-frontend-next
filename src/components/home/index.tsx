
import React from "react";
import { Box,Container } from "@mui/material";

import Banner from './banner';
import Course from './course';
import FAQ from './faq';
import Contact from './contact';    

export default function HomeContent() {
  return (
    <Box className="w-full mt-20">
        <Container maxWidth="lg">
            <Banner />
            <Course />
            <FAQ />
            <Contact />
        </Container>
    </Box>
  );
}