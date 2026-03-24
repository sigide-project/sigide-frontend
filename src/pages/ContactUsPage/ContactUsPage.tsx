import { Container, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  ContactGrid,
  ContactForm,
  FormTitle,
  ContactInfo,
  InfoCard,
  InfoIcon,
  InfoTitle,
  InfoText,
  SubmitButton,
} from './ContactUsPage.styled';

export function ContactUsPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Contact Us</HeroTitle>
          <HeroSubtitle>Have questions or feedback? We'd love to hear from you.</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="lg">
          <ContactGrid>
            <ContactForm onSubmit={handleSubmit}>
              <FormTitle>Send us a message</FormTitle>
              <TextField label="Your Name" fullWidth required />
              <TextField label="Email Address" type="email" fullWidth required />
              <TextField label="Subject" fullWidth required />
              <TextField label="Message" multiline rows={5} fullWidth required />
              <SubmitButton type="submit" variant="contained" size="large">
                Send Message
              </SubmitButton>
            </ContactForm>

            <ContactInfo>
              <InfoCard>
                <InfoIcon>
                  <EmailIcon />
                </InfoIcon>
                <InfoTitle>Email</InfoTitle>
                <InfoText>support@sigide.com</InfoText>
              </InfoCard>

              <InfoCard>
                <InfoIcon>
                  <PhoneIcon />
                </InfoIcon>
                <InfoTitle>Phone</InfoTitle>
                <InfoText>+91 1234 567 890</InfoText>
              </InfoCard>

              <InfoCard>
                <InfoIcon>
                  <LocationOnIcon />
                </InfoIcon>
                <InfoTitle>Address</InfoTitle>
                <InfoText>
                  123 Tech Park, Bangalore
                  <br />
                  Karnataka, India 560001
                </InfoText>
              </InfoCard>
            </ContactInfo>
          </ContactGrid>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default ContactUsPage;
