/**
 * Reusable Motion Components
 * Pre-configured Framer Motion components with elegant animations
 */

import { ReactNode, forwardRef } from 'react';
import { motion, HTMLMotionProps, MotionProps } from 'framer-motion';
import {
  buttonHover,
  buttonTap,
  cardHover,
  cardTap,
  staggerItem,
  staggerItemScale,
  SPRING,
  DURATION,
  EASE,
} from '@/utils/animations';

// ============================================================================
// MOTION BUTTON
// ============================================================================

interface MotionButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
  variant?: 'default' | 'scale' | 'lift';
}

export const MotionButton = forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({ children, variant = 'default', ...props }, ref) => {
    const hoverAnimation =
      variant === 'lift' ? { y: -2, transition: { duration: DURATION.fast } } : buttonHover;

    return (
      <motion.button
        ref={ref}
        whileHover={hoverAnimation}
        whileTap={buttonTap}
        style={{ willChange: 'transform' }}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MotionButton.displayName = 'MotionButton';

// ============================================================================
// MOTION CARD
// ============================================================================

interface MotionCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hoverEffect?: boolean;
  tapEffect?: boolean;
}

export const MotionCard = forwardRef<HTMLDivElement, MotionCardProps>(
  ({ children, hoverEffect = true, tapEffect = true, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        whileHover={hoverEffect ? cardHover : undefined}
        whileTap={tapEffect ? cardTap : undefined}
        style={{ willChange: 'transform' }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

MotionCard.displayName = 'MotionCard';

// ============================================================================
// STAGGER CONTAINER
// ============================================================================

interface StaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
}

export function StaggerContainer({
  children,
  staggerDelay = 0.08,
  delayChildren = 0.1,
  ...props
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// STAGGER ITEM
// ============================================================================

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  variant?: 'fade' | 'scale';
}

export function StaggerItem({ children, variant = 'fade', ...props }: StaggerItemProps) {
  const variants = variant === 'scale' ? staggerItemScale : staggerItem;

  return (
    <motion.div variants={variants} style={{ willChange: 'opacity, transform' }} {...props}>
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCROLL REVEAL
// ============================================================================

interface ScrollRevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = DURATION.slower,
  once = true,
  ...props
}: ScrollRevealProps) {
  const directionOffset = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: -40 },
    right: { x: 40 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, margin: '-100px' }}
      transition={{
        duration,
        ease: EASE.smooth,
        delay,
      }}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCROLL STAGGER CONTAINER
// ============================================================================

interface ScrollStaggerContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  staggerDelay?: number;
  once?: boolean;
}

export function ScrollStaggerContainer({
  children,
  staggerDelay = 0.1,
  once = true,
  ...props
}: ScrollStaggerContainerProps) {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once, margin: '-50px' }}
      variants={{
        offscreen: {},
        onscreen: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// SCROLL STAGGER ITEM
// ============================================================================

interface ScrollStaggerItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export function ScrollStaggerItem({ children, ...props }: ScrollStaggerItemProps) {
  return (
    <motion.div
      variants={{
        offscreen: { opacity: 0, y: 30 },
        onscreen: {
          opacity: 1,
          y: 0,
          transition: {
            duration: DURATION.slow,
            ease: EASE.smooth,
          },
        },
      }}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// HOVER SCALE
// ============================================================================

interface HoverScaleProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  scale?: number;
}

export function HoverScale({ children, scale = 1.03, ...props }: HoverScaleProps) {
  return (
    <motion.div
      whileHover={{ scale, transition: { duration: DURATION.fast, ease: EASE.smooth } }}
      whileTap={{ scale: 0.98, transition: { duration: DURATION.instant } }}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// HOVER LIFT
// ============================================================================

interface HoverLiftProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  lift?: number;
}

export function HoverLift({ children, lift = -6, ...props }: HoverLiftProps) {
  return (
    <motion.div
      whileHover={{ y: lift, transition: SPRING.gentle }}
      whileTap={{ scale: 0.98, transition: { duration: DURATION.instant } }}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// ANIMATED PRESENCE WRAPPER
// ============================================================================

interface PresenceWrapperProps extends MotionProps {
  children: ReactNode;
  isVisible: boolean;
  mode?: 'fade' | 'scale' | 'slide';
}

export function PresenceWrapper({
  children,
  isVisible,
  mode = 'fade',
  ...props
}: PresenceWrapperProps) {
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    scale: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
    },
    slide: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -20 },
    },
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variants[mode]}
      transition={{ duration: DURATION.normal, ease: EASE.smooth }}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// FLOATING ANIMATION
// ============================================================================

interface FloatingProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  duration?: number;
  distance?: number;
}

export function Floating({ children, duration = 6, distance = 10, ...props }: FloatingProps) {
  return (
    <motion.div
      animate={{
        y: [-distance, distance, -distance],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      style={{ willChange: 'transform' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// PULSE ANIMATION
// ============================================================================

interface PulseProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  duration?: number;
}

export function Pulse({ children, duration = 4, ...props }: PulseProps) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.5, 0.8, 0.5],
      }}
      transition={{
        duration,
        ease: 'easeInOut',
        repeat: Infinity,
      }}
      style={{ willChange: 'transform, opacity' }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// TEXT REVEAL (Character by character)
// ============================================================================

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export function TextReveal({ text, className, delay = 0 }: TextRevealProps) {
  const words = text.split(' ');

  return (
    <motion.span
      initial="initial"
      animate="animate"
      className={className}
      style={{ display: 'inline-block' }}
    >
      {words.map((word, wordIndex) => (
        <span key={wordIndex} style={{ display: 'inline-block', marginRight: '0.25em' }}>
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={{
                initial: { opacity: 0, y: 20 },
                animate: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                    delay: delay + wordIndex * 0.1 + charIndex * 0.03,
                    ease: EASE.smooth,
                  },
                },
              }}
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}

export default {
  MotionButton,
  MotionCard,
  StaggerContainer,
  StaggerItem,
  ScrollReveal,
  ScrollStaggerContainer,
  ScrollStaggerItem,
  HoverScale,
  HoverLift,
  PresenceWrapper,
  Floating,
  Pulse,
  TextReveal,
};
