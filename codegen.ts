import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: './apps/server/src/schema.graphql',
  generates: {
    'apps/__generated__/graphql.ts': {
      plugins: ['typescript', 'typescript-resolvers', 'typescript-mongodb'],
    },
  },
};

export default config;
