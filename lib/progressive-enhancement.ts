// Progressive Enhancement utilities for better UX

export class ProgressiveEnhancement {
  private static instance: ProgressiveEnhancement;
  private observers: Map<string, IntersectionObserver> = new Map();

  public static getInstance(): ProgressiveEnhancement {
    if (!ProgressiveEnhancement.instance) {
      ProgressiveEnhancement.instance = new ProgressiveEnhancement();
    }
    return ProgressiveEnhancement.instance;
  }

  // Enhanced hover effects with reduced motion support
  public enableHoverEffects(selector: string) {
    if (typeof window === 'undefined') return;

    const elements = document.querySelectorAll(selector);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    elements.forEach((element) => {
      if (!prefersReducedMotion) {
        element.classList.add('transition-transform', 'hover:scale-105');
      } else {
        element.classList.add('hover:opacity-90');
      }
    });
  }

  // Progressive image loading with intersection observer
  public enableProgressiveImages() {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const imageObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;

            // Load high-quality version
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              imageObserver.unobserve(img);
            }
          }
        });
      },
      {
        rootMargin: '50px 0px',
        threshold: 0.1
      }
    );

    this.observers.set('images', imageObserver);

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Smooth scroll behavior with fallback
  public enableSmoothScroll() {
    if (typeof window === 'undefined') return;

    // Check if smooth scroll is supported
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    } else {
      // Polyfill for older browsers
      this.polyfillSmoothScroll();
    }
  }

  private polyfillSmoothScroll() {
    document.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]') as HTMLAnchorElement;

      if (link) {
        e.preventDefault();
        const targetId = link.getAttribute('href')?.substring(1);
        const targetElement = targetId ? document.getElementById(targetId) : null;

        if (targetElement) {
          this.smoothScrollTo(targetElement.offsetTop);
        }
      }
    });
  }

  private smoothScrollTo(to: number, duration = 500) {
    const start = window.pageYOffset;
    const change = to - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      // Easing function
      const ease = progress < 0.5
        ? 2 * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      window.scrollTo(0, start + (change * ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }

  // Enhanced form validation
  public enhanceFormValidation(formSelector: string) {
    if (typeof window === 'undefined') return;

    const forms = document.querySelectorAll(formSelector);

    forms.forEach((form) => {
      const inputs = form.querySelectorAll('input, textarea, select');

      inputs.forEach((input) => {
        // Real-time validation
        input.addEventListener('blur', () => {
          this.validateField(input as HTMLInputElement);
        });

        // Clear errors on input
        input.addEventListener('input', () => {
          this.clearFieldError(input as HTMLInputElement);
        });
      });

      // Form submission
      form.addEventListener('submit', (e) => {
        let isValid = true;

        inputs.forEach((input) => {
          if (!this.validateField(input as HTMLInputElement)) {
            isValid = false;
          }
        });

        if (!isValid) {
          e.preventDefault();
        }
      });
    });
  }

  private validateField(input: HTMLInputElement): boolean {
    const value = input.value.trim();
    const type = input.type;
    const required = input.required;

    // Clear previous errors
    this.clearFieldError(input);

    // Required validation
    if (required && !value) {
      this.showFieldError(input, 'This field is required');
      return false;
    }

    // Email validation
    if (type === 'email' && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        this.showFieldError(input, 'Please enter a valid email address');
        return false;
      }
    }

    return true;
  }

  private showFieldError(input: HTMLInputElement, message: string) {
    input.classList.add('error');
    input.setAttribute('aria-invalid', 'true');

    // Remove existing error message
    const existingError = input.parentNode?.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }

    // Add error message
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message text-red-500 text-sm mt-1';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');

    input.parentNode?.appendChild(errorElement);
  }

  private clearFieldError(input: HTMLInputElement) {
    input.classList.remove('error');
    input.removeAttribute('aria-invalid');

    const errorElement = input.parentNode?.querySelector('.error-message');
    if (errorElement) {
      errorElement.remove();
    }
  }

  // Keyboard navigation enhancement
  public enhanceKeyboardNavigation() {
    if (typeof window === 'undefined') return;

    // Skip to main content
    this.addSkipLink();

    // Focus management for modals
    this.manageFocusTrapping();

    // Enhanced keyboard navigation for custom components
    this.enhanceCustomComponents();
  }

  private addSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded z-50';

    document.body.insertBefore(skipLink, document.body.firstChild);
  }

  private manageFocusTrapping() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        // Close modals on escape
        const openModal = document.querySelector('[data-modal="open"]');
        if (openModal) {
          this.closeModal(openModal);
        }
      }
    });
  }

  private closeModal(modal: Element) {
    modal.setAttribute('data-modal', 'closed');

    // Return focus to trigger element
    const trigger = document.querySelector('[data-modal-trigger]') as HTMLElement;
    if (trigger) {
      trigger.focus();
    }
  }

  private enhanceCustomComponents() {
    // Add ARIA attributes and keyboard support to custom components
    const customButtons = document.querySelectorAll('[role="button"]:not(button)');

    customButtons.forEach((element) => {
      element.setAttribute('tabindex', '0');

      element.addEventListener('keydown', (e) => {
        const keyboardEvent = e as KeyboardEvent;
        if (keyboardEvent.key === 'Enter' || keyboardEvent.key === ' ') {
          keyboardEvent.preventDefault();
          (element as HTMLElement).click();
        }
      });
    });
  }

  // Performance-aware animations
  public enablePerformantAnimations() {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Disable animations for users who prefer reduced motion
      document.documentElement.style.setProperty('--animation-duration', '0ms');
      return;
    }

    // Enable CSS containment for better performance
    const animatedElements = document.querySelectorAll('.animate');
    animatedElements.forEach((element) => {
      (element as HTMLElement).style.contain = 'layout style paint';
    });
  }

  // Cleanup method
  public cleanup() {
    this.observers.forEach((observer) => {
      observer.disconnect();
    });
    this.observers.clear();
  }
}

// Export singleton instance
export const progressiveEnhancement = ProgressiveEnhancement.getInstance();