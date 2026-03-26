import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import type { Address, CreateAddressData } from '@/types';

const addressSchema = yup.object({
  label: yup.string().required('Label is required').max(50),
  address_line1: yup.string().required('Address line 1 is required').max(255),
  address_line2: yup.string().max(255).default(''),
  city: yup.string().required('City is required').max(100),
  state: yup.string().required('State is required').max(100),
  postal_code: yup.string().required('Postal code is required').max(20),
  country: yup.string().max(100).default('India'),
  is_default: yup.boolean().default(false),
});

type AddressFormData = yup.InferType<typeof addressSchema>;

interface AddressDialogProps {
  open: boolean;
  address: Address | null;
  onClose: () => void;
  onSave: (data: CreateAddressData) => Promise<void>;
}

const LABEL_OPTIONS = ['Home', 'Work', 'Office', 'Other'];

const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Delhi',
  'Chandigarh',
  'Puducherry',
];

export function AddressDialog({ open, address, onClose, onSave }: AddressDialogProps) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddressFormData>({
    resolver: yupResolver(addressSchema),
    defaultValues: {
      label: 'Home',
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      postal_code: '',
      country: 'India',
      is_default: false,
    },
  });

  useEffect(() => {
    if (open) {
      if (address) {
        reset({
          label: address.label,
          address_line1: address.address_line1,
          address_line2: address.address_line2 || '',
          city: address.city,
          state: address.state,
          postal_code: address.postal_code,
          country: address.country,
          is_default: address.is_default,
        });
      } else {
        reset({
          label: 'Home',
          address_line1: '',
          address_line2: '',
          city: '',
          state: '',
          postal_code: '',
          country: 'India',
          is_default: false,
        });
      }
    }
  }, [open, address, reset]);

  const onSubmit = async (data: AddressFormData) => {
    await onSave({
      label: data.label,
      address_line1: data.address_line1,
      address_line2: data.address_line2 || undefined,
      city: data.city,
      state: data.state,
      postal_code: data.postal_code,
      country: data.country || 'India',
      is_default: data.is_default,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{address ? 'Edit Address' : 'Add New Address'}</DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Controller
                name="label"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Label"
                    fullWidth
                    error={Boolean(errors.label)}
                    helperText={errors.label?.message}
                  >
                    {LABEL_OPTIONS.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address_line1"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Line 1"
                    fullWidth
                    error={Boolean(errors.address_line1)}
                    helperText={errors.address_line1?.message}
                    placeholder="House/Flat No., Building Name, Street"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="address_line2"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Address Line 2 (Optional)"
                    fullWidth
                    error={Boolean(errors.address_line2)}
                    helperText={errors.address_line2?.message}
                    placeholder="Landmark, Area"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="City"
                    fullWidth
                    error={Boolean(errors.city)}
                    helperText={errors.city?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="state"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="State"
                    fullWidth
                    error={Boolean(errors.state)}
                    helperText={errors.state?.message}
                  >
                    {INDIAN_STATES.map((state) => (
                      <MenuItem key={state} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="postal_code"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Postal Code"
                    fullWidth
                    error={Boolean(errors.postal_code)}
                    helperText={errors.postal_code?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="country"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Country"
                    fullWidth
                    error={Boolean(errors.country)}
                    helperText={errors.country?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="is_default"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                      />
                    }
                    label="Set as default address"
                  />
                )}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Address'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default AddressDialog;
