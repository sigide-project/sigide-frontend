import { Container, Typography } from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ReportIcon from '@mui/icons-material/Report';
import GroupsIcon from '@mui/icons-material/Groups';
import PaymentIcon from '@mui/icons-material/Payment';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  TipsGrid,
  TipCard,
  TipIcon,
  TipTitle,
  TipDescription,
} from './SafetyTipsPage.styled';

const safetyTips = [
  {
    icon: <LocationOnIcon />,
    title: 'Meet in Public Places',
    description:
      'Always arrange to meet in well-lit, public locations like coffee shops, shopping centers, or police station parking lots.',
  },
  {
    icon: <GroupsIcon />,
    title: 'Bring Someone Along',
    description:
      'When possible, bring a friend or family member with you when meeting to exchange items.',
  },
  {
    icon: <VerifiedUserIcon />,
    title: 'Verify Ownership',
    description:
      'Ask specific questions about the item that only the true owner would know. Request proof of purchase if available.',
  },
  {
    icon: <PaymentIcon />,
    title: 'Be Cautious with Rewards',
    description:
      'If offering or receiving a reward, use secure payment methods. Never share banking details or send money in advance.',
  },
  {
    icon: <SecurityIcon />,
    title: 'Protect Personal Info',
    description:
      'Use our in-app messaging. Avoid sharing your home address, phone number, or other personal details until necessary.',
  },
  {
    icon: <ReportIcon />,
    title: 'Report Suspicious Activity',
    description:
      'If something feels wrong, trust your instincts. Report suspicious users or listings to our support team immediately.',
  },
];

export function SafetyTipsPage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Safety Tips</HeroTitle>
          <HeroSubtitle>
            Your safety is our priority. Follow these guidelines for secure transactions.
          </HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="lg">
          <TipsGrid>
            {safetyTips.map((tip, index) => (
              <TipCard key={index}>
                <TipIcon>{tip.icon}</TipIcon>
                <TipTitle>{tip.title}</TipTitle>
                <TipDescription>{tip.description}</TipDescription>
              </TipCard>
            ))}
          </TipsGrid>

          <Typography
            variant="body1"
            color="text.secondary"
            textAlign="center"
            sx={{ mt: 8, maxWidth: 600, mx: 'auto' }}
          >
            Remember: If a situation ever feels unsafe, leave immediately and contact local
            authorities if necessary. Your safety is more important than any item.
          </Typography>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default SafetyTipsPage;
