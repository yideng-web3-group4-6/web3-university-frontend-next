import React from 'react';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';

interface FooterProps {
  showScrollToTop?: boolean;
}

const Footer: React.FC<FooterProps> = ({ showScrollToTop = true }) => {


  return (
    <footer className="w-full py-6">
      <div className="mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-5">
          <Link href="/wrap" className="text-white hover:text-white-300 transition-colors">
            Wrap
          </Link>
          <Link href="/course" className="text-white hover:text-white-300 transition-colors">
            Course
          </Link>
          <Link href="/about" className="text-white hover:text-white-300 transition-colors">
            About us
          </Link>
          <Link href="/account" className="text-white hover:text-white-300 transition-colors">
            Account
          </Link>
        </nav>

        {/* Copyright */}
        <div className="text-center text-gray-400 mb-5">
          <p>Copyright © 2025. All Rights Reserved by Web3 University</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;