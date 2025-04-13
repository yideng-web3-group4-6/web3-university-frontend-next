'use client';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  title?: string;
  subtitle?: string;
  status?: string;
}

export function LoadingScreen({
  title = '正在连接 Web3 宇宙...',
  subtitle = '请稍等，我们正在穿越区块链时空',
  status = '正在同步节点数据...',
}: LoadingScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50'
    >
      <motion.div
        className='relative w-24 h-24 mb-6'
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        <div className='absolute w-full h-full border-4 border-primary-500 rounded-full border-t-transparent'></div>
        <div className='absolute w-full h-full border-4 border-primary-300 rounded-full border-b-transparent'></div>
        <motion.div
          className='absolute inset-0 flex items-center justify-center'
          animate={{
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className='w-8 h-8 bg-primary-600 rounded-full'></div>
        </motion.div>
      </motion.div>

      <motion.div
        className='text-primary-200 text-xl font-medium mb-2'
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        {title}
      </motion.div>

      <motion.div className='flex space-x-2 mb-4'>
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className='w-2 h-2 bg-primary-400 rounded-full'
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>

      <motion.div
        className='text-primary-400 text-sm mb-6'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        {subtitle}
      </motion.div>

      <motion.div
        className='w-64 h-1 bg-primary-900 rounded-full overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className='w-1/3 h-full bg-primary-500 rounded-full'
          animate={{
            x: ['0%', '100%', '0%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>

      <motion.div
        className='mt-4 text-primary-500 text-xs'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {status}
      </motion.div>
    </motion.div>
  );
}
