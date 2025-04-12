import React from "react";

import './style.css'

interface CourseItemProps {}
const CourseItem:React.FC<CourseItemProps> = ({
}) => {
  return (
    <div className="col-lg-4 col-md-6">
      <div className="course-shape-item hover-shape-border">
        <div className="course-item">
          <div className="course-info">
            <a href="course-details.html">
              <img src="/static/course/course-1.png" alt="Explore-Image" />
            </a>
            <div className="course-author">
                <h2 className="pb-3 pt-3">
                  <a href="project-details.html" className="text-2xl">
                    Cyber City Clan
                  </a>
                </h2>
              <p className="pb-3">描述信息描述信息描述信息描述信息描述信息描述信息描述信息</p>
            </div>
          </div>
          <div className="course-content">
            <div className="mb-1">
              <ul className="course-listing">
                <li className="pb-1 flex justify-between">
                  <span>type</span>
                  <span>xx</span>
                </li>
                <li className="pb-1 flex justify-between">
                  <span>price</span>
                  <span>900.00 BUSD</span>
                </li>
              </ul>
            </div>
          </div>
          <span className="border-shadow shadow-1"></span>
          <span className="border-shadow shadow-2"></span>
          <span className="border-shadow shadow-3"></span>
          <span className="border-shadow shadow-4"></span>
        </div>
        <div className="actions-btn flex justify-between">
          <button className="cursor-pointer font-sm rounded-md">Like</button>  
          <button className="border px-4 py-1 bg-primary cursor-pointer font-sm rounded-md hover:bg-[#B5FF6D] hover:border-[#B5FF6D] hover:text-black">Buy</button>  
        </div>
      </div>
      <span className="border-shadow shadow-1"></span>
      <span className="border-shadow shadow-2"></span>
      <span className="border-shadow shadow-3"></span>
      <span className="border-shadow shadow-4"></span>
    </div>
  );
};

export default CourseItem;