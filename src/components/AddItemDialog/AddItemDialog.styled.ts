import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';

export const StyledDialog = styled(Dialog)`
  .MuiDialog-paper {
    border-radius: 16px;
  }
`;

export const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.25rem;
  font-weight: 600;
  padding: 24px 24px 16px;
`;

export const StyledDialogContent = styled(DialogContent)`
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const StyledDialogActions = styled(DialogActions)`
  padding: 16px 24px 24px;
  gap: 12px;
`;

export const FormSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const SectionLabel = styled('label')`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.secondary};
`;

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)`
  width: 100%;
  display: flex;
`;

interface StyledToggleButtonProps {
  itemType?: 'lost' | 'found';
}

const shouldForwardProp = (prop: string) => prop !== 'itemType';

export const StyledToggleButton = styled(ToggleButton, {
  shouldForwardProp,
})<StyledToggleButtonProps>`
  flex: 1;
  padding: 12px 24px;
  text-transform: none;
  font-weight: 600;
  border-radius: 8px;

  &.Mui-selected {
    background-color: ${({ theme, itemType }) =>
      itemType === 'lost' ? theme.palette.lost.light : theme.palette.found.light};
    color: ${({ theme, itemType }) =>
      itemType === 'lost' ? theme.palette.lost.main : theme.palette.found.main};
    border-color: ${({ theme, itemType }) =>
      itemType === 'lost' ? theme.palette.lost.main : theme.palette.found.main};

    &:hover {
      background-color: ${({ theme, itemType }) =>
        itemType === 'lost' ? theme.palette.lost.light : theme.palette.found.light};
    }
  }
`;

export const LocationSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const LocationHelper = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const ImageUploadSection = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const UploadButton = styled(Button)`
  text-transform: none;
  font-weight: 500;
`;

export const ImagePreviewContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const ImagePreview = styled('div')`
  position: relative;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: visible;
  border: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

export const PreviewImage = styled('img')`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

export const RemoveImageButton = styled(IconButton)`
  position: absolute;
  top: -8px;
  right: -8px;
  padding: 4px;
  background-color: ${({ theme }) => theme.palette.error.main};
  color: white;
  z-index: 1;

  &:hover {
    background-color: ${({ theme }) => theme.palette.error.dark};
  }

  .MuiSvgIcon-root {
    font-size: 14px;
  }
`;

export const UploadProgressContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const UploadProgressItem = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const UploadFileName = styled('span')`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.text.secondary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const StyledLinearProgress = styled(LinearProgress)`
  border-radius: 4px;
  height: 6px;
`;

export const CancelButton = styled(Button)`
  text-transform: none;
`;

export const SubmitButton = styled(Button)`
  text-transform: none;
  font-weight: 600;
`;

export const HiddenInput = styled('input')`
  display: none;
`;

export const RewardInputWrapper = styled('div')`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const RewardPrefix = styled('span')`
  font-size: 1rem;
  font-weight: 500;
  color: ${({ theme }) => theme.palette.text.primary};
`;
