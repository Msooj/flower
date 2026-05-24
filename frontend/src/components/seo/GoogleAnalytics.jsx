import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Loads GA4 when VITE_GA_MEASUREMENT_ID is set in .env */
const GoogleAnalytics = () => {
  const location = useLocation();
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId || typeof window === 'undefined') return;

    if (!window.gtag) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function gtag() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', measurementId, { send_page_view: false });
    }

    window.gtag('event', 'page_view', {
      page_path: location.pathname + location.search,
      page_title: document.title,
    });
  }, [location.pathname, location.search, measurementId]);

  return null;
};

export default GoogleAnalytics;
