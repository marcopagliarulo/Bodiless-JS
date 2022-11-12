import { BodilessMobxStore } from '@bodiless/core';
import { ContentfulClientApi, Entry } from 'contentful';
import {
  CONTENTFUL_PAGE_CONTENT_TYPE,
  CONTENTFUL_NODE_CONTENT_TYPE
} from '../Constants';

type Page = {
  path: String,
  template: String
};

type Node = {
  path: String,
  content: Object
};

export const ContentfulClientDataRetriever = async (
  client: ContentfulClientApi,
  pagePath: string
) => {
  const result = new Map();
  const pagePathNoTrailing = pagePath === '/' ? pagePath :pagePath.replace(/\/$/, '');
  const trailing = pagePathNoTrailing === '/' ? '' : '/';

  // Temporary store sdk inside data object in order to pass it to the contentful client store.

  // Retrieve the page for the current path.
  const pages = await client.getEntries({
    content_type: CONTENTFUL_PAGE_CONTENT_TYPE,
    'fields.path': pagePathNoTrailing,
  });

  if (pages.total) {
    // Retrieve all the nodes for the current path.
    const { items = [] } = pages;
    if (items.length) {
      const item = items[0] as Entry<Page>;
      const { fields: { path = ''} } = item;
      const nodes = await client.getEntries({
        content_type: CONTENTFUL_NODE_CONTENT_TYPE,
        'fields.path[match]': `pages${path}`,
      });
      nodes.items.forEach(async (node) => {
        const { fields: { path = '', content = {} } } = node as Entry<Node>;
        if (path.replace(`pages${pagePathNoTrailing}${trailing}`, '').indexOf('/') === -1) {
          const key = `Page${BodilessMobxStore.nodeChildDelimiter}${path.replace(`pages${pagePathNoTrailing}/`, '')}`;
          const data = content;
          result.set(key, data);
        }
      });
    }
  }
  // Retrieve the page for the current path.
  const siteEntries = await client.getEntries({
    content_type: CONTENTFUL_NODE_CONTENT_TYPE,
    'fields.path[match]': 'site',
  });

  siteEntries.items.forEach(siteItem => {
    const { fields: { path = '', content = {} } } = siteItem as Entry<Node>;
    const key = `Site${BodilessMobxStore.nodeChildDelimiter}${path.replace('site/', '')}`;
    const data = content;
    result.set(key, data);
  });

  console.log(result);
  return result;
};
