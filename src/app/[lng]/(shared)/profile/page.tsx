'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Profile/Sidebar';
import UserInfoCard from '@/components/Profile/UserInfoCard';
import { useAccount, useBalance, useChainId } from 'wagmi';
import Balance from '@/components/Profile/Balance';
import CoursesPannel from '@/components/Profile/CoursesPannel';
import ArticlesPannel from '@/components/Profile/ArticlesPannel';
import NFTAssets from '@/components/Profile/NFTAssets';
import TokenCard from '@/components/Profile/TokenCard';
import { useYiDengToken } from '@/hooks/useYiDengToken';
import { Container } from '@mui/material';

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('info');
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  const { data } = useBalance({ address: walletAddress, chainId });
  const { tokenBalance } = useYiDengToken();

  const nfts = [
    {
      id: '1',
      name: 'Digital Art #1',
      imageUrl:
        'http://gips0.baidu.com/it/u=3602773692,1512483864&fm=3028&app=3028&f=JPEG&fmt=auto?w=960&h=1280',
    },
    {
      id: '2',
      name: 'Pixel Art #2',
      imageUrl:
        'http://gips3.baidu.com/it/u=3419425165,837936650&fm=3028&app=3028&f=JPEG&fmt=auto?w=1024&h=1024',
    },
  ];
  const courses = [
    { id: '1', title: 'Solidity 入门', instructor: 'Alice', type: 'purchased' },
    { id: '2', title: 'Web3 开发', instructor: 'Bob', type: 'published' },
    { id: '3', title: '区块链基础', instructor: 'Charlie', type: 'purchased' },
  ];
  const articles = [
    { id: '1', title: '如何开发智能合约', date: '2023-10-01', type: 'published' },
    { id: '2', title: 'Web3 的未来', date: '2023-10-02', type: 'tipped' },
    { id: '3', title: '区块链入门', date: '2023-10-03', type: 'liked' },
    { id: '4', title: '智能合约开发', date: '2023-10-04', type: 'collected' },
  ];

  return (
    <Container>
      <div className='flex text-white pt-5'>
        {/* 侧边栏 */}
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 主内容区域 */}
        <div className='flex-1 '>
          <div className='max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8 space-y-8'>
            {/* 根据 activeTab 渲染内容 */}
            {walletAddress && (
              <>
                {activeTab === 'info' && (
                  <div className='space-y-8'>
                    <UserInfoCard
                      username='User'
                      walletAddress={walletAddress}
                      avatarUrl={avatarUrl}
                      onAvatarChange={setAvatarUrl}
                    />
                    <Balance ethBalance={data?.value.toString() || ''} />
                    <TokenCard token={(tokenBalance as string) || '0'} />
                  </div>
                )}
                {activeTab === 'nfts' && <NFTAssets nfts={nfts} />}
                {activeTab === 'courses' && <CoursesPannel courses={courses} />}
                {activeTab === 'articles' && <ArticlesPannel articles={articles} />}
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Profile;
