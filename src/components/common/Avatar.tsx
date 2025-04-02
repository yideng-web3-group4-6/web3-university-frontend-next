"use client"; // 声明这是一个客户端组件

import React from "react";
import { useRouter } from "next/navigation"; // 使用 Next.js 的 useRouter 进行页面跳转

// 定义 Avatar 组件的 props 接口
interface AvatarProps {
  imageUrl?: string; // 用户头像的 URL，可选
  size?: number; // 头像大小（像素），可选，默认为 40
  altText?: string; // 头像的 alt 文本，可选，默认为 "User Avatar"
}

const Avatar: React.FC<AvatarProps> = ({ imageUrl, size = 40, altText = "User Avatar" }) => {
  const router = useRouter();

  // 点击头像时跳转到个人信息页面
  const handleClick = () => {
    router.push("/profile");
  };

  return (
    <div className="cursor-pointer transition-transform duration-200 hover:scale-110" onClick={handleClick}>
      {imageUrl ? (
        <img src={imageUrl} alt={altText} className="rounded-full object-cover" style={{ width: size, height: size }} />
      ) : (
        <div
          className="flex items-center justify-center rounded-full bg-cyber-blue text-white font-semibold"
          style={{ width: size, height: size }}
        >
          {altText.slice(0, 1)}
        </div>
      )}
    </div>
  );
};

export default Avatar;
