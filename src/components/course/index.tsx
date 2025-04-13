
import React from "react";
import { Box,Container } from "@mui/material";

import CourseList from "./list";
import { Course } from "@/utils/courseType";


export default function Home({courses}: {courses: Course[]}) {
  return (
    <Box className="w-full pt-20">
      <Container maxWidth="lg">
        <CourseList courses={courses} />
      </Container>
    </Box>
  );
}