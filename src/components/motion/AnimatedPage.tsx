/**
 * AnimatedPage Component
 * Wraps page content with smooth enter/exit animations for route transitions
 */

import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { pageVariants, pageSlideVariants, DURATION, EASE } from '@/utils/animations';

type AnimationType = 'fade' | 'slide' | 'none';

interface AnimatedPageProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  animation?: AnimationType;
  className?: string;
}

const getVariants = (animation: AnimationType) => {
  switch (animation) {
    case 'slide':
      return pageSlideVariants;
    case 'none':
      return {};
    case 'fade':
    default:
      return pageVariants;
  }
};

export function AnimatedPage({
  children,
  animation = 'fade',
  className,
  ...props
}: AnimatedPageProps) {
  const variants = getVariants(animation);

  if (animation === 'none') {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="initial"
      animate="enter"
      exit="exit"
      variants={variants}
      className={className}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedSection Component
 * For animating sections within a page with scroll-triggered animations
 */
interface AnimatedSectionProps extends Omit<HTMLMotionProps<'section'>, 'children'> {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className,
  delay = 0,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: DURATION.slower,
        ease: EASE.smooth,
        delay,
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.section>
  );
}

/**
 * FadeIn Component
 * Simple fade-in animation wrapper
 */
interface FadeInProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  duration = DURATION.slow,
  direction = 'up',
  className,
  ...props
}: FadeInProps) {
  const directionOffset = {
    up: { y: 24 },
    down: { y: -24 },
    left: { x: 24 },
    right: { x: -24 },
    none: {},
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        ease: EASE.smooth,
        delay,
      }}
      className={className}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default AnimatedPage;
