import React, { useState } from 'react';

export default function RewardButton({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // 控制弹窗

  return (
    <>
      {/* 悬浮打赏按钮 */}
      <button
        className={`
          fixed bottom-12 right-16 z-50
          w-12 h-12 rounded-full
          bg-dark-bg text-cyber-blue
          flex items-center justify-center
          text-xl font-bold
          shadow-neon hover:shadow-[0_0_20px_rgba(0,243,255,0.3)]
          transform hover:scale-110 hover:rotate-12
          transition-all duration-300
          animate-float
          overflow-hidden
          neon-border
        `}
        onClick={() => setIsOpen(true)}
      >
        <span className='relative z-10 neon-text'>赏</span>
        <div
          className='
            absolute inset-0
            animate-shine
            bg-gradient-to-r from-transparent via-[rgba(0,243,255,0.5)] to-transparent
            opacity-60
          '
        />
      </button>

      {/* 转账弹窗 */}
      {isOpen && (
        <div
          className='
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black bg-opacity-50
            nav-blur
          '
        >
          <div
            className='
              bg-dark-card
              rounded-md
              p-6
              w-full max-w-md
              border border-[rgba(0,243,255,0.1)]
              shadow-neon
              relative
              animate-accordion-down
              nav-blur
            '
            onClick={e => e.stopPropagation()}
          >
            <button
              className='
                absolute top-4 right-4
                text-white hover:text-primary-500
                text-xl font-bold
              '
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            <h2 className='text-xl font-bold text-primary-200 mb-4'>打赏-YD-代币</h2>
            {children}
          </div>
        </div>
      )}
    </>
  );
}
