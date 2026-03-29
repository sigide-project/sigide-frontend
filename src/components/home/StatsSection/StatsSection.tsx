import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { DURATION, EASE, SPRING, viewportOnce } from '@/utils/animations';
import { useStats } from '@/hooks';
import {
  StatsSection as StatsSectionContainer,
  StatsContainer,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
} from './StatsSection.styled';

const MotionStatsContainer = motion.create(StatsContainer);
const MotionStatCard = motion.create(StatCard);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: DURATION.slow,
      ease: EASE.smooth,
    },
  },
};

function formatCount(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    return k % 1 === 0 ? `${k}K+` : `${k.toFixed(1)}K+`;
  }
  return `${n}+`;
}

interface StatItem {
  icon: ReactNode;
  value: string;
  label: string;
}

export function StatsSection() {
  const { data } = useStats();

  const stats: StatItem[] = [
    {
      icon: <TrendingUpIcon />,
      value: data ? formatCount(data.totalItems) : '--',
      label: 'Items Posted',
    },
    {
      icon: <GroupsIcon />,
      value: data ? formatCount(data.totalUsers) : '--',
      label: 'Active Users',
    },
    { icon: <VerifiedUserIcon />, value: '100%', label: 'Secure' },
  ];

  return (
    <StatsSectionContainer>
      <MotionStatsContainer
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        {stats.map((stat, index) => (
          <MotionStatCard
            key={index}
            variants={itemVariants}
            whileHover={{ y: -8, transition: SPRING.gentle }}
            style={{ willChange: 'transform, opacity' }}
          >
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </MotionStatCard>
        ))}
      </MotionStatsContainer>
    </StatsSectionContainer>
  );
}

export default StatsSection;
