export const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Replace with your actual Measurement ID

/**
 * Initialize Google Analytics
 * @param {string} measurementId 
 */
export function initAnalytics(measurementId = GA_MEASUREMENT_ID) {
    if (!measurementId || measurementId === 'G-FPVWXLX99F') {
        console.warn('Analytics: Measurement ID is missing or default. Tracking disabled locally.');
        return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag; // Make globally available
    gtag('js', new Date());
    gtag('config', measurementId);

    console.log(`Analytics initialized with ID: ${measurementId}`);
}

/**
 * Track a custom event
 * @param {string} eventName 
 * @param {object} params 
 */
export function trackEvent(eventName, params = {}) {
    if (typeof window.gtag === 'function') {
        window.gtag('event', eventName, params);
        // console.debug(`[Analytics] Tracked: ${eventName}`, params);
    } else {
        // console.debug(`[Analytics (Mock)] Tracked: ${eventName}`, params);
    }
}
