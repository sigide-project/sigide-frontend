import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SecurityIcon from '@mui/icons-material/Security';
import GroupsIcon from '@mui/icons-material/Groups';
import SpeedIcon from '@mui/icons-material/Speed';
import {
  FeaturesSection as FeaturesSectionContainer,
  SectionHeader,
  SectionTitle,
  SectionSubtitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureDescription,
} from './FeaturesSection.styled';

const features = [
  {
    icon: <SearchIcon />,
    title: 'Smart Search',
    description:
      'Find items quickly with our intelligent search that matches descriptions, locations, and categories.',
    color: '#EDE9FE',
  },
  {
    icon: <LocationOnIcon />,
    title: 'Location-Based',
    description:
      'Discover lost and found items near you with precise geolocation and distance filtering.',
    color: '#D1FAE5',
  },
  {
    icon: <NotificationsActiveIcon />,
    title: 'Instant Alerts',
    description:
      'Get notified immediately when someone posts an item matching your lost belongings.',
    color: '#FEF3C7',
  },
  {
    icon: <SecurityIcon />,
    title: 'Secure Claims',
    description:
      'Verify ownership through our secure claim process to ensure items reach their rightful owners.',
    color: '#FEE2E2',
  },
  {
    icon: <GroupsIcon />,
    title: 'Community Driven',
    description:
      'Join a caring community dedicated to helping each other recover lost possessions.',
    color: '#DBEAFE',
  },
  {
    icon: <SpeedIcon />,
    title: 'Fast & Easy',
    description:
      'Post items in seconds with our streamlined interface. No complicated forms or processes.',
    color: '#FAE8FF',
  },
];

export function FeaturesSection() {
  return (
    <FeaturesSectionContainer>
      <SectionHeader>
        <SectionTitle variant="h2">
          Why Choose <span>Sigide</span>?
        </SectionTitle>
        <SectionSubtitle>
          Everything you need to find lost items or help others recover theirs, all in one powerful
          platform.
        </SectionSubtitle>
      </SectionHeader>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon className="feature-icon" color={feature.color}>
              {feature.icon}
            </FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeaturesGrid>
    </FeaturesSectionContainer>
  );
}

export default FeaturesSection;
