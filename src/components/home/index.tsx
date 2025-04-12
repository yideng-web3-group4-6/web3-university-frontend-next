
import React from "react";
import { Box,Container } from "@mui/material";

import Banner from './banner';
import Course from './course';
import FAQ from './faq';
import Contact from './contact';    
import Footer from "../layout/footer";

export default function HomeContent() {
  return (
    <Box className="w-full mb-30">
        <Container maxWidth="lg">
            <Banner />
            <Course />
            <FAQ />
            <Contact />
            <Footer />
        </Container>
    </Box>
  );
}