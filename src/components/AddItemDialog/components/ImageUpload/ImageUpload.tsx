import { useRef, useCallback } from 'react';
import Alert from '@mui/material/Alert';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import { MAX_IMAGES } from '@/utils';
import {
  ImageUploadSection,
  SectionLabel,
  UploadButton,
  HiddenInput,
  UploadProgressContainer,
  UploadProgressItem,
  UploadFileName,
  StyledLinearProgress,
  ImagePreviewContainer,
  ImagePreview,
  PreviewImage,
  RemoveImageButton,
} from '../../AddItemDialog.styled';

export interface UploadingFile {
  file: File;
  progress: number;
}

export interface StagedImage {
  id: string;
  type: 'existing' | 'new';
  url: string;
  file?: File;
}

export interface ImageUploadProps {
  stagedImages: StagedImage[];
  uploadingFiles: UploadingFile[];
  uploadError: string | null;
  isUploading: boolean;
  onFileSelect: (files: FileList) => void;
  onRemoveImage: (id: string) => void;
  onClearError: () => void;
}

export function ImageUpload({
  stagedImages,
  uploadingFiles,
  uploadError,
  isUploading,
  onFileSelect,
  onRemoveImage,
  onClearError,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        onFileSelect(files);
      }
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    },
    [onFileSelect]
  );

  const handleUploadClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  return (
    <ImageUploadSection>
      <SectionLabel>Images (optional, max {MAX_IMAGES})</SectionLabel>

      {uploadError && (
        <Alert severity="error" onClose={onClearError}>
          {uploadError}
        </Alert>
      )}

      <UploadButton
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={handleUploadClick}
        disabled={stagedImages.length >= MAX_IMAGES || isUploading}
      >
        Upload Images
      </UploadButton>

      <HiddenInput
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        multiple
        onChange={handleFileChange}
      />

      {uploadingFiles.length > 0 && (
        <UploadProgressContainer>
          {uploadingFiles.map((uf, index) => (
            <UploadProgressItem key={index}>
              <UploadFileName>{uf.file.name}</UploadFileName>
              <StyledLinearProgress variant="determinate" value={uf.progress} />
            </UploadProgressItem>
          ))}
        </UploadProgressContainer>
      )}

      {stagedImages.length > 0 && (
        <ImagePreviewContainer>
          {stagedImages.map((image) => (
            <ImagePreview key={image.id}>
              <PreviewImage src={image.url} alt={`Upload preview`} />
              <RemoveImageButton
                size="small"
                onClick={() => onRemoveImage(image.id)}
                disabled={isUploading}
              >
                <CloseIcon />
              </RemoveImageButton>
            </ImagePreview>
          ))}
        </ImagePreviewContainer>
      )}
    </ImageUploadSection>
  );
}

export default ImageUpload;
