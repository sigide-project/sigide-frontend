import { Container, TextField, MenuItem } from '@mui/material';
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
          <FormContainer onSubmit={handleSubmit}>
            <FormTitle>Submit a Report</FormTitle>
            <FormDescription>
              Please provide as much detail as possible so we can investigate and resolve the issue
              quickly.
            </FormDescription>

            <TextField select label="Issue Type" fullWidth required defaultValue="">
              {issueTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>

            <TextField label="Your Email" type="email" fullWidth required />

            <TextField
              label="Related Listing URL (if applicable)"
              fullWidth
              placeholder="https://sigide.com/item/..."
            />

            <TextField
              label="Describe the Issue"
              multiline
              rows={6}
              fullWidth
              required
              placeholder="Please describe what happened, when it occurred, and any other relevant details..."
            />

            <SubmitButton type="submit" variant="contained" size="large">
              Submit Report
            </SubmitButton>
          </FormContainer>
        </Container>
      </ContentSection>
    </PageContainer>
  );
}

export default ReportIssuePage;
