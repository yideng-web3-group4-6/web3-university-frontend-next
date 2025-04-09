// src/i18n/client.ts
"use client";

import i18next from "i18next";
import { useEffect, useState, useCallback } from "react";
import { initReactI18next, useTranslation as useTranslationOrg } from "react-i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getOptions } from "./settings";
import { languages, defaultNS } from "./config";

// 初始化 i18next 实例（只初始化一次）
const i18nInstance = i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) => import(`../../public/locales/${language}/${namespace}.json`)
    )
  );

// 确保只初始化一次
let initialized = false;

let initializedLanguages = new Set<string>();

async function initI18next() {
  if (!initialized) {
    await i18nInstance.init({
      ...getOptions(),
      lng: undefined,
      detection: {
        order: ["path", "cookie", "htmlTag", "localStorage", "navigator"],
      },
      preload: typeof window === "undefined" ? languages : [],
    });
    initialized = true;
  }
  return i18nInstance;
}

// 初始化一次全局实例
if (typeof window !== "undefined") {
  initI18next();
}

export function useTranslation(lng: string, ns?: string | string[], options?: object) {
  const ret = useTranslationOrg(ns ?? defaultNS, options);
  const { i18n } = ret;
  
  const [isReady, setIsReady] = useState(false);
  
  useEffect(() => {
    const initializeAndChangeLanguage = async () => {
      if (!initialized) {
        await initI18next();
      }
      
      if (!initializedLanguages.has(lng)) {
        await i18n.changeLanguage(lng);
        initializedLanguages.add(lng);
      }
      
      setIsReady(true);
    };
    
    initializeAndChangeLanguage();
  }, [lng, i18n]);
  
  // 自定义 t 函数，在客户端挂载前使用静态默认值
  const tWithFallback = useCallback(
    (key: string, options?: object) => {
      if (!isReady) {
        // 返回 key 的最后一部分作为默认值，通常是我们需要的字段名
        const parts = key.split('.');
        const fallback = parts[parts.length - 1];
        return fallback;
      }
      return ret.t(key, { ...options });
    },
    [isReady, ret.t]
  );
  
  return {
    ...ret,
    t: tWithFallback,
    isReady
  };
}