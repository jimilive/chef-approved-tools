// Font optimization utilities for better performance

export const fontPreloadLinks = [
  {
    href: '/fonts/inter-latin-400-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  },
  {
    href: '/fonts/inter-latin-600-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  },
  {
    href: '/fonts/inter-latin-700-normal.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous'
  }
];

export const generateFontFace = (weight: number, filename: string) => `
@font-face {
  font-family: 'Inter';
  src: url('/fonts/${filename}') format('woff2');
  font-weight: ${weight};
  font-style: normal;
  font-display: swap;
  font-stretch: normal;
}`;

export const criticalFontCSS = `
${generateFontFace(400, 'inter-latin-400-normal.woff2')}
${generateFontFace(600, 'inter-latin-600-normal.woff2')}
${generateFontFace(700, 'inter-latin-700-normal.woff2')}

/* Font fallback to prevent layout shift */
.font-inter {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`;