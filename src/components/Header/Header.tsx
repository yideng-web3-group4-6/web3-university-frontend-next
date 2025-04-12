'use client'; // Mark Header as a Client Component

import { Bot, Menu } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { WagmiConnectButton } from '../WagmiConnect/WalletConnectButton';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/i18n/client';

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  const params = useParams();
  const lng = (params?.lng as string) || 'en';
  return (
    <Link href={`/${lng}${href}`} className='text-white/80 hover:text-white transition-colors'>
      {children}
    </Link>
  );
};

const Header = () => {
  const params = useParams();
  const lng = (params?.lng as string) || 'en';
  const { t } = useTranslation(lng, 'translation');

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className='flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10'
    >
      <Link href={`/${lng}`} className='flex items-center space-x-2'>
        <Bot className='w-8 h-8 text-purple-500' />
        <span className='text-white font-medium text-xl'>Web3Learn</span>
      </Link>

      <div className='hidden md:flex items-center space-x-8'>
        <NavLink href='/course'>{t('nav.course')}</NavLink>
        <NavLink href='/knowledge'>{t('nav.knowledge')}</NavLink>
        <NavLink href='/award'>{t('nav.award')}</NavLink>
        <NavLink href='/article'>{t('nav.article')}</NavLink>
      </div>

      <div className='hidden md:flex items-center space-x-4'>
        <WagmiConnectButton />
      </div>

      <Button variant='ghost' size='icon' className='md:hidden text-white'>
        <Menu className='w-6 h-6' />
      </Button>
    </motion.nav>
  );
};

export default Header;
