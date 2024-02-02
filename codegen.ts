import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/server/src/schema.graphql',
  generates: {
    'apps/__generated__/graphql.ts': {
      plugins: [
        'typescript',
        './codegen-plugins/codegen-typedefs.js',
        'typescript-resolvers',
        'typescript-mongodb',
      ],
      config: {
        contextType: 'apps/server/src/types#AmpereContext',
        mappers: {
          User: 'apps/server/src/models/User#IUser',
          Facility: 'apps/server/src/models/Facility#IFacility',
          FacilityData: 'apps/server/src/models/UploadCSV#IFacilityData',
          UploadCSV: 'apps/server/src/models/UploadCSV#IUploadCSV',
        },
      },
    },
  },
};

export default config;
