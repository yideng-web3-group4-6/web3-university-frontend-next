import { fallbackLng, languages, defaultNS } from './config';

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    // debug: true, // Uncomment to enable debug output
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
} 