
import React from "react";
import { Box, Container } from "@mui/material";

import CourseList from "./list";

export default function Home() {
  return (
    <Box className="min-h-screen mt-20">
      <Container maxWidth="lg" className="px-10 py-10">
        <CourseList />
      </Container>
    </Box>
  );
}