import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, Rating, Typography } from '@mui/material';
import type { AxiosError } from 'axios';
import { PublicNavbar } from '@/components/PublicNavbar';
import { AppSnackbar } from '@/components/AppSnackbar';
import { useFeedbackSubmit } from '@/hooks';
import type { FeedbackFormData } from '@/types';
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
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FeedbackFormData>({
    defaultValues: { rating: undefined, name: '', email: '', feedback: '' },
  });
  const { mutate: submitFeedback, isPending } = useFeedbackSubmit();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (data: FeedbackFormData): void => {
    const payload: FeedbackFormData = {
      ...data,
      rating: data.rating || undefined,
      name: data.name || undefined,
      email: data.email || undefined,
    };
    submitFeedback(payload, {
      onSuccess: () => {
        reset();
        setSnackbar({
          open: true,
          message: 'Thank you for your feedback!',
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
          <HeroTitle variant="h1">Share Your Feedback</HeroTitle>
          <HeroSubtitle>Your feedback helps us make Sigide better for everyone</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="sm">
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>We&apos;d Love to Hear From You</FormTitle>
            <FormDescription>
              Whether it&apos;s a feature request, suggestion, or general feedback, we value your
              input.
            </FormDescription>

            <RatingSection>
              <RatingLabel>How would you rate your experience with Sigide?</RatingLabel>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    size="large"
                    value={field.value ?? null}
                    onChange={(_event: React.SyntheticEvent, value: number | null) =>
                      field.onChange(value ?? undefined)
                    }
                  />
                )}
              />
            </RatingSection>

            <TextField label="Your Name (optional)" fullWidth {...register('name')} />
            <TextField
              label="Email Address (optional)"
              type="email"
              fullWidth
              error={!!errors.email}
              helperText={errors.email?.message}
              {...register('email', {
                pattern: { value: /^\S+@\S+$/i, message: 'Invalid email format' },
              })}
            />

            <TextField
              label="Your Feedback"
              multiline
              rows={6}
              fullWidth
              required
              placeholder="Tell us what you think about Sigide, what features you'd like to see, or how we can improve..."
              error={!!errors.feedback}
              helperText={errors.feedback?.message}
              {...register('feedback', {
                required: 'Feedback is required',
                minLength: { value: 5, message: 'Feedback must be at least 5 characters' },
              })}
            />

            <Typography variant="body2" color="text.secondary">
              By submitting feedback, you agree that we may use your suggestions to improve our
              service.
            </Typography>

            <SubmitButton type="submit" variant="contained" size="large" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit Feedback'}
            </SubmitButton>
          </FormContainer>
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

export default FeedbackPage;
