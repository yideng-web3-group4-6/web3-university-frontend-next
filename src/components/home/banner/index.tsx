'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { FileText } from 'lucide-react';
import { FloatingPaper } from '@/components/ui/floating-paper';
import { RoboAnimation } from '@/components/ui/robo-animation';
import Swap from '@/components/home/swap';
import Link from 'next/link';

const Hero = () => {
  return (
    <div className='relative min-h-[calc(100vh-76px)] flex mt-10'>
      {/* Floating papers background */}
      <div className='absolute inset-0 overflow-hidden'>
        <FloatingPaper count={10} />
      </div>

      <div className='container mx-auto px-6 relative z-10'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12'>
          {/* Text Content */}
          <div className='w-full lg:w-1/2 text-center lg:text-left'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className='text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6'>
                Start Your Web3 Journey
                <span className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
                  {' '}
                  Future of Blockchain
                </span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className='text-gray-400 text-xl mb-8 max-w-2xl mx-auto lg:mx-0'
            >
              Master blockchain technology from scratch. Learn smart contracts, DeFi, NFTs, and
              become a Web3 professional.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className='flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4'
            >
              <Button
                size='lg'
                className='text-white px-8 bg-primary-500 hover:bg-primary-600'
                asChild
              >
                <Link href='/courses'>
                  <FileText className='mr-2 h-5 w-5' />
                  Explore Courses
                </Link>
              </Button>
            </motion.div>
          </div>
          {/* Swap Component */}
          <div className='w-full lg:w-1/2'>
            <Swap />
          </div>
        </div>
      </div>

      {/* Animated robot */}
      <div className='absolute bottom-0 right-0 w-48 h-96'>
        <RoboAnimation />
      </div>
    </div>
  );
};

export default Hero;
