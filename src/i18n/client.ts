"use client";

import i18next from "i18next";
import { useEffect } from "react";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "./settings";
import { languages, defaultNS } from "./config"; // Import languages and defaultNS

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  // Point to the correct public path
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)
    )
  )
  .init({
    ...getOptions(), // Get common options (like fallbackLng, supportedLngs)
    lng: undefined, // Let detect the language on client side
    detection: {
      order: ["path", "cookie", "htmlTag", "localStorage", "navigator"], // Detection order
    },
    // Preload languages on server side (check if window is undefined)
    preload: typeof window === "undefined" ? languages : [],
  });

export function useTranslation(lng: string, ns?: string | string[], options?: any) {
  const ret = useTranslationOrg(ns ?? defaultNS, options); // Use defaultNS if ns is not provided
  const { i18n } = ret;

  // Use useEffect to change language only after render and if needed
  useEffect(() => {
    if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng, i18n]); // Depend on lng and i18n instance

  // No longer need the server-side state management part here as LanguageDetector handles initial load
  // else {
  //   // On the server side or first render, use a state to trigger re-render when language loads
  //   const [activeLng, setActiveLng] = useState(i18n.resolvedLanguage)
  //   useEffect(() => {
  //     if (activeLng === i18n.resolvedLanguage) return
  //     setActiveLng(i18n.resolvedLanguage)
  //   }, [activeLng, i18n.resolvedLanguage])
  //   useEffect(() => {
  //     if (!lng || i18n.resolvedLanguage === lng) return
  //     i18n.changeLanguage(lng)
  //   }, [lng, i18n])
  // }
  return ret;
}
