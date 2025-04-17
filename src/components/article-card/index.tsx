import { ArticleItem } from '@/types/other/artical';
import { Heart, Star } from 'lucide-react';

export const ArticleCard = ({
  article,
  onClick,
}: {
  article: ArticleItem;
  onClick: (article: ArticleItem) => void;
}) => {
  return (
    <div
      className='bg-gray-800 dark:bg-gray-900 rounded-xl border border-gray-700/50 dark:border-gray-600/50 shadow-[0_4px_12px_rgba(16,185,129,0.15)] dark:shadow-[0_4px_12px_rgba(16,185,129,0.15)] overflow-hidden transition-all duration-300 hover:shadow-[0_8px_16px_rgba(16,185,129,0.25)] hover:-translate-y-1 hover:bg-gray-700 dark:hover:bg-gray-800 h-[250px] flex flex-col'
      onClick={() => onClick(article)}
    >
      <div className='p-6 flex-1'>
        <h3 className='text-xl font-semibold text-white dark:text-white mb-2 line-clamp-2'>
          {article.title}
        </h3>
        <p className='text-gray-300 dark:text-gray-300 mb-4 line-clamp-3'>{article.content}</p>
      </div>
      <div className='p-6 pt-0 mt-auto'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center space-x-2'>
            <span className='text-sm text-gray-400 dark:text-gray-400'>
              作者: {article.author.nickname || '该大神隐藏了姓名'}
            </span>
          </div>
          <div className='flex items-center space-x-4'>
            <span className='text-sm text-gray-400 dark:text-gray-400 flex items-center'>
              <Heart size={16} className='inline mr-1 text-red-500 dark:text-red-500' />{' '}
              {article.likedBy.length}
            </span>
            <span className='text-sm text-gray-400 dark:text-gray-400 flex items-center'>
              <Star size={16} className='inline mr-1 text-yellow-500 dark:text-yellow-500' />{' '}
              {article.favoritedBy.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
