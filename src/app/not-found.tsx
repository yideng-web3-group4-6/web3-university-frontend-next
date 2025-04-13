'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useTranslation } from '@/i18n/client';
import { languages } from '@/i18n/config';

const floatingEmojis = ['🌟', '💫', '✨', '🌙', '🚀', '👾', '🎮', '🎯'];

export default function NotFound() {
  const pathname = usePathname();
  // 从路径中提取语言代码
  const lng = pathname?.split('/')[1] || 'zh';
  const validLng = languages.includes(lng as string) ? lng : 'zh';

  const { t } = useTranslation(validLng, 'translation');

  const tips = t('error.notFound.tips', { returnObjects: true }) as string[];
  const randomTip = tips[Math.floor(Math.random() * tips.length)];

  return (
    <div className='min-h-[calc(100vh-76px)] flex flex-col items-center justify-center gap-8 px-4 bg-gray-900 text-white relative overflow-hidden'>
      {/* 漂浮的表情符号 */}
      {floatingEmojis.map((emoji, index) => (
        <motion.div
          key={index}
          className='absolute text-2xl pointer-events-none'
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 40 - 20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: index * 0.2,
          }}
        >
          {emoji}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='relative'
      >
        <motion.div
          className='text-[12rem] font-bold text-gray-800'
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, -5, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        >
          404
        </motion.div>
        <motion.div
          className='absolute inset-0 text-[12rem] font-bold text-purple-500/20 select-none'
          style={{ zIndex: -1 }}
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: 0.2,
          }}
        >
          404
        </motion.div>
      </motion.div>

      <motion.div
        className='text-center space-y-4'
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className='text-2xl font-semibold text-purple-400'>{t('error.notFound.title')}</h2>
        <p className='text-gray-400 max-w-md'>{t('error.notFound.description')}</p>
        <p className='text-purple-300 text-sm italic'>{t('error.notFound.subDescription')}</p>
        <motion.p
          className='text-gray-500 text-sm mt-4'
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {randomTip}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
      >
        <Link
          href={`/${validLng}`}
          className='group relative px-8 py-3 bg-purple-600 rounded-lg overflow-hidden transition-all duration-300 hover:bg-purple-700 flex items-center gap-2'
        >
          <motion.span
            className='absolute inset-0 bg-purple-400/20'
            initial={{ x: '-100%' }}
            whileHover={{ x: '100%' }}
            transition={{ duration: 0.5 }}
          />
          <span className='relative'>{t('error.notFound.backHome')}</span>
          <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1, repeat: Infinity }}>
            👉
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
