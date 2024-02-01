import React from 'react';
import { Grid, Typography } from '@mui/material';
import FacilityList from './FacilityList';

const FacilitiesPage: React.FC = () => {
  return (
    <>
      <Typography variant="h4">Facilities</Typography>
      <Grid container>
        <Grid item xs={6} md={4}>
          <FacilityList />
        </Grid>
      </Grid>
    </>
  );
};

export default FacilitiesPage;
