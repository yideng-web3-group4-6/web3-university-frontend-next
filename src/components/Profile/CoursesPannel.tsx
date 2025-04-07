"use client";

import React from "react";
import Tabs from "@/components/common/Tabs";

interface Course {
  id: string;
  title: string;
  instructor: string;
  type: "published" | "purchased" | "all" | string;
}

interface CoursesPannelProps {
  courses: Course[];
}

const CoursesPannel: React.FC<CoursesPannelProps> = ({ courses }) => {
  const tabs = [
    { id: "published", label: "发布" },
    { id: "purchased", label: "购买" },
    { id: "all", label: "全部" },
  ];

  const emptyMessage = (tabId: string) =>
    `暂无${tabId === "published" ? "发布的" : tabId === "purchased" ? "购买的" : "任何"}课程`;

  const renderCourse = (course: Course) => (
    <div key={course.id} className="bg-dark-card p-4 rounded-xl shadow-neon flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{course.title}</h3>
        <p className="text-gray-400">讲师：{course.instructor}</p>
      </div>
      <button className="bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-blue/80">查看课程</button>
    </div>
  );

  return (
    <div>
      <Tabs tabs={tabs} data={courses} renderItem={renderCourse} filterKey="type" emptyMessage={emptyMessage} />
    </div>
  );
};

export default CoursesPannel;
