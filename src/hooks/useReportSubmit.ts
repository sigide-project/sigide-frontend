import { useMutation } from '@tanstack/react-query';
import { reportsApi } from '@/services';
import type { ReportFormData } from '@/types';
import type { FormSubmitResponse } from '@/services';
import type { AxiosError } from 'axios';

export function useReportSubmit() {
  return useMutation<FormSubmitResponse, AxiosError<{ error: string }>, ReportFormData>({
    mutationFn: (data) => reportsApi.submit(data).then((res) => res.data),
  });
}
