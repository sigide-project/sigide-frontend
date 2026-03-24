import { motion } from 'framer-motion';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ItemType } from '@/types';
import { DURATION, EASE, SPRING, floatVariants } from '@/utils/animations';
import {
  HeroSection,
  HeroContent,
  HeroTitle,
  HeroSubtitle,
  StatsRow,
  StatItem,
  StatValue,
  StatLabel,
  FloatingShape,
  QuickFilters,
  QuickFilterButton,
} from './FeedHero.styled';

const MotionHeroContent = motion.create(HeroContent);
const MotionQuickFilterButton = motion.create(QuickFilterButton);
const MotionStatItem = motion.create(StatItem);
const MotionFloatingShape = motion.create(FloatingShape);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

interface FeedHeroProps {
  type: ItemType | null;
  onTypeChange: (type: ItemType | null) => void;
  totalItems: number;
  lostCount: number;
  foundCount: number;
}

export function FeedHero({ type, onTypeChange, totalItems, lostCount, foundCount }: FeedHeroProps) {
  return (
    <HeroSection>
      <MotionFloatingShape
        size={80}
        top="15%"
        right="15%"
        delay={0}
        variants={floatVariants}
        initial="initial"
        animate="animate"
      />
      <MotionFloatingShape
        size={50}
        top="60%"
        right="25%"
        delay={1}
        animate={{
          y: [-8, 8, -8],
          rotate: [-3, 3, -3],
        }}
        transition={{
          duration: 5,
          ease: 'easeInOut',
          repeat: Infinity,
          delay: 0.5,
        }}
      />
      <MotionFloatingShape
        size={40}
        top="30%"
        right="5%"
        delay={2}
        variants={floatVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 1 }}
      />

      <MotionHeroContent variants={containerVariants} initial="hidden" animate="visible">
        <motion.div variants={itemVariants}>
          <HeroTitle variant="h1">
            Reunite with what <span>matters most</span>
          </HeroTitle>
        </motion.div>
        <motion.div variants={itemVariants}>
          <HeroSubtitle>
            Discover lost items in your area or help others find theirs. Every item has a story
            waiting to continue.
          </HeroSubtitle>
        </motion.div>

        <motion.div variants={itemVariants}>
          <QuickFilters>
            <MotionQuickFilterButton
              active={type === null}
              variant="all"
              onClick={() => onTypeChange(null)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING.gentle}
            >
              <AllInclusiveIcon />
              All Items
            </MotionQuickFilterButton>
            <MotionQuickFilterButton
              active={type === 'lost'}
              variant="lost"
              onClick={() => onTypeChange('lost')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING.gentle}
            >
              <ReportProblemIcon />
              Lost
            </MotionQuickFilterButton>
            <MotionQuickFilterButton
              active={type === 'found'}
              variant="found"
              onClick={() => onTypeChange('found')}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={SPRING.gentle}
            >
              <CheckCircleIcon />
              Found
            </MotionQuickFilterButton>
          </QuickFilters>
        </motion.div>

        <motion.div variants={itemVariants}>
          <StatsRow>
            <MotionStatItem whileHover={{ y: -4, transition: SPRING.gentle }}>
              <StatValue>{totalItems}</StatValue>
              <StatLabel>Total Items</StatLabel>
            </MotionStatItem>
            <MotionStatItem whileHover={{ y: -4, transition: SPRING.gentle }}>
              <StatValue>{lostCount}</StatValue>
              <StatLabel>Lost</StatLabel>
            </MotionStatItem>
            <MotionStatItem whileHover={{ y: -4, transition: SPRING.gentle }}>
              <StatValue>{foundCount}</StatValue>
              <StatLabel>Found</StatLabel>
            </MotionStatItem>
          </StatsRow>
        </motion.div>
      </MotionHeroContent>
    </HeroSection>
  );
}

export default FeedHero;
