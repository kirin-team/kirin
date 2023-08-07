import Card from './card';
import CardContent from './card-content';
import CardFooter from './card-footer';

export type CardType = typeof Card & {
  Footer: typeof CardFooter;
  Actions: typeof CardFooter;
  Content: typeof CardContent;
  Body: typeof CardContent;
};

(Card as CardType).Footer = CardFooter;
(Card as CardType).Actions = CardFooter;
(Card as CardType).Content = CardContent;
(Card as CardType).Body = CardContent;

export type { CardTypes } from '../utils/prop-types';
export type { CardProps } from './card';
export type { CardContentProps } from './card-content';
export type { CardFooterProps } from './card-footer';

export default Card as CardType;
