import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import {
  StatsSection as StatsSectionContainer,
  StatsContainer,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
} from './StatsSection.styled';

const stats = [
  { icon: <TrendingUpIcon />, value: '10K+', label: 'Items Posted' },
  { icon: <GroupsIcon />, value: '5K+', label: 'Active Users' },
  { icon: <EmojiEventsIcon />, value: '85%', label: 'Success Rate' },
  { icon: <VerifiedUserIcon />, value: '100%', label: 'Secure' },
];

export function StatsSection() {
  return (
    <StatsSectionContainer>
      <StatsContainer>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatIcon>{stat.icon}</StatIcon>
            <StatValue>{stat.value}</StatValue>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsContainer>
    </StatsSectionContainer>
  );
}

export default StatsSection;
