import { useMutation } from '@tanstack/react-query';
import { feedbackApi } from '@/services';
import type { FeedbackFormData } from '@/types';
import type { FormSubmitResponse } from '@/services';
import type { AxiosError } from 'axios';

export function useFeedbackSubmit() {
  return useMutation<FormSubmitResponse, AxiosError<{ error: string }>, FeedbackFormData>({
    mutationFn: (data) => feedbackApi.submit(data).then((res) => res.data),
  });
}
