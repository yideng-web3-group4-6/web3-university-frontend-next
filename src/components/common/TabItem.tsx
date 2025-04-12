"use client";

import React from "react";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const TabButton: React.FC<TabButtonProps> = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-cyber-blue text-white"
          : "bg-dark-card text-gray-400 hover:bg-cyber-blue/20 hover:text-cyber-blue"
      }`}
    >
      {label}
    </button>
  );
};

export default TabButton;
