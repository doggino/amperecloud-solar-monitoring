import React from 'react';
import { gql, useSuspenseQuery } from '@apollo/client';
import FacilityItem from './FacilityItem';
import { Card, CardContent, List } from '@mui/material';
import { FACILITY_FRAGMENT, MyFacility } from '../utils';
import { useCreateFacilityMutation } from '../utils/useCreateFacilityMutation';
import FacilityForm, { FacilityFormInput } from './FacilityForm';

export const GET_FACILITIES_QUERY = gql`
  ${FACILITY_FRAGMENT}
  query GetFacilities {
    facilities {
      id
      ...Facility @nonreactive
    }
  }
`;

export interface GetFacilitiesQueryResponse {
  facilities: MyFacility[];
}

const FacilityList: React.FC = () => {
  const { data } = useSuspenseQuery<GetFacilitiesQueryResponse>(
    GET_FACILITIES_QUERY,
    {
      errorPolicy: 'ignore',
    }
  );
  const createFacility = useCreateFacilityMutation();

  const handleCreate = async (input: FacilityFormInput) => {
    await createFacility(input.name);
  };

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
