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
} from './TermsOfServicePage.styled';

export function TermsOfServicePage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Terms of Service</HeroTitle>
          <HeroSubtitle>Please read these terms carefully before using Sigide</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="md">
          <LastUpdated>Last updated: March 24, 2026</LastUpdated>

          <Section>
            <SectionTitle>1. Acceptance of Terms</SectionTitle>
            <Paragraph>
              By accessing or using Sigide, you agree to be bound by these Terms of Service and all
              applicable laws and regulations. If you do not agree with any of these terms, you are
              prohibited from using this service.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>2. Use of Service</SectionTitle>
            <Paragraph>
              You agree to use Sigide only for lawful purposes and in accordance with these Terms.
              You agree not to:
            </Paragraph>
            <List>
              <ListItem>Post false or misleading information</ListItem>
              <ListItem>Impersonate any person or entity</ListItem>
              <ListItem>Harass, abuse, or harm other users</ListItem>
              <ListItem>Attempt to gain unauthorized access to our systems</ListItem>
              <ListItem>Use the service for any illegal activities</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>3. User Accounts</SectionTitle>
            <Paragraph>
              You are responsible for maintaining the confidentiality of your account credentials
              and for all activities that occur under your account. You must notify us immediately
              of any unauthorized use of your account.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>4. Content</SectionTitle>
            <Paragraph>
              You retain ownership of content you post on Sigide. By posting content, you grant us a
              non-exclusive, worldwide, royalty-free license to use, display, and distribute your
              content in connection with our services.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>5. Disclaimer</SectionTitle>
            <Paragraph>
              Sigide is provided "as is" without warranties of any kind. We do not guarantee that
              lost items will be found or that found items will be returned. We are not responsible
              for the actions of users or the accuracy of listings.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>6. Limitation of Liability</SectionTitle>
            <Paragraph>
              In no event shall Sigide be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of your use of the service.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>7. Changes to Terms</SectionTitle>
            <Paragraph>
              We reserve the right to modify these terms at any time. We will notify users of
              significant changes. Continued use of the service after changes constitutes acceptance
              of the new terms.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>8. Contact</SectionTitle>
            <Paragraph>
              For questions about these Terms, please contact us at legal@sigide.com.
            </Paragraph>
          </Section>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default TermsOfServicePage;
