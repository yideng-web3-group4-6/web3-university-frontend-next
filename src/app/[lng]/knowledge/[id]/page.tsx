"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import React from "react";
import { articles } from "../../../../mockData/articalData";
import { IArticle } from "@/components/article-card";
import { Heart, Star } from "lucide-react";

export default function ArticleDetail({ params }: { params: { id: string } }) {
  const router = useRouter();
  const unwrappedParams: any = React.use(params as any);
  const article = articles.find(
    (a) => a.id === parseInt(unwrappedParams.id)
  ) as unknown as IArticle;
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

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
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <button
        onClick={() => router.back()}
        className="text-cyber-blue hover:text-cyber-blue-light mb-8 inline-flex items-center"
      >
        ← 返回
      </button>

      <div className="bg-gray-800/50 dark:bg-gray-900/50 rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,255,170,0.05)] transition-all duration-300 border border-gray-700/30">
        <h1 className="text-4xl font-bold text-gray-100 dark:text-white mb-4">
          {article.title}
        </h1>

        <div className="flex items-center mb-6">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#00ffaa] to-[#00aaff] animate-gradient flex items-center justify-center shadow-[0_0_10px_rgba(0,255,170,0.5)] transition-all duration-300"></div>
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
            <div className="ml-3">
              <div className="text-base font-medium text-gray-400 dark:text-gray-300">
                {article.author.nickname}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4 ml-auto">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isLiked ? "text-red-500" : "text-gray-400"
              } hover:text-red-500`}
            >
              <Heart
                className="h-5 w-5"
                fill={isLiked ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              />
              <span>
                {isLiked ? article.likedBy.length + 1 : article.likedBy.length}
              </span>
            </button>
            <button
              onClick={handleFavorite}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                isFavorited ? "text-yellow-500" : "text-gray-400"
              } hover:text-yellow-500`}
            >
              <Star
                className="h-5 w-5"
                fill={isFavorited ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth={2}
              />
              <span>
                {isFavorited
                  ? article.favoritedBy.length + 1
                  : article.favoritedBy.length}
              </span>
            </button>
          </div>
        </div>

        <div className="prose prose-lg prose-cyan max-w-none dark:prose-invert prose-headings:text-gray-100 prose-p:text-gray-300 prose-strong:text-gray-200 prose-em:text-gray-300 min-h-[400px]">
          {/* <div className="mb-8">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div> */}
          <div className="text-gray-300 dark:text-gray-200 leading-relaxed whitespace-pre-line">
            {article.content}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700/30 dark:border-gray-700 text-sm text-gray-400 dark:text-gray-400">
          最后修改时间：{new Date(article.updatedAt).toLocaleString("zh-CN")}
        </div>
      </div>
    </div>
  );
}
