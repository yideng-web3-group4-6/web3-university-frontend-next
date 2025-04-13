import React from 'react';
import CourseCard from './CourseCard';
import { CartItem, Course, iconMap } from '@/types/course/courseType';
import { Code } from 'lucide-react';

interface CourseGridProps {
  courses: Course[];
  displayCount?: number;
  lng: string;
  onAddToCart: (course: CartItem) => void;
  randomize?: boolean;
}

const CourseGrid: React.FC<CourseGridProps> = ({
  courses,
  displayCount = courses.length,
  onAddToCart,
  lng,
  randomize = false,
}) => {
  const getDisplayCourses = () => {
    let displayCourses = courses;

    if (randomize) {
      displayCourses = [...courses];
      for (let i = displayCourses.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [displayCourses[i], displayCourses[j]] = [displayCourses[j], displayCourses[i]];
      }
    }

    return displayCourses.slice(0, Math.min(displayCount, displayCourses.length));
  };

  const displayCourses = getDisplayCourses();

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
      {displayCourses.map(course => {
        const IconComponent = iconMap[course.icon as keyof typeof iconMap] || (() => <Code />);
        return (
          <CourseCard
            key={course.id}
            id={course.id}
            icon={<IconComponent />}
            title={course.title}
            description={course.description}
            level={course.level}
            duration={course.duration}
            price={course.price}
            tags={course.tags}
            lng={lng}
            onAddToCart={({ title, price }) =>
              onAddToCart({ id: course.id, title, price, image: course.coverImage })
            }
          >
            {course.children}
          </CourseCard>
        );
      })}
    </div>
  );
};

export default CourseGrid;
