import { Button, Grid, TextField } from '@mui/material';
import { Check, Add } from '@mui/icons-material';
import React from 'react';
import { useForm } from 'react-hook-form';

interface FacilityFormProps {
  name?: string;
  onSubmit: (input: FacilityFormInput) => Promise<void>;
  update?: boolean;
}

export interface FacilityFormInput {
  name: string;
}

const FacilityForm: React.FC<FacilityFormProps> = ({
  name = '',
  onSubmit,
  update,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FacilityFormInput>({ defaultValues: { name } });

  return (
    <Grid
      container
      spacing={1}
      component="form"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid item xs={10}>
        <TextField
          label="Name"
          size="small"
          fullWidth
          {...register('name', { required: true })}
          {...(errors.name && {
            error: true,
            helperText: errors.name.message || 'This field is required',
          })}
        />
      </Grid>
      <Grid item xs={2}>
        <Button
          type="submit"
          variant="contained"
          sx={{ width: '100%', minWidth: 0 }}
        >
          {update ? <Check /> : <Add />}
        </Button>
      </Grid>
    </Grid>
  );
};

export default FacilityForm;
