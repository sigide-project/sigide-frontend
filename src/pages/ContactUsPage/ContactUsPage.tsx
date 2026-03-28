import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Container, TextField } from '@mui/material';
import type { AxiosError } from 'axios';
import EmailIcon from '@mui/icons-material/Email';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { PublicNavbar } from '@/components/PublicNavbar';
import { AppSnackbar } from '@/components/AppSnackbar';
import { useContactSubmit } from '@/hooks';
import type { ContactFormData } from '@/types';
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
  InfoLink,
  SubmitButton,
} from './ContactUsPage.styled';

export function ContactUsPage() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();
  const { mutate: submitContact, isPending } = useContactSubmit();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (data: ContactFormData): void => {
    submitContact(data, {
      onSuccess: () => {
        reset();
        setSnackbar({
          open: true,
          message: "Your message has been sent. We'll get back to you soon.",
          severity: 'success',
        });
      },
      onError: (err: unknown) => {
        const message =
          (err as AxiosError<{ error: string }>)?.response?.data?.error ??
          'Something went wrong. Please try again.';
        setSnackbar({ open: true, message, severity: 'error' });
      },
    });
  };

  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Contact Us</HeroTitle>
          <HeroSubtitle>Have questions or feedback? We&apos;d love to hear from you.</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="lg">
          <ContactGrid>
            <ContactForm onSubmit={handleSubmit(onSubmit)}>
              <FormTitle>Send us a message</FormTitle>
              <TextField
                label="Your Name"
                fullWidth
                required
                error={!!errors.name}
                helperText={errors.name?.message}
                {...register('name', { required: 'Name is required' })}
              />
              <TextField
                label="Email Address"
                type="email"
                fullWidth
                required
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register('email', {
                  required: 'Email is required',
                  pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
                })}
              />
              <TextField
                label="Subject"
                fullWidth
                required
                error={!!errors.subject}
                helperText={errors.subject?.message}
                {...register('subject', { required: 'Subject is required' })}
              />
              <TextField
                label="Message"
                multiline
                rows={5}
                fullWidth
                required
                error={!!errors.message}
                helperText={errors.message?.message}
                {...register('message', {
                  required: 'Message is required',
                  minLength: { value: 10, message: 'Message must be at least 10 characters' },
                })}
              />
              <SubmitButton type="submit" variant="contained" size="large" disabled={isPending}>
                {isPending ? 'Sending...' : 'Send Message'}
              </SubmitButton>
            </ContactForm>

            <ContactInfo>
              <InfoCard>
                <InfoIcon>
                  <EmailIcon />
                </InfoIcon>
                <InfoTitle>Email</InfoTitle>
                <InfoText>
                  <InfoLink href="mailto:hemanththanal@gmail.com">hemanththanal@gmail.com</InfoLink>
                </InfoText>
              </InfoCard>

              <InfoCard>
                <InfoIcon>
                  <PhoneIcon />
                </InfoIcon>
                <InfoTitle>Phone</InfoTitle>
                <InfoText>
                  <InfoLink href="tel:+918281627763">+91 8281627763</InfoLink>
                </InfoText>
              </InfoCard>

              <InfoCard>
                <InfoIcon>
                  <LocationOnIcon />
                </InfoIcon>
                <InfoTitle>Address</InfoTitle>
                <InfoText>
                  <InfoLink
                    href="https://maps.google.com/?q=B1,+Brindavan+Sapthagiri+NR+Layout,+Bellandur,+Bangalore,+Karnataka,+India+560103"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    B1, Brindavan Sapthagiri NR Layout, Bellandur
                    <br />
                    Bangalore, Karnataka, India 560103
                  </InfoLink>
                </InfoText>
              </InfoCard>
            </ContactInfo>
          </ContactGrid>
        </Container>
      </ContentSection>

      <AppSnackbar
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      />
    </PageContainer>
  );
}

export default ContactUsPage;
