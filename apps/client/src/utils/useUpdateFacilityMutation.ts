import { gql, useMutation } from '@apollo/client';
import { MyFacility } from './useFacilityFragment';

const UPDATE_FACILITY_MUTATION = gql`
  mutation UpdateFacility($id: String!, $name: String!) {
    updateFacility(id: $id, name: $name) {
      ...Facility
    }
  }
`;

interface UpdateFacilityMutationInput {
  id: string;
  name: string;
}

interface UpdateFacilityMutationResponse {
  updateFacility: MyFacility;
}

export const useUpdateFacilityMutation = () => {
  const [updateFacility] = useMutation<
    UpdateFacilityMutationResponse,
    UpdateFacilityMutationInput
  >(UPDATE_FACILITY_MUTATION);

  return (id: string, name: string) =>
    updateFacility({
      variables: { id, name },
    });
};
