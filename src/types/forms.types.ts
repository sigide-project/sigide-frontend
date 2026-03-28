export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ReportFormData {
  issue_type: string;
  email: string;
  listing_url?: string;
  description: string;
}

export interface FeedbackFormData {
  rating?: number;
  name?: string;
  email?: string;
  feedback: string;
}
