export const trackEvent = (eventName, eventProperties) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, eventProperties);
  }
};
