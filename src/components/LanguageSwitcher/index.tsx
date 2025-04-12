"use client";

import { useRouter, usePathname } from "next/navigation";
import { useTranslation } from "@/i18n/client";
import { languages, cookieName } from "@/i18n/config";
import Cookies from "js-cookie";

export const LanguageSwitcher = ({ lng }: { lng: string }) => {
  const { t, i18n } = useTranslation(lng, "translation");
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLng: string) => {
    if (!pathname) return;

    // Check if the current language is already in the path
    const pathSegments = pathname.split("/");
    const currentLngInPath = languages.includes(pathSegments[1] as string) ? pathSegments[1] : null;

    let newPath;
    if (currentLngInPath) {
      // Replace the existing language segment
      newPath = pathname.replace(`/${currentLngInPath}`, `/${newLng}`);
    } else {
      // Prepend the language segment
      newPath = `/${newLng}${pathname}`
    }

    // Set cookie for persistence and language detection
    Cookies.set(cookieName, newLng, { expires: 365 });

    // First change the language
    i18n.changeLanguage(newLng)
    
    // Then push to the new path and refresh
    router.push(newPath)
    router.refresh()
  }

  // Ensure the component doesn't render until translations are ready
  // Note: A proper loading state might be needed for better UX
  if (i18n.resolvedLanguage !== lng) return null; // Temporarily comment out this line

  return (
    <div>
      <label htmlFor="language-select" style={{ marginRight: "8px" }}>
        {" "}
      </label>
      <select
        id="language-select"
        value={lng}
        onChange={(e) => handleLanguageChange(e.target.value)}
        style={{
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          color: "white",
          backgroundColor: "transparent",
        }}
      >
        {languages.map((l) => (
          <option key={l} value={l} style={{ color: "black", backgroundColor: "white" }}>
            {l === "en" ? "English" : t("language.chinese")}
          </option>
        ))}
      </select>
    </div>
  );
};

// Note: This basic client-side useTranslation might not reflect server-side changes immediately
// without a full page reload or more complex state management if used outside this specific switcher context.
// For general text display in client components, consider passing translations as props or using a dedicated i18n provider.
