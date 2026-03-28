import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Container, TextField, MenuItem } from '@mui/material';
import type { AxiosError } from 'axios';
import { PublicNavbar } from '@/components/PublicNavbar';
import { AppSnackbar } from '@/components/AppSnackbar';
import { useReportSubmit } from '@/hooks';
import type { ReportFormData } from '@/types';
import {
  PageContainer,
  HeroSection,
  HeroTitle,
  HeroSubtitle,
  ContentSection,
  FormContainer,
  FormTitle,
  FormDescription,
  SubmitButton,
} from './ReportIssuePage.styled';

const issueTypes = [
  'Bug or Technical Issue',
  'Suspicious User/Listing',
  'Inappropriate Content',
  'Scam or Fraud',
  'Account Issue',
  'Other',
];

export function ReportIssuePage() {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<ReportFormData>({
    defaultValues: { issue_type: '' },
  });
  const { mutate: submitReport, isPending } = useReportSubmit();

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: 'success' | 'error';
  }>({ open: false, message: '', severity: 'success' });

  const onSubmit = (data: ReportFormData): void => {
    const payload: ReportFormData = {
      ...data,
      listing_url: data.listing_url || undefined,
    };
    submitReport(payload, {
      onSuccess: () => {
        reset();
        setSnackbar({
          open: true,
          message: "Your report has been submitted. We'll investigate shortly.",
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
          <HeroTitle variant="h1">Report an Issue</HeroTitle>
          <HeroSubtitle>Help us improve Sigide by reporting problems or concerns</HeroSubtitle>
        </Container>
      </HeroSection>

      <ContentSection>
        <Container maxWidth="sm">
          <FormContainer onSubmit={handleSubmit(onSubmit)}>
            <FormTitle>Submit a Report</FormTitle>
            <FormDescription>
              Please provide as much detail as possible so we can investigate and resolve the issue
              quickly.
            </FormDescription>

            <Controller
              name="issue_type"
              control={control}
              rules={{ required: 'Issue type is required' }}
              render={({ field }) => (
                <TextField
                  select
                  label="Issue Type"
                  fullWidth
                  required
                  error={!!errors.issue_type}
                  helperText={errors.issue_type?.message}
                  value={field.value}
                  onChange={(e) => field.onChange(e.target.value)}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                >
                  {issueTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <TextField
              label="Your Email"
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
              label="Related Listing URL (if applicable)"
              fullWidth
              placeholder="https://sigide.com/item/..."
              error={!!errors.listing_url}
              helperText={
                errors.listing_url?.message ?? 'Enter a valid URL starting with http:// or https://'
              }
              {...register('listing_url', {
                validate: (value) => {
                  if (!value) return true;
                  try {
                    const url = new URL(value);
                    return (
                      url.protocol === 'http:' ||
                      url.protocol === 'https:' ||
                      'Please enter a valid URL (e.g. https://sigide.com/item/...)'
                    );
                  } catch {
                    return 'Please enter a valid URL (e.g. https://sigide.com/item/...)';
                  }
                },
              })}
            />

            <TextField
              label="Describe the Issue"
              multiline
              rows={6}
              fullWidth
              required
              placeholder="Please describe what happened, when it occurred, and any other relevant details..."
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register('description', {
                required: 'Description is required',
                minLength: { value: 10, message: 'Description must be at least 10 characters' },
              })}
            />

            <SubmitButton type="submit" variant="contained" size="large" disabled={isPending}>
              {isPending ? 'Submitting...' : 'Submit Report'}
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

export default ReportIssuePage;
