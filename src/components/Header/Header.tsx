'use client'; // Mark Header as a Client Component

import { GraduationCap } from "lucide-react";
import NavItem from "./NavItem"; // 引入客户端组件
import { WagmiConnectButton } from "../WagmiConnect/WalletConnectButton";
import { LanguageSwitcher } from "../LanguageSwitcher"; // Import LanguageSwitcher
import { useTranslation } from '@/i18n/client'; // Import useTranslation
import { useParams } from 'next/navigation'; // Import useParams

// Remove props interface, Header no longer needs lng prop
// interface HeaderProps {
//   lng: string;
// }

// Remove lng from component signature
const Header = () => {
  const params = useParams(); // Get params hook
  const lng = params?.lng as string || 'en'; // Extract lng, default to 'en' if needed
  const { t } = useTranslation(lng, 'translation'); // Use lng from params

  // Remove diagnostic logs
  // console.log(`[Header] lng prop: ${lng}`);
  // console.log(`[Header] i18n initialized: ${i18n.isInitialized}`);
  // console.log(`[Header] i18n resolved language: ${i18n.resolvedLanguage}`);
  // console.log(`[Header] t('nav.award'): ${t('nav.award')}`);
  // console.log(`[Header] t('header.title'): ${t('header.title')}`);

  return (
    <header className="nav-blur fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 text-cyber-blue float-animation" />
            <span className="ml-2 text-cyber-blue font-bold text-lg">{t('header.title')}</span>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center transition-colors duration-200">
              <NavItem path={`/${lng}/`}>{t('nav.home')}</NavItem>
              <NavItem path={`/${lng}/course`}>{t('nav.course')}</NavItem>
              <NavItem path={`/${lng}/knowledge`}>{t('nav.knowledge')}</NavItem>
              <NavItem path={`/${lng}/award`}>{t('nav.award')}</NavItem>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Pass lng obtained from params to LanguageSwitcher */}
            <LanguageSwitcher lng={lng} />
            <WagmiConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
