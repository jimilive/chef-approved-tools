// Empty polyfills file for modern browsers
// This replaces Next.js default polyfills to reduce bundle size

// Export both CommonJS and ES modules for compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = function polyfillsModule() {
    // No polyfills needed for modern browsers
  };
} else if (typeof exports !== 'undefined') {
  exports.default = function polyfillsModule() {
    // No polyfills needed for modern browsers
  };
}

// Also provide default export for ES modules
export default function polyfillsModule() {
  // No polyfills needed for modern browsers
}