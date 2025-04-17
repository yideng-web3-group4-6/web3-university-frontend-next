'use client';
import { useRouter } from 'next/navigation';
import { ArticleCard } from '@/components/article-card';
import { useEffect, useState } from 'react';
import { getArticleList } from '@/apis/article';
import { ArticleItem } from '@/types/other/artical';

export default function Knowledge() {
  const router = useRouter();
  const [list, setList] = useState<ArticleItem[]>([]);

  useEffect(() => {
    const handleGetArticleList = async () => {
      try {
        const res = await getArticleList({ page: 1, pageSize: 10 });
        setList(res?.list);
      } catch (error) {
        console.log(error);
      }
    };
    handleGetArticleList();
  }, []);

  const handleClickArticle = (article: ArticleItem) => {
    router.push(`/knowledge/${article.id}`);
  };

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='flex justify-between items-center mb-8 mt-6'>
        <h1 className='text-2xl font-bold text-white'>知识库</h1>
        <button
          onClick={() => router.push('/knowledge/edit')}
          className='cursor-pointer bg-dark-card text-cyber-blue px-6 py-2 rounded-lg text-sm font-medium flex items-center hover:shadow-neon transition-all duration-300 border border-cyber-blue/30'
        >
          <span>新增文章</span>
        </button>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {list.map((article, index) => (
          <ArticleCard key={index} article={article} onClick={handleClickArticle} />
        ))}
      </div>
    </div>
  );
}
