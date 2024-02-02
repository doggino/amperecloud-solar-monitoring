import React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import FacilityItem from './FacilityItem';
import { Card, CardContent, CircularProgress, List } from '@mui/material';
import { MyFacility } from '../utils';
import { useCreateFacilityMutation } from '../utils/useCreateFacilityMutation';
import FacilityForm, { FacilityFormInput } from './FacilityForm';

export const GET_FACILITIES_QUERY = gql`
  query GetFacilities {
    facilities {
      ...Facility @nonreactive
    }
  }
`;

export interface GetFacilitiesQueryResponse {
  facilities: MyFacility[];
}

const FacilityList: React.FC = () => {
  const { data, error } = useSuspenseQuery<GetFacilitiesQueryResponse>(
    GET_FACILITIES_QUERY,
    {
      errorPolicy: 'ignore',
    }
  );
  const createFacility = useCreateFacilityMutation();

  const handleCreate = async (input: FacilityFormInput) => {
    await createFacility(input.name);
  };

  if (error) return <></>;

  if (!data?.facilities) return <CircularProgress />;

  return (
    <Card variant="outlined">
      <CardContent>
        <FacilityForm onSubmit={handleCreate} />
        <List>
          {data?.facilities.map((facility) => (
            <FacilityItem key={facility.id} id={facility.id} />
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default FacilityList;
