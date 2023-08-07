import Avatar from './avatar';
import AvatarGroup from './avatar-group';

export type AvatarType = typeof Avatar & {
  Group: typeof AvatarGroup;
};

(Avatar as AvatarType).Group = AvatarGroup;

export type { AvatarProps } from './avatar';
export type { AvatarGroupProps } from './avatar-group';

export default Avatar as AvatarType;
