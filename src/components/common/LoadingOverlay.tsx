'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface LoadingOverlayProps {
  message?: string;
  isVisible: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message = 'Loading...', isVisible }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className='bg-white dark:bg-gray-800 rounded-lg p-8 flex flex-col items-center gap-4 shadow-2xl'
          >
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'linear',
              }}
              className='w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full'
            />
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-gray-700 dark:text-gray-200 text-lg font-medium'
            >
              {message}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingOverlay;
