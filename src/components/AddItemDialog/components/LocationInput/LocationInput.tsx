import { Control, Controller, FieldErrors } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import type { GeoLocation } from '@/types';
import { LocationSection, LocationHelper } from '../../AddItemDialog.styled';

interface FormData {
  location_name: string;
}

export interface LocationInputProps {
  control: Control<FormData & Record<string, unknown>>;
  errors: FieldErrors<FormData>;
  location: GeoLocation | null;
  isLocating: boolean;
  geoError: GeolocationPositionError | Error | null;
}

export function LocationInput({
  control,
  errors,
  location,
  isLocating,
  geoError,
}: LocationInputProps) {
  return (
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
  );
}

export default LocationInput;
