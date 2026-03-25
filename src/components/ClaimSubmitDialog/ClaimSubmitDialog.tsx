import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import { useQueryClient } from '@tanstack/react-query';
import { useClaimSubmit, CLAIMS_MINE_QUERY_KEY, ITEM_QUERY_KEY } from '@/hooks';
import { ImageUpload } from '@/components/AddItemDialog/components';
import { uploadsApi } from '@/services';
import { validateImageFile } from '@/utils';
import type { StagedImage, UploadingFile } from '@/components/AddItemDialog/components';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  ItemInfoBox,
  ItemTitle,
  ItemOwnerName,
  CancelButton,
  SubmitButton,
} from './ClaimSubmitDialog.styled';

const MAX_PROOF_IMAGES = 5;

interface ClaimFormData {
  proof_description: string;
}

const schema = yup.object({
  proof_description: yup
    .string()
    .required('Description is required')
    .min(10, 'Description must be at least 10 characters'),
});

export interface ClaimSubmitDialogProps {
  open: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    type: string;
    owner?: { name: string };
  };
}

export function ClaimSubmitDialog({ open, onClose, item }: ClaimSubmitDialogProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const claimSubmit = useClaimSubmit();

  const [stagedImages, setStagedImages] = useState<StagedImage[]>([]);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const isUploading = uploadingFiles.length > 0;

  const form = useForm<ClaimFormData>({
    resolver: yupResolver(schema),
    defaultValues: { proof_description: '' },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  const handleFileSelect = async (files: FileList) => {
    const fileArray = Array.from(files);
    const remaining = MAX_PROOF_IMAGES - stagedImages.length;

    if (fileArray.length > remaining) {
      setUploadError(`You can upload up to ${MAX_PROOF_IMAGES} images. ${remaining} slots remaining.`);
      return;
    }

    for (const file of fileArray) {
      const validation = validateImageFile(file);
      if (!validation.valid) {
        setUploadError(validation.error || 'Invalid file');
        return;
      }
    }

    setUploadingFiles(fileArray.map((file) => ({ file, progress: 50 })));

    for (const file of fileArray) {
      try {
        const res = await uploadsApi.uploadImage(file);
        const url = res.data.url;
        setStagedImages((prev) => [
          ...prev,
          { id: crypto.randomUUID(), type: 'new', url, file },
        ]);
      } catch {
        setUploadError('Failed to upload image');
      }
    }

    setUploadingFiles([]);
  };

  const handleRemoveImage = (id: string) => {
    setStagedImages((prev) => prev.filter((img) => img.id !== id));
  };

  const handleClose = () => {
    reset();
    setStagedImages([]);
    setSubmitError(null);
    setUploadError(null);
    onClose();
  };

  const onSubmit = async (data: ClaimFormData) => {
    setSubmitError(null);

    try {
      const claim = await claimSubmit.mutateAsync({
        item_id: item.id,
        proof_description: data.proof_description,
        proof_images: stagedImages.map((img) => img.url),
      });

      queryClient.invalidateQueries({ queryKey: [CLAIMS_MINE_QUERY_KEY] });
      queryClient.invalidateQueries({ queryKey: [ITEM_QUERY_KEY, item.id] });

      handleClose();
      setSnackbarOpen(true);
      navigate(`/messages/${claim.id}`);
    } catch (err: unknown) {
      const axiosErr = err as { response?: { status?: number; data?: { message?: string } } };
      const status = axiosErr.response?.status;
      const message = axiosErr.response?.data?.message;

      if (status === 403) {
        setSubmitError(message || 'You cannot claim your own item');
      } else if (status === 409) {
        setSubmitError(message || 'You already have an active claim on this item');
      } else {
        setSubmitError(message || 'Failed to submit claim');
      }
    }
  };

  return (
    <>
      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>Submit a Claim</StyledDialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogContent>
            {submitError && (
              <Alert severity="error" onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}

            <ItemInfoBox>
              <div>
                <ItemTitle>{item.title}</ItemTitle>
                {item.owner?.name && (
                  <ItemOwnerName>Posted by {item.owner.name}</ItemOwnerName>
                )}
              </div>
            </ItemInfoBox>

            <Controller
              name="proof_description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Describe how you found it"
                  fullWidth
                  multiline
                  rows={4}
                  error={Boolean(errors.proof_description)}
                  helperText={errors.proof_description?.message}
                  placeholder="Provide details about where and when you found this item..."
                />
              )}
            />

            <ImageUpload
              stagedImages={stagedImages}
              uploadingFiles={uploadingFiles}
              uploadError={uploadError}
              isUploading={isUploading}
              onFileSelect={handleFileSelect}
              onRemoveImage={handleRemoveImage}
              onClearError={() => setUploadError(null)}
            />
          </StyledDialogContent>

          <StyledDialogActions>
            <CancelButton onClick={handleClose} disabled={claimSubmit.isPending}>
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={claimSubmit.isPending || isUploading}
            >
              {claimSubmit.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Submit Claim'
              )}
            </SubmitButton>
          </StyledDialogActions>
        </form>
      </StyledDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message="Claim submitted — the owner has been notified"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </>
  );
}

export default ClaimSubmitDialog;
