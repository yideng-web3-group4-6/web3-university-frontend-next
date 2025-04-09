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
  // 确保 lng 在服务器和客户端上的确定方式相同
  const lng = (params?.lng as string) || "zh"; // 使用配置中的默认语言
  
  const { t } = useTranslation(lng, "translation");
  const [mounted, setMounted] = useState(false);

  // 标记组件已挂载，避免水合问题
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="nav-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-cyber-blue float-animation" />
            <span className="ml-2 text-cyber-blue font-bold text-lg">{t("header.title")}</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center transition-colors duration-200">
              <NavItem path={`/${lng}/`}>{mounted ? t("nav.home") : "首页"}</NavItem>
              <NavItem path={`/${lng}/course`}>{mounted ? t("nav.course") : "课程"}</NavItem>
              <NavItem path={`/${lng}/knowledge`}>{mounted ? t("nav.knowledge") : "知识"}</NavItem>
              <NavItem path={`/${lng}/award`}>{mounted ? t("nav.award") : "奖励"}</NavItem>
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