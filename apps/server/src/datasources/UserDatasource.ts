import DataLoader from 'dataloader';
import User, { IUser } from '../models/User';
import { IdToItemMapping } from './types';

type UserMapping = IdToItemMapping<IUser>;

export class UserDatasource {
  private batchUsers = new DataLoader(async (ids: ReadonlyArray<string>) => {
    const items = await User.find({ _id: { $in: ids } }).exec();

    const map = items.reduce<UserMapping>((mapping, item) => {
      mapping[item._id.toString()] = item;
      return mapping;
    }, {});

    return ids.map((id) => map[id]);
  });

  getUser(id: string) {
    return this.batchUsers.load(id);
  }
}
