import { gql, useFragment } from '@apollo/client';
import { Facility } from 'apps/__generated__/graphql';

export const FACILITY_FRAGMENT = gql`
  fragment Facility on Facility {
    name
    uploadCSV {
      data {
        activePower
        energy
        time
      }
      fileName
      id
    }
  }
`;

export const useFacilityFragment = (id: string) =>
  useFragment<MyFacility>({
    fragment: FACILITY_FRAGMENT,
    from: {
      __typename: 'Facility',
      id,
    },
  });

export type MyFacility = Omit<Facility, 'owner'>;
