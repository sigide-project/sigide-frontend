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
  CookieTable,
  TableHeader,
  TableRow,
  TableCell,
} from './CookiePolicyPage.styled';

export function CookiePolicyPage() {
  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Cookie Policy</HeroTitle>
          <HeroSubtitle>Understanding how we use cookies and similar technologies</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="md">
          <LastUpdated>Last updated: March 24, 2026</LastUpdated>

          <Section>
            <SectionTitle>What Are Cookies?</SectionTitle>
            <Paragraph>
              Cookies are small text files that are stored on your device when you visit a website.
              They help the website remember your preferences and improve your experience.
            </Paragraph>
          </Section>

          <Section>
            <SectionTitle>Types of Cookies We Use</SectionTitle>
            <CookieTable>
              <TableHeader>
                <TableCell>Type</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Duration</TableCell>
              </TableHeader>
              <TableRow>
                <TableCell>Essential</TableCell>
                <TableCell>Required for basic site functionality</TableCell>
                <TableCell>Session</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Authentication</TableCell>
                <TableCell>Keep you logged in</TableCell>
                <TableCell>30 days</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Preferences</TableCell>
                <TableCell>Remember your settings</TableCell>
                <TableCell>1 year</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Analytics</TableCell>
                <TableCell>Understand how you use our site</TableCell>
                <TableCell>2 years</TableCell>
              </TableRow>
            </CookieTable>
          </Section>

          <Section>
            <SectionTitle>How We Use Cookies</SectionTitle>
            <List>
              <ListItem>To keep you signed in to your account</ListItem>
              <ListItem>To remember your preferences and settings</ListItem>
              <ListItem>To understand how you interact with our service</ListItem>
              <ListItem>To improve our website and services</ListItem>
              <ListItem>To provide personalized content and features</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Managing Cookies</SectionTitle>
            <Paragraph>
              You can control and manage cookies through your browser settings. Please note that
              disabling certain cookies may affect the functionality of our website.
            </Paragraph>
            <Paragraph>Most browsers allow you to:</Paragraph>
            <List>
              <ListItem>View what cookies are stored and delete them individually</ListItem>
              <ListItem>Block third-party cookies</ListItem>
              <ListItem>Block cookies from specific sites</ListItem>
              <ListItem>Block all cookies</ListItem>
              <ListItem>Delete all cookies when you close your browser</ListItem>
            </List>
          </Section>

          <Section>
            <SectionTitle>Contact Us</SectionTitle>
            <Paragraph>
              If you have questions about our use of cookies, please contact us at
              privacy@sigide.com.
            </Paragraph>
          </Section>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default CookiePolicyPage;
