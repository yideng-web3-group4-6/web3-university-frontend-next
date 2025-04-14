import React from 'react';

const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-center">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-white">No courses found</h3>
        <p className="mt-1 text-sm text-gray-400">
          Try changing your filter criteria or check back later for new courses.
        </p>
      </div>
    </div>
  );
};

export default EmptyState; 