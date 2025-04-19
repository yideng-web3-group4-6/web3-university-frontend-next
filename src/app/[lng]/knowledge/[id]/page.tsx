'use client';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { ArticleItem } from '@/types/other/artical';
import { getArticleDetail } from '@/apis/article';
import RewardButton from '@/components/common/RewardBtn';

export default function ArticleDetail() {
  const router = useRouter();
  const params = useParams();
  const [article, setArticle] = useState<Partial<ArticleItem>>({});
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  useEffect(() => {
    const handleGetDetail = async () => {
      if (params.id) {
        const res = await getArticleDetail(params.id as string);
        setArticle(res);
      }
    };
    handleGetDetail();
  }, []);

  if (!article) {
    return <div>文章未找到</div>;
  }

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  return (
    <div className='container mx-auto px-4 py-8 max-w-4xl'>
      <button
        onClick={() => router.back()}
        className='text-cyber-blue hover:text-cyber-blue-light mb-8 inline-flex items-center'
      >
        ← 返回
      </button>
      <RewardButton />

      <div className='bg-gray-800/50 dark:bg-gray-900/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,255,170,0.05)] transition-all duration-300 border border-gray-700/30'>
        <h1 className='text-4xl font-bold text-gray-100 dark:text-white mb-4'>{article.title}</h1>

        <div className='flex items-center mb-6'>
          <div className='flex items-center'>
            <div className='w-4 h-4 rounded-full bg-gradient-to-br from-[#00ffaa] to-[#00aaff] animate-gradient flex items-center justify-center shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all duration-300'></div>
            <style jsx>{`
              @keyframes gradient {
                0% {
                  background-position: 0% 50%;
                }
                50% {
                  background-position: 100% 50%;
                }
                100% {
                  background-position: 0% 50%;
                }
              }
              .animate-gradient {
                background-size: 200% 200%;
                animation: gradient 5s ease infinite;
              }
            `}</style>
            <div className='ml-3'>
              <div className='text-base font-medium text-gray-400 dark:text-gray-300'>
                {article?.author?.nickname}
              </div>
            </div>
          </div>

          <div className='flex items-center space-x-4 ml-auto'>
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked ? 'text-red-500' : 'text-gray-400'
              } hover:text-red-500`}
            >
              <Heart
                className='h-5 w-5'
                fill={isLiked ? 'currentColor' : 'none'}
                stroke='currentColor'
                strokeWidth={2}
              />
              <span>{article?.likedBy?.length}</span>
            </button>
            <button
              onClick={handleFavorite}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isFavorited ? 'text-yellow-500' : 'text-gray-400'
              } hover:text-yellow-500`}
            >
              <Star
                className='h-5 w-5'
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke='currentColor'
                strokeWidth={2}
              />
              <span>{article?.favoritedBy?.length}</span>
            </button>
          </div>
        </div>

        <div className='prose prose-lg prose-cyan max-w-none dark:prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-em:text-gray-300 min-h-[400px]'>
          <div className='text-gray-300 dark:text-gray-200 leading-relaxed whitespace-pre-line'>
            {article.content}
          </div>
        </div>

        <div className='mt-8 pt-6 border-t border-gray-700/30 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-400'>
          最后修改时间：{new Date(article?.updatedAt || 0).toLocaleString('zh-CN')}
        </div>
      </div>
    </div>
  );
}
