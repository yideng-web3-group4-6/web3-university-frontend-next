// src/components/LanguageSwitcher/index.tsx
"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { languages, cookieName } from "@/i18n/config";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

export const LanguageSwitcher = ({ lng }: { lng: string }) => {
  // 确保 Hook 的调用顺序在不同渲染路径中保持一致
  const { t, i18n } = useTranslation(lng, "translation");
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // 仅在客户端运行，避免水合不匹配
  useEffect(() => {
    setMounted(true);
  }, []);

  // 使用 useCallback 包装处理函数，确保它只在依赖项变化时才重新创建
  const handleLanguageChange = (newLng: string) => {
    if (!pathname) return;

    // 检查当前路径是否已包含语言标识
    const pathSegments = pathname.split("/");
    const currentLngInPath = languages.includes(pathSegments[1] as string) ? pathSegments[1] : null;

    let newPath;
    if (currentLngInPath) {
      // 替换现有语言段
      newPath = pathname.replace(`/${currentLngInPath}`, `/${newLng}`);
    } else {
      // 在路径前添加语言段
      newPath = `/${newLng}${pathname}`;
    }

    // 设置 cookie 以便持久化和语言检测
    Cookies.set(cookieName, newLng, { expires: 365 });

    // 先更改语言
    i18n.changeLanguage(newLng);
    
    // 再导航到新路径
    router.push(newPath);
  };

  // 解决水合问题：在客户端挂载前，保持占位符大小一致
  if (!mounted) {
    return (
      <div style={{ width: "80px", height: "30px", display: "inline-block" }}></div>
    );
  }

  return (
    <div>
      <select
        id="language-select"
        value={lng}
        onChange={(e) => handleLanguageChange(e.target.value)}
        className="p-1.5 rounded border border-gray-500 text-white bg-transparent"
        style={{
          minWidth: "80px"
        }}
      >
        {languages.map((l) => (
          <option 
            key={l} 
            value={l} 
            style={{ color: "black", backgroundColor: "white" }}
          >
            {l === "en" ? "English" : "中文"}
          </option>
        ))}
      </select>
    </div>
  );
};