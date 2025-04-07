"use client";

import React, { ReactNode, useState } from "react";
import TabButton from "./TabItem";

interface Tab {
  id: string;
  label: string;
}

interface TabsProps<T> {
  tabs: Tab[];
  data: T[];
  renderItem: (item: T) => ReactNode;
  filterKey: keyof T; // 用于过滤的字段，例如 "type"
  emptyMessage: (tabId: string) => string; // 动态生成空状态消息
}

const Tabs = <T,>({ tabs, data, renderItem, filterKey, emptyMessage }: TabsProps<T>) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].id);

  // 根据 Tab 过滤数据
  const filteredData = data.filter((item) => {
    if (activeTab === "all") return true; // 如果是 "all" Tab，显示所有数据
    return item[filterKey] === activeTab;
  });

  return (
    <div>
      {/* Tab 切换 */}
      <div className="flex space-x-4 mb-6">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            label={tab.label}
            isActive={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
      </div>

      {/* 数据列表 */}
      {filteredData.length === 0 ? (
        <p className="text-gray-400">{emptyMessage(activeTab)}</p>
      ) : (
        <div className="space-y-4">{filteredData.map((item) => renderItem(item))}</div>
      )}
    </div>
  );
};

export default Tabs;
