import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { DeleteDialogContent, DeleteDialogText } from './DeleteItemDialog.styled';

interface DeleteItemDialogProps {
  open: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteItemDialog({ open, isDeleting, onConfirm, onCancel }: DeleteItemDialogProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>Delete Item</DialogTitle>
      <DialogContent>
        <DeleteDialogContent>
          <DeleteDialogText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DeleteDialogText>
        </DeleteDialogContent>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} disabled={isDeleting}>
          Cancel
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" disabled={isDeleting}>
          {isDeleting ? <CircularProgress size={24} color="inherit" /> : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteItemDialog;
