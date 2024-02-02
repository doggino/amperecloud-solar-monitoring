import { gql, useMutation } from '@apollo/client';
import {
  GET_FACILITIES_QUERY,
  GetFacilitiesQueryResponse,
} from '../components/FacilityList';
import { MyFacility } from './useFacilityFragment';

const CREATE_FACILITY_MUTATION = gql`
  mutation CreateFacility($name: String!) {
    createFacility(name: $name) {
      ...Facility
    }
  }
`;

interface CreateFacilityMutationInput {
  name: string;
}

interface CreateFacilityMutationResponse {
  createFacility: MyFacility;
}

export const useCreateFacilityMutation = () => {
  const [createFacility] = useMutation<
    CreateFacilityMutationResponse,
    CreateFacilityMutationInput
  >(CREATE_FACILITY_MUTATION);

  return async (name: string) => {
    const { data } = await createFacility({
      variables: { name },
      update: (cache, { data }) => {
        if (data?.createFacility)
          cache.updateQuery<GetFacilitiesQueryResponse>(
            {
              query: GET_FACILITIES_QUERY,
            },
            (cacheData) => ({
              facilities: [
                ...(cacheData?.facilities || []),
                data.createFacility,
              ],
            })
          );
      },
    });

    return data;
  };
};
