import { Maybe } from 'graphql/jsutils/Maybe';
import { IUser } from './models/User';
import { BaseContext } from '@apollo/server';

export interface AmpereContext extends BaseContext {
  user: Maybe<IUser>;
}
