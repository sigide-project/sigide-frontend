import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import type { Item } from '@/types';
import { ITEM_CATEGORIES } from '@/types';
import { formatWithCommas } from '@/utils';
import { useAddItemForm, MAX_DESCRIPTION_LENGTH, MAX_REWARD_AMOUNT } from './hooks';
import { ImageUpload } from './components';
import {
  StyledDialog,
  StyledDialogTitle,
  StyledDialogContent,
  StyledDialogActions,
  FormSection,
  SectionLabel,
  StyledToggleButtonGroup,
  StyledToggleButton,
  LocationSection,
  LocationHelper,
  CancelButton,
  SubmitButton,
} from './AddItemDialog.styled';

export interface AddItemDialogProps {
  open: boolean;
  onClose: () => void;
  item?: Item;
}

export function AddItemDialog({ open, onClose, item }: AddItemDialogProps) {
  const {
    form,
    watchedType,
    isEditMode,
    isSubmitting,
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
  } = useAddItemForm({ item, open, onClose });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = form;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StyledDialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <StyledDialogTitle>{isEditMode ? 'Edit Item' : 'Report Lost Item'}</StyledDialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledDialogContent>
            {submitError && (
              <Alert severity="error" onClose={() => setSubmitError(null)}>
                {submitError}
              </Alert>
            )}

            <FormSection>
              <SectionLabel>Type</SectionLabel>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <StyledToggleButtonGroup
                    {...field}
                    exclusive
                    onChange={(_, value) => value && field.onChange(value)}
                  >
                    <StyledToggleButton value="lost" itemType="lost">
                      Lost
                    </StyledToggleButton>
                    <StyledToggleButton value="found" itemType="found">
                      Found
                    </StyledToggleButton>
                  </StyledToggleButtonGroup>
                )}
              />
              {errors.type && <Alert severity="error">{errors.type.message}</Alert>}
            </FormSection>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  error={Boolean(errors.title)}
                  helperText={errors.title?.message}
                  placeholder="e.g., Lost iPhone 15 Pro"
                />
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Category"
                  fullWidth
                  error={Boolean(errors.category)}
                  helperText={errors.category?.message}
                >
                  {ITEM_CATEGORIES.map((cat) => (
                    <MenuItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => {
                const charCount = field.value?.length || 0;
                const isOverLimit = charCount > MAX_DESCRIPTION_LENGTH;
                return (
                  <Box>
                    <TextField
                      {...field}
                      label="Description"
                      fullWidth
                      multiline
                      rows={4}
                      error={Boolean(errors.description) || isOverLimit}
                      helperText={errors.description?.message}
                      placeholder="Describe the item in detail..."
                      inputProps={{ maxLength: MAX_DESCRIPTION_LENGTH + 50 }}
                    />
                    <Typography
                      variant="caption"
                      sx={{
                        display: 'block',
                        textAlign: 'right',
                        mt: 0.5,
                        color: isOverLimit
                          ? 'error.main'
                          : charCount > MAX_DESCRIPTION_LENGTH * 0.9
                            ? 'warning.main'
                            : 'text.secondary',
                      }}
                    >
                      {charCount}/{MAX_DESCRIPTION_LENGTH}
                    </Typography>
                  </Box>
                );
              }}
            />

            <Controller
              name="lost_found_at"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  label={watchedType === 'lost' ? 'When was it lost?' : 'When was it found?'}
                  value={field.value}
                  onChange={field.onChange}
                  maxDateTime={dayjs()}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      error: Boolean(errors.lost_found_at),
                      helperText: errors.lost_found_at?.message,
                    },
                  }}
                />
              )}
            />

            {watchedType === 'lost' && (
              <Controller
                name="reward_amount"
                control={control}
                render={({ field }) => {
                  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const rawValue = e.target.value.replace(/,/g, '');
                    const numValue = parseFloat(rawValue) || 0;
                    const clampedValue = Math.min(numValue, MAX_REWARD_AMOUNT);
                    field.onChange(clampedValue);
                  };

                  return (
                    <TextField
                      value={formatWithCommas(field.value)}
                      onChange={handleChange}
                      onBlur={field.onBlur}
                      name={field.name}
                      label="Reward Amount (₹)"
                      fullWidth
                      error={Boolean(errors.reward_amount)}
                      helperText={
                        errors.reward_amount?.message ||
                        `Optional - leave 0 if no reward (max ₹${MAX_REWARD_AMOUNT.toLocaleString('en-IN')})`
                      }
                      inputProps={{ inputMode: 'numeric' }}
                    />
                  );
                }}
              />
            )}

            <LocationSection>
              <Controller
                name="location_name"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Area / Landmark"
                    fullWidth
                    error={Boolean(errors.location_name)}
                    helperText={errors.location_name?.message}
                    placeholder="e.g., MG Road, Bangalore"
                  />
                )}
              />
              {isLocating ? (
                <LocationHelper>
                  <CircularProgress size={12} /> Detecting location...
                </LocationHelper>
              ) : location ? (
                <LocationHelper>📍 Location auto-detected</LocationHelper>
              ) : geoError ? (
                <Alert severity="info">
                  Location could not be detected. Please enter the area name manually.
                </Alert>
              ) : null}
            </LocationSection>

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
            <CancelButton onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </CancelButton>
            <SubmitButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting || uploadingFiles.length > 0}
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : isEditMode ? (
                'Update Item'
              ) : (
                'Report Item'
              )}
            </SubmitButton>
          </StyledDialogActions>
        </form>
      </StyledDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </LocalizationProvider>
  );
}

export default AddItemDialog;
