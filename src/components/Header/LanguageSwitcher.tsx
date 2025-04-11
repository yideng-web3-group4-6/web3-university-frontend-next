"use client";
import React, { useState, useRef, useEffect } from "react";
import { Globe } from "lucide-react";
import { AVAILABLE_LANGUAGES, LANGUAGE_COOKIE_KEY } from "@/i18n/config";
import { setCookie } from "cookies-next";
import { usePathname, useRouter } from "next/navigation";

// Function to change language
const setLanguage = (language: string) => {
  setCookie(LANGUAGE_COOKIE_KEY, language, {
    maxAge: 365 * 24 * 60 * 60, // 1 year
    path: '/',
  });
  window.location.reload();
};

interface LanguageSwitcherProps {
  dictionary: Record<string, any>;
  currentLanguage: string;
}

const LanguageSwitcher = ({ dictionary, currentLanguage }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  // Handle clicks outside of the dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleLanguageChange = (language: string) => {
    setLanguage(language);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center text-cyber-blue hover:text-opacity-80 transition-colors px-3 py-2 rounded-md"
        aria-expanded={isOpen}
      >
        <Globe className="h-5 w-5 mr-1" />
        <span>{dictionary.language.title}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-gray-900 rounded-md shadow-lg py-1 z-50">
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-800 transition-colors ${
                currentLanguage === lang ? "text-cyber-blue" : "text-white"
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              {dictionary.language[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher; 