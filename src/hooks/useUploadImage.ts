import { useState, useCallback } from 'react';
import { uploadsApi } from '@/services';
import { validateImageFile } from '@/utils';
import type { FileValidationResult } from '@/utils';

interface UploadProgress {
  file: File;
  progress: number;
  url?: string;
  error?: string;
}

interface UseUploadImageReturn {
  uploadImage: (file: File) => Promise<string | null>;
  uploadMultiple: (files: File[]) => Promise<(string | null)[]>;
  uploading: boolean;
  progress: UploadProgress[];
  validateFile: (file: File) => FileValidationResult;
  clearProgress: () => void;
}

export function useUploadImage(): UseUploadImageReturn {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<UploadProgress[]>([]);

  const uploadImage = useCallback(async (file: File): Promise<string | null> => {
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setProgress((prev) => [...prev, { file, progress: 0, error: validation.error }]);
      return null;
    }

    setUploading(true);
    setProgress((prev) => [...prev, { file, progress: 0 }]);

    try {
      setProgress((prev) => prev.map((p) => (p.file === file ? { ...p, progress: 50 } : p)));

      const response = await uploadsApi.uploadImage(file);
      const url = response.data.url;

      setProgress((prev) => prev.map((p) => (p.file === file ? { ...p, progress: 100, url } : p)));

      return url;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setProgress((prev) =>
        prev.map((p) => (p.file === file ? { ...p, progress: 0, error: errorMessage } : p))
      );
      return null;
    } finally {
      setUploading(false);
    }
  }, []);

  const uploadMultiple = useCallback(
    async (files: File[]): Promise<(string | null)[]> => {
      setUploading(true);
      const results = await Promise.all(files.map(uploadImage));
      setUploading(false);
      return results;
    },
    [uploadImage]
  );

  const clearProgress = useCallback(() => {
    setProgress([]);
  }, []);

  return {
    uploadImage,
    uploadMultiple,
    uploading,
    progress,
    validateFile: validateImageFile,
    clearProgress,
  };
}

export default useUploadImage;
