import DataLoader from 'dataloader';
import { IdToItemMapping } from './types';
import UploadCSV, { IUploadCSV } from '../models/UploadCSV';

type UserMapping = IdToItemMapping<IUploadCSV>;

export class UploadCSVDatasource {
  private batchUsers = new DataLoader(async (ids: ReadonlyArray<string>) => {
    const items = await UploadCSV.find({ _id: { $in: ids } }).exec();

    const map = items.reduce<UserMapping>((mapping, item) => {
      mapping[item._id.toString()] = item;
      return mapping;
    }, {});

    return ids.map((id) => map[id]);
  });

  getUploadCSV(id: string) {
    return this.batchUsers.load(id);
  }
}
