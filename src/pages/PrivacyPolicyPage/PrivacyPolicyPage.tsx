import { Container } from '@mui/material';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  Section,
  SectionTitle,
  Paragraph,
  List,
  ListItem,
  LastUpdated,
} from './PrivacyPolicyPage.styled';

export function PrivacyPolicyPage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Privacy Policy</HeroTitle>
          <HeroSubtitle>How we collect, use, and protect your information</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="md">
          <LastUpdated>Last updated: March 24, 2026</LastUpdated>

          <Section>
            <SectionTitle>1. Information We Collect</SectionTitle>
            <Paragraph>We collect information you provide directly to us, including:</Paragraph>
            <List>
              <ListItem>Account information (name, email, phone number)</ListItem>
              <ListItem>Profile information (avatar, bio)</ListItem>
              <ListItem>Item listings (descriptions, photos, locations)</ListItem>
              <ListItem>Communications with other users</ListItem>
              <ListItem>Feedback and correspondence with us</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>2. How We Use Your Information</SectionTitle>
            <Paragraph>We use the information we collect to:</Paragraph>
            <List>
              <ListItem>Provide, maintain, and improve our services</ListItem>
              <ListItem>Process transactions and send related information</ListItem>
              <ListItem>Send technical notices and support messages</ListItem>
              <ListItem>Respond to your comments and questions</ListItem>
              <ListItem>Detect, investigate, and prevent fraudulent activities</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. Information Sharing</SectionTitle>
            <Paragraph>
              We do not sell your personal information. We may share your information in the
              following situations:
            </Paragraph>
            <List>
              <ListItem>With your consent or at your direction</ListItem>
              <ListItem>With service providers who assist our operations</ListItem>
              <ListItem>To comply with legal obligations</ListItem>
              <ListItem>To protect our rights and prevent fraud</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>4. Data Security</SectionTitle>
            <Paragraph>
              We implement appropriate technical and organizational measures to protect your
              personal information against unauthorized access, alteration, disclosure, or
              destruction.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>5. Your Rights</SectionTitle>
            <Paragraph>You have the right to:</Paragraph>
            <List>
              <ListItem>Access your personal information</ListItem>
              <ListItem>Correct inaccurate data</ListItem>
              <ListItem>Request deletion of your data</ListItem>
              <ListItem>Object to processing of your data</ListItem>
              <ListItem>Export your data in a portable format</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>6. Contact Us</SectionTitle>
            <Paragraph>
              If you have questions about this Privacy Policy, please contact us at
              privacy@sigide.com.
            </Paragraph>
          </Section>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default PrivacyPolicyPage;
