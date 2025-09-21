import { useEffect } from 'react';

function upsertMeta(nameOrProp, key, value, isProperty) {
  if (!value) return;
  let selector;
  if (isProperty) selector = `meta[property="${key}"]`;
  else selector = `meta[name="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    if (isProperty) el.setAttribute('property', key); else el.setAttribute('name', key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

export default function Meta({ title, description, keywords, url, image, twitterHandle }) {
  useEffect(() => {
    const handle = twitterHandle || '@hhhdesignstudio';
    if (title) document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('name', 'keywords', keywords);
    upsertMeta('property', 'og:title', title, true);
    upsertMeta('property', 'og:description', description, true);
    upsertMeta('property', 'og:url', url, true);
    upsertMeta('property', 'og:image', image, true);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:site', handle);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);
    upsertMeta('name', 'twitter:image', image);

    // Add basic Organization JSON-LD if not already present
    const ldId = 'jsonld-organization';
    if (!document.getElementById(ldId)) {
      const script = document.createElement('script');
      script.id = ldId;
      script.type = 'application/ld+json';
      const org = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HHH Design Studio",
        "url": "https://hhhdesignstudio.com",
        "logo": "https://hhhdesignstudio.com/src/assets/logomm.png",
        "sameAs": [
          "https://www.facebook.com/hhhdesignstudio",
          "https://www.instagram.com/hhhdesignstudio",
          "https://twitter.com/hhhdesignstudio"
        ]
      };
      script.text = JSON.stringify(org);
      document.head.appendChild(script);
    }
  }, [title, description, keywords, url, image, twitterHandle]);

  return null;
}
