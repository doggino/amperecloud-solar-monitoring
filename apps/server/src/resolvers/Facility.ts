import { FacilityResolvers } from 'apps/__generated__/graphql';

const Facility: FacilityResolvers = {
  id: (facility) => facility._id,
  owner: (facility, args, context) =>
    context.userDatasource.getUser(facility.owner.toString()),
  uploadCSV: (facility, args, context) =>
    facility.uploadCSV &&
    context.uploadCSVDatasource.getUploadCSV(facility.uploadCSV.toString()),
};

export default Facility;
