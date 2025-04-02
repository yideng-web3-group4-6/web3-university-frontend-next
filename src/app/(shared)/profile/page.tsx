"use client";

import React, { useState } from "react";
import Sidebar from "@/components/Profile/Sidebar";
import UserInfoCard from "@/components/Profile/UserInfoCard";
import { useAccount, useBalance, useChainId } from "wagmi";
import Balance from "@/components/Profile/Balance";
// import NFTAssets from "../components/NFTAssets";
// import PurchasedCourses from "../components/PurchasedCourses";
// import PublishedArticles from "../components/PublishedArticles";
// import DependentAccountInfo from "../components/DependentAccountInfo";


const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("info");
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  const { data } = useBalance({ address: walletAddress, chainId });

  // 示例数据
  // const nfts = [
  //   { id: "1", name: "NFT #1", imageUrl: "https://example.com/nft1.jpg" },
  //   { id: "2", name: "NFT #2", imageUrl: "https://example.com/nft2.jpg" },
  // ];
  // const courses = [
  //   { id: "1", title: "Solidity 入门", instructor: "Alice" },
  //   { id: "2", title: "Web3 开发", instructor: "Bob" },
  // ];
  // const articles = [
  //   { id: "1", title: "如何开发智能合约", date: "2023-10-01" },
  //   { id: "2", title: "Web3 的未来", date: "2023-10-02" },
  // ];

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      {/* 侧边栏 */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 主内容区域 */}
      <div className="flex-1 ml-64 pt-5">
        <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-8">
          {/* 根据 activeTab 渲染内容 */}
          {walletAddress && (
            <>
              {activeTab === "info" && (
                <div className="space-y-8">
                  <UserInfoCard
                    username="User"
                    walletAddress={walletAddress}
                    avatarUrl={avatarUrl}
                    onAvatarChange={setAvatarUrl}
                  />
                  <Balance ethBalance={data?.value.toString() || ""} />

                  {/* <DependentAccountInfo isAuthorized={true} info="这是授权后可见的隐私信息" /> */}
                </div>
              )}
              {/* {activeTab === "nfts" && <NFTAssets nfts={nfts} />}
              {activeTab === "courses" && <PurchasedCourses courses={courses} />}
              {activeTab === "articles" && <PublishedArticles articles={articles} />} */}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
