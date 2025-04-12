
import React from "react";
import { Box,Container } from "@mui/material";

import CourseList from "./list";

export default function Home() {
  return (
    <Box className="w-full mt-20">
      <Container maxWidth="lg">
        <CourseList />
      </Container>
    </Box>
  );
}