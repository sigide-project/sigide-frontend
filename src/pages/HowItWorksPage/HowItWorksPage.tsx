import { Box, Typography, Container } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import CelebrationIcon from '@mui/icons-material/Celebration';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  StepsSection,
  StepsGrid,
  StepCard,
  StepNumber,
  StepIcon,
  StepTitle,
  StepDescription,
} from './HowItWorksPage.styled';

const steps = [
  {
    number: '01',
    icon: <AddCircleOutlineIcon />,
    title: 'Report Your Item',
    description:
      'Lost something? Found an item? Create a detailed listing with photos, location, and description to help identify the item.',
  },
  {
    number: '02',
    icon: <SearchIcon />,
    title: 'Search & Match',
    description:
      'Browse through listings or let our smart matching system notify you when a potential match is found based on your criteria.',
  },
  {
    number: '03',
    icon: <ConnectWithoutContactIcon />,
    title: 'Connect Safely',
    description:
      'Once a match is found, connect with the other party through our secure messaging system to verify ownership.',
  },
  {
    number: '04',
    icon: <CelebrationIcon />,
    title: 'Reunite!',
    description:
      'Arrange a safe meetup to return the item. Celebrate the reunion and help build a stronger community!',
  },
];

export function HowItWorksPage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">How Sigide Works</HeroTitle>
          <HeroSubtitle>
            Reuniting people with their lost belongings in four simple steps
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <StepsSection>
        <Container maxWidth="lg">
          <StepsGrid>
            {steps.map((step, index) => (
              <StepCard key={index}>
                <StepNumber>{step.number}</StepNumber>
                <StepIcon>{step.icon}</StepIcon>
                <StepTitle>{step.title}</StepTitle>
                <StepDescription>{step.description}</StepDescription>
              </StepCard>
            ))}
          </StepsGrid>
        </Container>
      </StepsSection>

      <Box sx={{ py: 8, textAlign: 'center', bgcolor: 'background.paper' }}>
        <Container maxWidth="md">
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Ready to Get Started?
          </Typography>
          <Typography color="text.secondary">
            Join thousands of users who have successfully reunited with their belongings through
            Sigide.
          </Typography>
        </Container>
      </Box>
    </PageContainer>
  );
}

export default HowItWorksPage;
