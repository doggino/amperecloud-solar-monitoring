import { UserResolvers } from 'apps/__generated__/graphql';

const User: UserResolvers = {
  id: (parent) => parent._id,
};

export default User;
