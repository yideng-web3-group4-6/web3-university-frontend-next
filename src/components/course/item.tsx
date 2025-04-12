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
          <a href="project-details.html">
            <img src="/static/course/course-1.png" alt="Explore-Image" />
          </a>
          <div className="project-auother">
            <h2 className="pb-5 pt-5">
              <a href="project-details.html" className="text-bolder font-md">Cyber City Clan</a>
            </h2>
            <h5 className="desc">PRICE (GAC) = 0.59 BUSD</h5>
          </div>
        </div>
        <div className="course-content">
          <div className="course-header d-flex justify-content-between">
            <div className="title">
              <h4>
                01<span>d</span> 14<span>h</span> 05<span>m</span>
              </h4>
            </div>
            <div className="course-icon">
              <img
                // src="assets/images/project/project-single-image.png"
                alt="Project-Image"
              />
            </div>
          </div>
          <div className="course-info">
            <ul className="course-listing">
              <li>
                Type <span>xxx</span>
              </li>
              <li>
                Price <span>900.00 BUSD</span>
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