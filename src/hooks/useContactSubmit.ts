import { useMutation } from '@tanstack/react-query';
import { contactApi } from '@/services';
import type { ContactFormData } from '@/types';
import type { FormSubmitResponse } from '@/services';
import type { AxiosError } from 'axios';

export function useContactSubmit() {
  return useMutation<FormSubmitResponse, AxiosError<{ error: string }>, ContactFormData>({
    mutationFn: (data) => contactApi.submit(data).then((res) => res.data),
  });
}
