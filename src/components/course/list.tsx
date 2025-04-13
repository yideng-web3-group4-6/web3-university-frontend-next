import React from "react";

import CourseItem from "./item";
import { Course } from "@/utils/courseType";


const CourseList = ({courses = []}: {courses: Course[]}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:p-4">
      {courses.map((item, index) => (
        <CourseItem course={item} key={index} />
      ))}
    </div>
  );
};

export default CourseList;