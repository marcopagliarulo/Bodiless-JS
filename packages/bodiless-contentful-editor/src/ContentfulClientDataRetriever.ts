import { BodilessMobxStore } from '@bodiless/core';
import { createClient } from 'contentful-management';
import { KnownSDK } from '@contentful/app-sdk';
import type { EntryProps, CollectionProp } from 'contentful-management';

export const ContentfulClientDataRetriever = async (sdk: KnownSDK, pagePath: string) => {
  const cma = createClient(
    { apiAdapter: sdk.cmaAdapter },
    {
      type: 'plain',
      defaults: {
        environmentId: sdk.ids.environmentAlias ?? sdk.ids.environment,
        spaceId: sdk.ids.space,
        organizationId: sdk.ids.organization,
      },
    }
  );
  const result = new Map();

  // Temporary store sdk inside data object in order to pass it to the contentful client store.
  result.set('sdk', sdk);

  await cma.entry.getMany({
    query: {
      content_type: 'page',
      'fields.path': pagePath,
    }
  })
    .then((entries: CollectionProp<EntryProps>) => {
      if (entries.total > 0) {
        entries.items.forEach(item => {
          cma.entry.getMany({
            query: {
              content_type: 'path',
              'fields.path[match]': `pages${item.fields.path['en-US']}`,
            }
          })
            .then((entries: CollectionProp<EntryProps>) => {
              if (entries.total > 0) {
                entries.items.forEach(item => {
                  const pathRegex = new RegExp(`^pages${pagePath.replace('/', '\\/')}`);
                  if (item.fields.path['en-US'].replace(pathRegex, '').indexOf('/') === -1) {
                    const key = `Page${BodilessMobxStore.nodeChildDelimiter}${item.fields.path['en-US'].replace('pages/', '')}`;
                    const data = item.fields.content['en-US'];
                    result.set(key, data);
                  }
                });
              }
            });
        });
      }
    });

  await cma.entry.getMany({
    query: {
      content_type: 'path',
      'fields.path[match]': 'site',
    }
  })
    .then((entries: CollectionProp<EntryProps>) => {
      if (entries.total > 0) {
        entries.items.forEach(item => {
          const key = `Site${BodilessMobxStore.nodeChildDelimiter}${item.fields.path['en-US'].replace('site/', '')}`;
          const data = item.fields.content['en-US'];
          result.set(key, data);
        });
      }
    });

  return result;
};
