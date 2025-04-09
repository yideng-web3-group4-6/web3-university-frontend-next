// src/components/Header/Header.tsx
"use client";

import { GraduationCap } from "lucide-react";
import NavItem from "./NavItem";
import { WagmiConnectButton } from "../WagmiConnect/WalletConnectButton";
import Avatar from "../common/Avatar";
import { LanguageSwitcher } from "../LanguageSwitcher";
import { useTranslation } from "@/i18n/client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

const Header = () => {
  const params = useParams();
  const lng = (params?.lng as string) || "zh";
  
  const { t } = useTranslation(lng, "translation");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // 服务端渲染时使用的静态内容
  const headerTitle = mounted ? t("header.title") : "前端Web3大学";

  // 为每个导航项准备默认的翻译内容
  const navItems = [
    { path: `/${lng}/`, label: mounted ? t("nav.home") : "首页", defaultLabel: "首页" },
    { path: `/${lng}/course`, label: mounted ? t("nav.course") : "课程", defaultLabel: "课程" },
    { path: `/${lng}/knowledge`, label: mounted ? t("nav.knowledge") : "知识", defaultLabel: "知识" },
    { path: `/${lng}/award`, label: mounted ? t("nav.award") : "奖励", defaultLabel: "奖励" }
  ];

  return (
    <header className="nav-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-cyber-blue float-animation" />
            <span className="ml-2 text-cyber-blue font-bold text-lg">
              {headerTitle}
            </span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center transition-colors duration-200">
              {navItems.map(item => (
                <NavItem key={item.path} path={item.path}>
                  {mounted ? item.label : item.defaultLabel}
                </NavItem>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* 使用已修复的 LanguageSwitcher */}
            <LanguageSwitcher lng={lng} />
            <WagmiConnectButton />
            <Avatar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;