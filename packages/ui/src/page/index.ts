import Page from './page';
import PageContent from './page-content';
import PageFooter from './page-footer';
import PageHeader from './page-header';

export type PageType = typeof Page & {
  Header: typeof PageHeader;
  Content: typeof PageContent;
  Body: typeof PageContent;
  Footer: typeof PageFooter;
};

(Page as PageType).Header = PageHeader;
(Page as PageType).Content = PageContent;
(Page as PageType).Body = PageContent;
(Page as PageType).Footer = PageFooter;

export type { PageProps, PageRenderMode } from './page';
export type { PageContentProps } from './page-content';
export type { PageFooterProps } from './page-footer';
export type { PageHeaderProps } from './page-header';

export default Page as PageType;
