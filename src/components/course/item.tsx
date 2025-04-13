import React from 'react';

import './style.css';

interface CourseItemProps {}
const CourseItem: React.FC<CourseItemProps> = ({}) => {
  return (
    <div className='course-item'>
      <div className='course-info'>
        <img src='/static/course/course-1.png' alt='Course Image' />
        <div className='course-author'>
          <h2>Discover Endless Possibilities</h2>
          <p>Where Creativity Meets Innovation. Embark on a Journey of Limitless Exploration.</p>
        </div>
      </div>
      <div className='course-content'>
        <ul className='course-listing'>
          <li className='flex justify-between'>
            <span>Category</span>
            <span>Digital Art</span>
          </li>
          <li className='flex justify-between'>
            <span>Price</span>
            <span>900.00 BUSD</span>
          </li>
        </ul>
      </div>
      <div className='actions-btn'>
        <button>Like</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
};

export default CourseItem;
