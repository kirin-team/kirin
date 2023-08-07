import User from './user';
import UserLink from './user-link';

export type UserType = typeof User & {
  Link: typeof UserLink;
};

(User as UserType).Link = UserLink;

export type { UserProps } from './user';

export default User as UserType;
