import React, { useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Grid,
} from '@mui/material';
import { gql, useSuspenseQuery } from '@apollo/client';
import { GetFacilitiesQueryResponse } from './FacilityList';
import ActivePowerChart from './ActivePowerChart';
import EnergyChart from './EnergyChart';

const GET_FACILITIES_QUERY = gql`
  query GetFacilities {
    facilities {
      ...Facility
    }
  }
`;

const FacilityChart = () => {
  const { data, error } = useSuspenseQuery<GetFacilitiesQueryResponse>(
    GET_FACILITIES_QUERY,
    {
      errorPolicy: 'ignore',
    }
  );

  if (error) return <></>;

  if (!data?.facilities) return <CircularProgress />;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Active Power (kW)"></CardHeader>
          <CardContent>
            <ActivePowerChart facilities={data.facilities} />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Energy (kW/h)"></CardHeader>
          <CardContent>
            <EnergyChart facilities={data.facilities} />
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default FacilityChart;
