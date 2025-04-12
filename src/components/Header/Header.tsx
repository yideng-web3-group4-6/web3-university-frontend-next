"use client";
import { GraduationCap } from "lucide-react";
import NavItem from "./NavItem"; // 引入客户端组件
import { WagmiConnectButton } from "../WagmiConnect/WalletConnectButton";
import LanguageSwitcher from "./LanguageSwitcher";

interface HeaderProps {
  dictionary: Record<string, any>;
  currentLanguage: string;
}

const Header = ({ dictionary, currentLanguage }: HeaderProps) => {
  return (
    <header className="nav-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-cyber-blue float-animation" />
            <span className="ml-2 text-cyber-blue font-bold text-lg">{dictionary.header.title}</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center transition-colors duration-200">
              <NavItem path="/">{dictionary.header.home}</NavItem>
              <NavItem path="/course">{dictionary.header.courses}</NavItem>
              <NavItem path="/knowledge">{dictionary.header.knowledge}</NavItem>
              <NavItem path="/award">{dictionary.header.award}</NavItem>
            </div>
          </div>

          <div className="flex items-center">
            <LanguageSwitcher dictionary={dictionary} currentLanguage={currentLanguage} />
            <WagmiConnectButton dictionary={dictionary} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
