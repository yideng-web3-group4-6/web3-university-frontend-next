// src/i18n/client.ts
"use client";

import i18next from "i18next";
import { useEffect, useState } from "react";
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
  // 先获取翻译对象，确保这个 hook 在所有渲染路径中都是首先被调用的
  const ret = useTranslationOrg(ns ?? defaultNS, options);
  const { i18n } = ret;
  
  // 再使用 useState 和 useEffect
  const [isReady, setIsReady] = useState(false);
  
  // 确保 i18n 实例已初始化并加载了正确的语言
  useEffect(() => {
    if (!initialized) {
      initI18next().then(() => {
        if (i18n.resolvedLanguage !== lng) {
          i18n.changeLanguage(lng).then(() => setIsReady(true));
        } else {
          setIsReady(true);
        }
      });
    } else if (i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng).then(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, [lng, i18n]);
  
  return ret;
}