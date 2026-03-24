import { Container, TextField, Rating, Typography } from '@mui/material';
import { PublicNavbar } from '@/components/PublicNavbar';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  FormContainer,
  FormTitle,
  FormDescription,
  RatingSection,
  RatingLabel,
  SubmitButton,
} from './FeedbackPage.styled';

export function FeedbackPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <PageContainer>
      <PublicNavbar />
      <HeroSection>
        <Container maxWidth="md">
          <HeroTitle variant="h1">Share Your Feedback</HeroTitle>
          <HeroSubtitle>Your feedback helps us make Sigide better for everyone</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="sm">
          <FormContainer onSubmit={handleSubmit}>
            <FormTitle>We'd Love to Hear From You</FormTitle>
            <FormDescription>
              Whether it's a feature request, suggestion, or general feedback, we value your input.
            </FormDescription>

            <RatingSection>
              <RatingLabel>How would you rate your experience with Sigide?</RatingLabel>
              <Rating size="large" defaultValue={0} />
            </RatingSection>

            <TextField label="Your Name (optional)" fullWidth />
            <TextField label="Email Address (optional)" type="email" fullWidth />

            <TextField
              label="Your Feedback"
              multiline
              rows={6}
              fullWidth
              required
              placeholder="Tell us what you think about Sigide, what features you'd like to see, or how we can improve..."
            />

            <Typography variant="body2" color="text.secondary">
              By submitting feedback, you agree that we may use your suggestions to improve our
              service.
            </Typography>

            <SubmitButton type="submit" variant="contained" size="large">
              Submit Feedback
            </SubmitButton>
          </FormContainer>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default FeedbackPage;
