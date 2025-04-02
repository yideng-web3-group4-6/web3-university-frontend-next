"use client";

import React, { useState } from "react";
import Avatar from "@/components/common/Avatar";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { formatWalletAddress } from "@/utils/fromat";

interface UserInfoCardProps {
  username: string;
  walletAddress: string;
  avatarUrl?: string;
  onAvatarChange: (newAvatarUrl: string) => void;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ username, walletAddress, avatarUrl, onAvatarChange }) => {
  const [newAvatarUrl, setNewAvatarUrl] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const handleAvatarUpdate = () => {
    if (newAvatarUrl) {
      onAvatarChange(newAvatarUrl);
      setIsDialogOpen(false);
      setNewAvatarUrl("");
    }
  };

  return (
    <div className="bg-dark-card p-6 rounded-xl shadow-neon flex items-center space-x-6">
      <Avatar imageUrl={avatarUrl} size={80} altText={username} />
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-cyber-blue">{username}</h2>
        <p className="text-gray-400 mt-1">钱包地址：{formatWalletAddress(walletAddress)}</p>
      </div>
      <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Trigger asChild>
          <button className="bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-blue/80 transition-colors">
            修改头像
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-dark-card p-6 rounded-lg shadow-neon max-w-md w-full">
            <Dialog.Title className="text-xl font-bold text-cyber-blue">修改头像</Dialog.Title>
            <Dialog.Description className="text-gray-400 mt-2">输入新的头像 URL</Dialog.Description>
            <input
              type="text"
              value={newAvatarUrl}
              onChange={(e) => setNewAvatarUrl(e.target.value)}
              placeholder="请输入头像 URL"
              className="w-full mt-4 bg-gray-800 text-white px-4 py-2 rounded-lg border border-cyber-blue/30 focus:outline-none focus:ring-2 focus:ring-cyber-blue/50"
            />
            <div className="mt-6 flex justify-end space-x-2">
              <Dialog.Close asChild>
                <button className="px-4 py-2 text-gray-400 hover:text-white">取消</button>
              </Dialog.Close>
              <button
                onClick={handleAvatarUpdate}
                className="bg-cyber-blue text-white px-4 py-2 rounded-lg hover:bg-cyber-blue/80"
              >
                确认
              </button>
            </div>
            <Dialog.Close asChild>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white">
                <Cross2Icon />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default UserInfoCard;
