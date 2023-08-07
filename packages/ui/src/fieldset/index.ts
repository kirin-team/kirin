import Fieldset from './fieldset';
import FieldsetContent from './fieldset-content';
import FieldsetFooter from './fieldset-footer';
import FieldsetGroup from './fieldset-group';
import FieldsetSubtitle from './fieldset-subtitle';
import FieldsetTitle from './fieldset-title';

export type FieldsetType = typeof Fieldset & {
  Title: typeof FieldsetTitle;
  Subtitle: typeof FieldsetSubtitle;
  Footer: typeof FieldsetFooter;
  Group: typeof FieldsetGroup;
  Content: typeof FieldsetContent;
  Body: typeof FieldsetContent;
};

(Fieldset as FieldsetType).Title = FieldsetTitle;
(Fieldset as FieldsetType).Subtitle = FieldsetSubtitle;
(Fieldset as FieldsetType).Footer = FieldsetFooter;
(Fieldset as FieldsetType).Group = FieldsetGroup;
(Fieldset as FieldsetType).Content = FieldsetContent;
(Fieldset as FieldsetType).Body = FieldsetContent;

export type { FieldsetProps } from './fieldset';
export type { FieldsetContentProps } from './fieldset-content';
export type { FieldsetFooterProps } from './fieldset-footer';
export type { FieldsetGroupProps } from './fieldset-group';
export type { FieldsetSubtitleProps } from './fieldset-subtitle';
export type { FieldsetTitleProps } from './fieldset-title';

export default Fieldset as FieldsetType;
