"use client";

import React from "react";
import Tabs from "@/components/common/Tabs";

interface Article {
  id: string;
  title: string;
  date: string;
  type: "published" | "tipped" | "liked" | "collected" | string;
}

interface ArticlesPannelProps {
  articles: Article[];
}

const ArticlesPannel: React.FC<ArticlesPannelProps> = ({ articles }) => {
  const tabs = [
    { id: "published", label: "发布" },
    { id: "tipped", label: "打赏" },
    { id: "liked", label: "点赞" },
    { id: "collected", label: "收藏" },
  ];

  const emptyMessage = (tabId: string) =>
    `暂无${
      tabId === "published" ? "发布的" : tabId === "tipped" ? "被打赏的" : tabId === "liked" ? "被点赞的" : "被收藏的"
    }文章`;

  const renderArticle = (article: Article) => (
    <div key={article.id} className="bg-dark-card p-4 rounded-xl shadow-neon flex items-center justify-between">
      <div>
        <h3 className="text-lg font-semibold text-white">{article.title}</h3>
        <p className="text-gray-400">发布日期：{article.date}</p>
      </div>
      <button className="bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-blue/80">查看文章</button>
    </div>
  );

  return (
    <div>
      <Tabs tabs={tabs} data={articles} renderItem={renderArticle} filterKey="type" emptyMessage={emptyMessage} />
    </div>
  );
};

export default ArticlesPannel;
