import { gql, useApolloClient, useFragment } from '@apollo/client';
import { Facility, UploadCsv } from '../../../__generated__/graphql';

export const FACILITY_FRAGMENT = gql`
  fragment Facility on Facility {
    id
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

export const useFacilityFragment = (id: string) => {
  const client = useApolloClient();
  const fragment = useFragment<MyFacility>({
    fragment: FACILITY_FRAGMENT,
    fragmentName: 'Facility',
    from: {
      __typename: 'Facility',
      id,
    },
  });

  return {
    ...fragment,
    setUploadCSV: (uploadCSV: UploadCsv) => {
      client.cache.updateFragment<MyFacility>(
        {
          fragment: FACILITY_FRAGMENT,
          fragmentName: 'Facility',
          id: `Facility:${id}`,
        },
        (data) => {
          if (!data) return;
          return { ...data, uploadCSV };
        }
      );
    },
  };
};

export type MyFacility = Omit<Facility, 'owner'>;
