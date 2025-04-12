import React from 'react';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

interface FooterProps {
  showScrollToTop?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showScrollToTop = true }) => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="w-full text-white py-6">
      <div className="container mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-5">
          <Link href="/wrap" className="hover:text-gray-300 transition-colors">
            Wrap
          </Link>
          <Link href="/course" className="hover:text-gray-300 transition-colors">
            Course
          </Link>
          <Link href="/about" className="hover:text-gray-300 transition-colors">
            About us
          </Link>
          <Link href="/account" className="hover:text-gray-300 transition-colors">
            Account
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-center text-gray-400 mb-5">
          <p>Copyright © 2024. All Rights Reserved by GaFi</p>
        </div>

        {/* Scroll to Top Button */}
        { showScrollToTop &&<div className="flex justify-center">
          <button 
            onClick={scrollToTop}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Scroll to top"
          >
            <ChevronUp size={20} />
          </button>
        </div>}
      </div>
    </footer>
  );
};

export default Footer;