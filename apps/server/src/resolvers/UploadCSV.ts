import { UploadCsvResolvers } from 'apps/__generated__/graphql';

const UploadCSV: UploadCsvResolvers = {
  id: (parent) => parent._id,
};

export default UploadCSV;
