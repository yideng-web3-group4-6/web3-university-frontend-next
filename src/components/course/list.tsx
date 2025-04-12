import React from "react";

import CourseItem from "./item";

const CourseList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 xs:p-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseItem key={index} />
      ))}
    </div>
  );
};

export default CourseList;