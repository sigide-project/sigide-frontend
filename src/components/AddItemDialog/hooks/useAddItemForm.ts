import { useEffect, useState, useCallback, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import dayjs, { Dayjs } from 'dayjs';
import { useQueryClient } from '@tanstack/react-query';
import {
  useCreateItem,
  useUpdateItem,
  useGeolocation,
  MY_ITEMS_QUERY_KEY,
  ITEMS_QUERY_KEY,
} from '@/hooks';
import { uploadsApi } from '@/services';
import type { Item, ItemType, CreateItemData, UpdateItemData } from '@/types';
import { validateImageFile, MAX_IMAGES } from '@/utils';
import type { UploadingFile, StagedImage } from '../components';

export interface AddItemFormData {
  type: ItemType;
  title: string;
  description: string;
  category: string;
  location_name: string;
  reward_amount: number;
  lost_found_at: Dayjs | null;
}

export const MAX_DESCRIPTION_LENGTH = 500;
export const MAX_REWARD_AMOUNT = 50000;

const schema = yup.object({
  type: yup
    .string()
    .oneOf(['lost', 'found'] as const)
    .required('Type is required'),
  title: yup
    .string()
    .required('Title is required')
    .max(200, 'Title must be at most 200 characters'),
  description: yup
    .string()
    .required('Description is required')
    .max(
      MAX_DESCRIPTION_LENGTH,
      `Description must be at most ${MAX_DESCRIPTION_LENGTH} characters`
    ),
  category: yup.string().required('Category is required'),
  location_name: yup.string().required('Location is required'),
  reward_amount: yup
    .number()
    .transform((value) => (isNaN(value) ? 0 : value))
    .min(0, 'Reward must be 0 or greater')
    .max(MAX_REWARD_AMOUNT, `Reward cannot exceed ₹${MAX_REWARD_AMOUNT.toLocaleString('en-IN')}`)
    .default(0)
    .required(),
  lost_found_at: yup
    .mixed<Dayjs>()
    .nullable()
    .required('Date and time is required')
    .test('not-future', 'Date cannot be in the future', (value) => {
      if (!value) return true;
      return dayjs(value).isBefore(dayjs()) || dayjs(value).isSame(dayjs(), 'minute');
    }),
});

export interface UseAddItemFormOptions {
  item?: Item;
  open: boolean;
  onClose: () => void;
}

export function useAddItemForm({ item, open, onClose }: UseAddItemFormOptions) {
  const queryClient = useQueryClient();
  const { location, error: geoError, isLoading: isLocating } = useGeolocation();
  const [stagedImages, setStagedImages] = useState<StagedImage[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const removedImageUrls = useRef<string[]>([]);
  const objectUrlsRef = useRef<string[]>([]);

  const isEditMode = Boolean(item);

  const { mutateAsync: createItem, isPending: isCreating } = useCreateItem();
  const { mutateAsync: updateItem, isPending: isUpdating } = useUpdateItem();

  const form = useForm<AddItemFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      type: 'lost',
      title: '',
      description: '',
      category: '',
      location_name: '',
      reward_amount: 0,
      lost_found_at: dayjs(),
    },
  });

  const { reset, watch } = form;
  const watchedType = watch('type');

  useEffect(() => {
    if (open && item) {
      reset({
        type: item.type,
        title: item.title,
        description: item.description,
        category: item.category,
        location_name: item.location_name,
        reward_amount: parseFloat(item.reward_amount) || 0,
        lost_found_at: item.lost_found_at ? dayjs(item.lost_found_at) : null,
      });
      const existingImages: StagedImage[] = (item.image_urls || []).map((url, index) => ({
        id: `existing-${index}-${url}`,
        type: 'existing' as const,
        url,
      }));
      setStagedImages(existingImages);
      removedImageUrls.current = [];
    } else if (open && !item) {
      reset({
        type: 'lost',
        title: '',
        description: '',
        category: '',
        location_name: '',
        reward_amount: 0,
        lost_found_at: dayjs(),
      });
      setStagedImages([]);
      removedImageUrls.current = [];
    }
    setSubmitError(null);
    setUploadError(null);
  }, [open, item, reset]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
      objectUrlsRef.current = [];
    };
  }, []);

  const handleFileSelect = useCallback(
    (files: FileList) => {
      const remainingSlots = MAX_IMAGES - stagedImages.length;
      if (remainingSlots <= 0) {
        setUploadError(`Maximum ${MAX_IMAGES} images allowed`);
        return;
      }

      const filesToAdd = Array.from(files).slice(0, remainingSlots);
      setUploadError(null);

      const newStagedImages: StagedImage[] = [];

      for (const file of filesToAdd) {
        const validation = validateImageFile(file);
        if (!validation.valid) {
          setUploadError(validation.error || 'Invalid file');
          continue;
        }

        const previewUrl = URL.createObjectURL(file);
        objectUrlsRef.current.push(previewUrl);

        newStagedImages.push({
          id: `new-${Date.now()}-${file.name}`,
          type: 'new',
          url: previewUrl,
          file,
        });
      }

      if (newStagedImages.length > 0) {
        setStagedImages((prev) => [...prev, ...newStagedImages]);
      }
    },
    [stagedImages.length]
  );

  const handleRemoveImage = useCallback((idToRemove: string) => {
    setStagedImages((prev) => {
      const imageToRemove = prev.find((img) => img.id === idToRemove);
      if (imageToRemove) {
        if (imageToRemove.type === 'existing') {
          removedImageUrls.current = [...removedImageUrls.current, imageToRemove.url];
        } else if (imageToRemove.type === 'new' && imageToRemove.url) {
          URL.revokeObjectURL(imageToRemove.url);
          objectUrlsRef.current = objectUrlsRef.current.filter((u) => u !== imageToRemove.url);
        }
      }
      return prev.filter((img) => img.id !== idToRemove);
    });
  }, []);

  const handleClose = useCallback(() => {
    reset();
    stagedImages.forEach((img) => {
      if (img.type === 'new' && img.url) {
        URL.revokeObjectURL(img.url);
      }
    });
    objectUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];
    setStagedImages([]);
    setUploadingFiles([]);
    setUploadError(null);
    setSubmitError(null);
    removedImageUrls.current = [];
    onClose();
  }, [reset, onClose, stagedImages]);

  const onSubmit = async (data: AddItemFormData) => {
    setSubmitError(null);
    setIsUploading(true);

    try {
      const existingUrls = stagedImages
        .filter((img) => img.type === 'existing')
        .map((img) => img.url);

      const newFiles = stagedImages
        .filter((img) => img.type === 'new' && img.file)
        .map((img) => img.file!);

      const uploadedUrls: string[] = [];

      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        setUploadingFiles((prev) => [...prev, { file, progress: 0 }]);

        try {
          setUploadingFiles((prev) =>
            prev.map((f) => (f.file === file ? { ...f, progress: 50 } : f))
          );

          const response = await uploadsApi.uploadImage(file);
          uploadedUrls.push(response.data.url);

          setUploadingFiles((prev) => prev.filter((f) => f.file !== file));
        } catch {
          setUploadingFiles((prev) => prev.filter((f) => f.file !== file));
          throw new Error('Failed to upload image. Please try again.');
        }
      }

      const finalImageUrls = [...existingUrls, ...uploadedUrls];

      const basePayload: CreateItemData = {
        type: data.type,
        title: data.title,
        description: data.description,
        category: data.category,
        location_name: data.location_name,
        lat: location?.lat ?? null,
        lng: location?.lng ?? null,
        image_urls: finalImageUrls,
        reward_amount: data.reward_amount || 0,
        lost_found_at: data.lost_found_at?.toISOString() || new Date().toISOString(),
      };

      if (isEditMode && item) {
        const changedFields: UpdateItemData = {};

        if (data.type !== item.type) changedFields.type = data.type;
        if (data.title !== item.title) changedFields.title = data.title;
        if (data.description !== item.description) changedFields.description = data.description;
        if (data.category !== item.category) changedFields.category = data.category;
        if (data.location_name !== item.location_name)
          changedFields.location_name = data.location_name;

        const currentReward = parseFloat(item.reward_amount) || 0;
        if (data.reward_amount !== currentReward) {
          changedFields.reward_amount = data.reward_amount || 0;
        }

        const currentDate = item.lost_found_at ? dayjs(item.lost_found_at).toISOString() : null;
        const newDate = data.lost_found_at?.toISOString() || null;
        if (currentDate !== newDate) {
          changedFields.lost_found_at = newDate || undefined;
        }

        const currentImages = JSON.stringify(item.image_urls || []);
        const newImages = JSON.stringify(finalImageUrls);
        if (currentImages !== newImages) {
          changedFields.image_urls = finalImageUrls;
        }

        await updateItem({ id: item.id, data: changedFields });

        if (removedImageUrls.current.length > 0) {
          await Promise.allSettled(
            removedImageUrls.current.map((url) => uploadsApi.deleteImage(url))
          );
        }

        setSnackbarMessage('Item updated successfully');
      } else {
        await createItem(basePayload);
        setSnackbarMessage('Item reported successfully');
      }

      queryClient.invalidateQueries({ queryKey: [MY_ITEMS_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ITEMS_QUERY_KEY] });
      setSnackbarOpen(true);
      handleClose();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'An error occurred. Please try again.';
      setSubmitError(errorMessage);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    form,
    watchedType,
    isEditMode,
    isSubmitting: isCreating || isUpdating || isUploading,
    stagedImages,
    uploadingFiles,
    uploadError,
    submitError,
    snackbarOpen,
    snackbarMessage,
    location,
    geoError,
    isLocating,
    isUploading,
    handleFileSelect,
    handleRemoveImage,
    handleClose,
    onSubmit,
    setUploadError,
    setSubmitError,
    setSnackbarOpen,
  };
}
