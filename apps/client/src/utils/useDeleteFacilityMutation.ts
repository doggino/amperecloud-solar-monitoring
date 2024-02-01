import { gql, useMutation } from '@apollo/client';
import {
  GET_FACILITIES_QUERY,
  GetFacilitiesQueryResponse,
} from '../components/FacilityList';

const DELETE_FACILITY_MUTATION = gql`
  mutation DeleteFacility($id: String!) {
    deleteFacility(id: $id)
  }
`;

interface DeleteFacilityMutationInput {
  id: string;
}

interface DeleteFacilityMutationResponse {
  deleteFacility: boolean;
}

export const useDeleteFacilityMutation = () => {
  const [deleteFacility] = useMutation<
    DeleteFacilityMutationResponse,
    DeleteFacilityMutationInput
  >(DELETE_FACILITY_MUTATION);

  return async (id: string) => {
    const { data } = await deleteFacility({
      variables: { id },
      update: (cache, { data }) => {
        if (data?.deleteFacility)
          cache.updateQuery<GetFacilitiesQueryResponse>(
            {
              query: GET_FACILITIES_QUERY,
            },
            (data) => ({
              facilities:
                data?.facilities?.filter((facility) => facility.id !== id) ||
                [],
            })
          );
      },
    });

    return data;
  };
};
