"use client";

import React from "react";
import { cn } from "@/utils/common"; // 假设你有一个工具函数用于合并类名

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "info", label: "详细信息" },
    { id: "nfts", label: "NFT 资产" },
    { id: "courses", label: "购买的课程" },
    { id: "articles", label: "发表的文章" },
  ];

  return (
    <aside className="w-64 bg-dark-card shadow-neon h-screen fixed top-0 left-0 pt-20">
      <nav className="space-y-2 px-4">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "w-full text-left px-4 py-3 rounded-lg transition-colors",
              activeTab === tab.id
                ? "bg-cyber-blue/20 text-cyber-blue"
                : "text-gray-400 hover:bg-cyber-blue/10 hover:text-cyber-blue"
            )}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
