import { Control, Controller, FieldErrors } from 'react-hook-form';
import Alert from '@mui/material/Alert';
import type { ItemType } from '@/types';
import {
  FormSection,
  SectionLabel,
  StyledToggleButtonGroup,
  StyledToggleButton,
} from '../../AddItemDialog.styled';

interface FormData {
  type: ItemType;
}

export interface TypeToggleProps {
  control: Control<FormData & Record<string, unknown>>;
  errors: FieldErrors<FormData>;
}

export function TypeToggle({ control, errors }: TypeToggleProps) {
  return (
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
  );
}

export default TypeToggle;
