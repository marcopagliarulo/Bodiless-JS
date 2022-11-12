import { PageProps } from '@bodiless/gatsby-theme-bodiless';

export type ContentfulPageProp = Omit<PageProps, 'gitInfo' | 'data'>;
