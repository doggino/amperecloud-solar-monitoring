import React from 'react';
import { Grid, Typography } from '@mui/material';
import FacilityList from './FacilityList';
import FacilityChart from './FacilityChart';

const FacilitiesPage: React.FC = () => {
  return (
    <>
      <Typography variant="h4">Facilities</Typography>
      <Grid container spacing={2}>
        <Grid item xs={6} md={4}>
          <FacilityList />
        </Grid>
        <Grid item xs={6} md={8}>
          <FacilityChart />
        </Grid>
      </Grid>
    </>
  );
};

export default FacilitiesPage;
