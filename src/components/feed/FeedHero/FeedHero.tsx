import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import type { ItemType } from '@/types';
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
      <FloatingShape size={80} top="15%" right="15%" delay={0} />
      <FloatingShape size={50} top="60%" right="25%" delay={1} />
      <FloatingShape size={40} top="30%" right="5%" delay={2} />

      <HeroContent>
        <HeroTitle variant="h1">
          Reunite with what <span>matters most</span>
        </HeroTitle>
        <HeroSubtitle>
          Discover lost items in your area or help others find theirs. Every item has a story
          waiting to continue.
        </HeroSubtitle>

        <QuickFilters>
          <QuickFilterButton
            active={type === null}
            variant="all"
            onClick={() => onTypeChange(null)}
          >
            <AllInclusiveIcon />
            All Items
          </QuickFilterButton>
          <QuickFilterButton
            active={type === 'lost'}
            variant="lost"
            onClick={() => onTypeChange('lost')}
          >
            <ReportProblemIcon />
            Lost
          </QuickFilterButton>
          <QuickFilterButton
            active={type === 'found'}
            variant="found"
            onClick={() => onTypeChange('found')}
          >
            <CheckCircleIcon />
            Found
          </QuickFilterButton>
        </QuickFilters>

        <StatsRow>
          <StatItem>
            <StatValue>{totalItems}</StatValue>
            <StatLabel>Total Items</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{lostCount}</StatValue>
            <StatLabel>Lost</StatLabel>
          </StatItem>
          <StatItem>
            <StatValue>{foundCount}</StatValue>
            <StatLabel>Found</StatLabel>
          </StatItem>
        </StatsRow>
      </HeroContent>
    </HeroSection>
  );
}

export default FeedHero;
