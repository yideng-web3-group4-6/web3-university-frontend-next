import React from 'react';
import { Play, Lock } from 'lucide-react';
import { Course } from '@/types/course/courseType';
import { useTranslation } from '@/i18n/client';
import { Chapter } from '@/types/course/courseType';

interface CourseChaptersProps {
  lng: string;
  course: Course;
  isPurchased: boolean;
  handlePlayVideo: (videoUrl: string, locked: boolean) => void;
}

const CourseChapters: React.FC<CourseChaptersProps> = ({
  lng,
  course,
  isPurchased,
  handlePlayVideo,
}) => {
  const { t } = useTranslation(lng);

  const handleLockedClick = () => {
    if (!isPurchased) {
      alert(t('courses.purchaseRequired'));
    }
  };

  return (
    <div className='max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8'>
      <h2 className='text-2xl font-bold text-cyber-blue mb-8'>{t('courses.chapters')}</h2>
      {course.children.length === 0 ? (
        <p className='text-center text-gray-400 py-8'>{t('course.notFound')}</p>
      ) : (
        <div className='space-y-4'>
          {course.children.map((chapter: Chapter) => (
            <div
              key={chapter.id}
              className='feature-card p-6 rounded-xl hover:shadow-neon transition-all duration-300 flex justify-between items-center'
            >
              <div>
                <h3 className='text-lg font-semibold text-cyber-blue'>{chapter.title}</h3>
                <p className='text-sm text-gray-400'>
                  {chapter.locked && !isPurchased
                    ? t('courses.chapterLocked')
                    : t('courses.chapterUnlocked')}
                </p>
              </div>
              <button
                onClick={() =>
                  chapter.locked && !isPurchased
                    ? handleLockedClick()
                    : handlePlayVideo(chapter.url, chapter.locked ?? false)
                }
                className='bg-transparent border-2 border-cyber-blue text-cyber-blue p-2 rounded-lg flex items-center hover:bg-gradient-to-r from-cyber-blue/20 to-cyber-purple/20 hover:text-white hover:border-cyber-purple transition-all duration-300'
              >
                {chapter.locked && !isPurchased ? (
                  <Lock className='h-4 w-4 mr-2' />
                ) : (
                  <Play className='h-4 w-4 mr-2' />
                )}
                {chapter.locked && !isPurchased ? t('courses.unlockView') : t('courses.play')}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseChapters;
