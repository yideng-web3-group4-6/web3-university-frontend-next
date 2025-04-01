import { GraduationCap } from "lucide-react";
import NavItem from "./NavItem"; // 引入客户端组件
import { WagmiConnectButton } from "../WagmiConnect/WalletConnectButton";

const Header = () => {
  return (
    <header className="nav-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-cyber-blue float-animation" />
            <span className="ml-2 text-cyber-blue font-bold text-lg">前端Web3大学</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center transition-colors duration-200">
              <NavItem path="/">首页</NavItem>
              <NavItem path="/course">课程</NavItem>
              <NavItem path="/knowledge">知识库</NavItem>
              <NavItem path="/award">奖励</NavItem>
            </div>
          </div>

          <div className="flex items-center">
            <WagmiConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
