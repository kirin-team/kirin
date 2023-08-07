import Badge from './badge';
import BadgeAnchor from './badge-anchor';

export type BadgeType = typeof Badge & {
  Anchor: typeof BadgeAnchor;
};

(Badge as BadgeType).Anchor = BadgeAnchor;

export type { BadgeProps, BadgeTypes } from './badge';
export type { BadgeAnchorPlacement, BadgeAnchorProps } from './badge-anchor';

export default Badge as BadgeType;
