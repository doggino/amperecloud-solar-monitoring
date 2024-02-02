import { Maybe } from 'graphql/jsutils/Maybe';
import { IUser } from './models/User';
import { BaseContext } from '@apollo/server';
import { UserDatasource } from './datasources';
import { UploadCSVDatasource } from './datasources/UploadCSVDatasource';

export interface AmpereContext extends BaseContext {
  user: Maybe<IUser>;
  userDatasource: UserDatasource;
  uploadCSVDatasource: UploadCSVDatasource;
}
