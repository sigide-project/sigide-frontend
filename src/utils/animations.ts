/**
 * Framer Motion Animation Utilities
 * A collection of reusable, elegant animation variants inspired by Apple/Stripe design
 *
 * Design Principles:
 * - Subtle, smooth, and professional animations
 * - Natural motion with spring physics
 * - GPU-friendly transforms (no layout-heavy properties)
 * - Consistent timing and easing across the app
 */

import type { Variants, Transition, TargetAndTransition } from 'framer-motion';

// ============================================================================
// TIMING & EASING CONSTANTS
// ============================================================================

export const DURATION = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.7,
  page: 0.6,
} as const;

export const EASE = {
  smooth: [0.4, 0, 0.2, 1] as const,
  smoothIn: [0.4, 0, 1, 1] as const,
  smoothOut: [0, 0, 0.2, 1] as const,
  spring: [0.34, 1.56, 0.64, 1] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
} as const;

export const SPRING = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 } as const,
  soft: { type: 'spring', stiffness: 100, damping: 15 } as const,
  medium: { type: 'spring', stiffness: 200, damping: 20 } as const,
  snappy: { type: 'spring', stiffness: 300, damping: 25 } as const,
  bouncy: { type: 'spring', stiffness: 400, damping: 10 } as const,
} as const;

// ============================================================================
// PAGE TRANSITION VARIANTS
// ============================================================================

export const pageVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  enter: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.page,
      ease: EASE.smooth,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smoothIn,
    },
  },
};

export const pageSlideVariants: Variants = {
  initial: {
    opacity: 0,
    x: 30,
  },
  enter: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.page,
      ease: EASE.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: DURATION.normal,
      ease: EASE.smoothIn,
    },
  },
};

// ============================================================================
// FADE VARIANTS
// ============================================================================

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    y: -12,
    transition: { duration: DURATION.fast },
  },
};

export const fadeInDown: Variants = {
  initial: { opacity: 0, y: -24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: DURATION.fast },
  },
};

export const fadeInLeft: Variants = {
  initial: { opacity: 0, x: -24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    x: 24,
    transition: { duration: DURATION.fast },
  },
};

export const fadeInRight: Variants = {
  initial: { opacity: 0, x: 24 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    x: -24,
    transition: { duration: DURATION.fast },
  },
};

// ============================================================================
// SCALE VARIANTS
// ============================================================================

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: DURATION.fast },
  },
};

export const scaleInSpring: Variants = {
  initial: { opacity: 0, scale: 0.9 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: SPRING.gentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: DURATION.fast },
  },
};

// ============================================================================
// STAGGER CONTAINER VARIANTS
// ============================================================================

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

// Stagger children item
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE.smooth },
  },
};

export const staggerItemScale: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 10 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.gentle,
  },
};

// ============================================================================
// HOVER & TAP INTERACTIONS
// ============================================================================

export const buttonHover: TargetAndTransition = {
  scale: 1.03,
  transition: { duration: DURATION.fast, ease: EASE.smooth },
};

export const buttonTap: TargetAndTransition = {
  scale: 0.97,
  transition: { duration: DURATION.instant },
};

export const cardHover: TargetAndTransition = {
  y: -6,
  transition: SPRING.gentle,
};

export const cardTap: TargetAndTransition = {
  scale: 0.98,
  transition: { duration: DURATION.instant },
};

export const linkHover: TargetAndTransition = {
  opacity: 0.7,
  transition: { duration: DURATION.fast },
};

export const iconHover: TargetAndTransition = {
  scale: 1.1,
  rotate: 5,
  transition: SPRING.soft,
};

// ============================================================================
// SCROLL-TRIGGERED VARIANTS
// ============================================================================

export const scrollFadeIn: Variants = {
  offscreen: {
    opacity: 0,
    y: 40,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export const scrollFadeInLeft: Variants = {
  offscreen: {
    opacity: 0,
    x: -40,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export const scrollFadeInRight: Variants = {
  offscreen: {
    opacity: 0,
    x: 40,
  },
  onscreen: {
    opacity: 1,
    x: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export const scrollScaleIn: Variants = {
  offscreen: {
    opacity: 0,
    scale: 0.9,
  },
  onscreen: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export const scrollStaggerContainer: Variants = {
  offscreen: {},
  onscreen: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ============================================================================
// LAYOUT ANIMATION TRANSITIONS
// ============================================================================

export const layoutTransition: Transition = {
  type: 'spring',
  stiffness: 200,
  damping: 25,
};

export const layoutTransitionSmooth: Transition = {
  duration: DURATION.normal,
  ease: EASE.smooth,
};

// ============================================================================
// MODAL & OVERLAY VARIANTS
// ============================================================================

export const overlayVariants: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: DURATION.normal } },
  exit: { opacity: 0, transition: { duration: DURATION.fast } },
};

export const modalVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    y: 20,
  },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: SPRING.gentle,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: DURATION.fast },
  },
};

export const slideUpVariants: Variants = {
  initial: {
    opacity: 0,
    y: '100%',
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: SPRING.gentle,
  },
  exit: {
    opacity: 0,
    y: '100%',
    transition: { duration: DURATION.normal, ease: EASE.smoothIn },
  },
};

// ============================================================================
// NAVBAR VARIANTS
// ============================================================================

export const navbarVariants: Variants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const navItemVariants: Variants = {
  initial: { opacity: 0, y: -10 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
};

// ============================================================================
// LIST ITEM VARIANTS
// ============================================================================

export const listItemVariants: Variants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: DURATION.fast },
  },
};

// ============================================================================
// HERO SECTION VARIANTS
// ============================================================================

export const heroContainerVariants: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

export const heroBadgeVariants: Variants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const heroTitleVariants: Variants = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slower,
      ease: EASE.smooth,
    },
  },
};

export const heroSubtitleVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

export const heroCTAVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

// ============================================================================
// FLOATING ELEMENT VARIANTS
// ============================================================================

export const floatVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const pulseVariants: Variants = {
  initial: { scale: 1, opacity: 0.5 },
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.5, 0.8, 0.5],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Creates a custom stagger container with specified timing
 */
export const createStaggerContainer = (
  staggerChildren: number = 0.08,
  delayChildren: number = 0.1
): Variants => ({
  initial: {},
  animate: {
    transition: {
      staggerChildren,
      delayChildren,
    },
  },
});

/**
 * Creates a custom fade-in-up variant with specified offset and duration
 */
export const createFadeInUp = (
  yOffset: number = 24,
  duration: number = DURATION.slow
): Variants => ({
  initial: { opacity: 0, y: yOffset },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: EASE.smooth },
  },
  exit: {
    opacity: 0,
    y: -yOffset / 2,
    transition: { duration: DURATION.fast },
  },
});

/**
 * Creates a delayed animation variant
 */
export const withDelay = (variants: Variants, delay: number): Variants => {
  const result: Variants = { ...variants };
  if (result.animate && typeof result.animate === 'object') {
    result.animate = {
      ...result.animate,
      transition: {
        ...(result.animate as { transition?: Transition }).transition,
        delay,
      },
    };
  }
  return result;
};

/**
 * Viewport settings for scroll-triggered animations
 */
export const viewportOnce = { once: true, margin: '-100px' };
export const viewportAlways = { once: false, margin: '-50px' };

/**
 * Default animation props for common use cases
 */
export const defaultAnimationProps = {
  initial: 'initial',
  animate: 'animate',
  exit: 'exit',
} as const;

export const scrollAnimationProps = {
  initial: 'offscreen',
  whileInView: 'onscreen',
  viewport: viewportOnce,
} as const;
