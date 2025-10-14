// Global type declarations for Chef Approved Tools

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

export {};
