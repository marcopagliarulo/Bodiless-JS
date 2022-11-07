/* eslint-disable no-console */
import { BodilessStoreBackend } from '@bodiless/core';
import { AxiosResponse } from 'axios';
import { createClient } from 'contentful-management';
import { KnownSDK } from '@contentful/app-sdk';

import type { PlainClientAPI, EntryProps, CollectionProp } from 'contentful-management';

export class ContentfulClient implements BodilessStoreBackend {
  private cma: PlainClientAPI;

  private response: AxiosResponse;

  constructor(sdk: KnownSDK) {
    this.cma = createClient(
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

    this.response = {
      data: {},
      status: 201,
      statusText: '',
      headers: {},
      config: {}
    };
  }

  getContentType(contentTypeId: string) {
    return this.cma.contentType.get({contentTypeId})
      .catch(() => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 501,
          statusText: 'Error: content type doesn\'t exists',
        }));
      });
  }

  getPage(path: string) {
    return this.cma.entry.getMany({
      query: {
        content_type: 'page',
        'fields.path': path,
      }
    });
  }

  createEntry(contentTypeId: string, payload: any) {
    return this.cma.entry.create(
      {contentTypeId},
      {
        fields: payload,
      }
    )
      .catch((error) => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 500,
          statusText: `Error: ${JSON.parse(error.message).message}`,
        }));
      });
  }

  updateEntry(entryId: string, props: EntryProps) {
    return this.cma.entry.update(
      { entryId },
      {
        ...props,
      }
    )
      .catch((error) => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 500,
          statusText: `Error: ${JSON.parse(error.message).message}`,
        }));
      });
  }

  publishEntry(entryId: string, props: EntryProps) {
    return this.cma.entry.publish({ entryId }, props)
      .catch(() => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 500,
          statusText: 'Error: Unable to publish the entry.',
        }));
      });
  }

  unpublishEntry(entryId: string) {
    return this.cma.entry.unpublish({ entryId })
      .catch(() => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 500,
          statusText: 'Error: Unable to unpublish the entry.',
        }));
      });
  }

  savePage(path: string, template?: string) {
    const data = {
      path,
      template: template || '_default'
    };

    const payload = {
      path: {
        'en-US': path
      },
      template: {
        'en-US': template || '_default'
      }
    };

    // Retrieve the content type page.
    return this.getContentType('page')
      .then(() => this.getPage(path))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total > 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${path} already exists`,
          }));
        }
      })
      .then(() => this.createEntry('page', payload))
      .then((props: EntryProps) => {
        const entryId = props.sys.id;
        return this.publishEntry(entryId, props)
          .then(() => ({ ...this.response, data }));
      })
      .catch((error) => JSON.parse(error.message));
  }

  deletePage(path: string) {
    return this.getContentType('page')
      .then(() => this.getPage(path))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${path} doesn't exists`,
          }));
        }
        return entries;
      })
      .then((entries: CollectionProp<EntryProps>) => {
        const entryId = entries.items[0].sys.id;
        this.cma.entry.delete({ entryId });
      })
      .catch((error) => JSON.parse(error.message));
  }

  getPath(path: string) {
    return this.cma.entry.getMany({
      query: {
        content_type: 'path',
        'fields.path': path,
      }
    });
  }

  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
  savePath(resourcePath: string, data: any): Promise<any> {
    const payload = {
      path: {
        'en-US': resourcePath
      },
      content: {
        'en-US': JSON.parse(JSON.stringify(data))
      }
    };

    return this.getContentType('path')
      .then(() => this.getPath(resourcePath))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          return this.createEntry('path', payload);
        }
        const entryId = entries.items[0].sys.id;
        const props = { ...entries.items[0], ...{ fields: payload} };
        return this.updateEntry(entryId, props);
      })
      .then((props: EntryProps) => {
        const entryId = props.sys.id;
        return this.publishEntry(entryId, props)
          .then(() => ({ ...this.response, data }));
      })
      .catch((error) => JSON.parse(error.message));
  }

  deletePath(resourcePath: string): Promise<any> {
    return this.getContentType('path')
      .then(() => this.getPath(resourcePath))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${resourcePath} doesn't exists`,
          }));
        }
        return entries;
      })
      .then((entries: CollectionProp<EntryProps>) => {
        const entryId = entries.items[0].sys.id;
        return this.cma.entry.unpublish({ entryId });
      })
      .then((props: EntryProps) => {
        const entryId = props.sys.id;
        return this.cma.entry.delete({ entryId });
      })
      .catch((error) => JSON.parse(error.message));
  }

  disablePage(path: string) {
    return this.getContentType('page')
      .then(() => this.getPage(path))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${path} doesn't exists`,
          }));
        }
        const entryId = entries.items[0].sys.id;
        return this.unpublishEntry(entryId)
          .then(() => ({ ...this.response }));
      });
  }

  clonePage(origin: string, destination: string) {
    const payload = {
      path: {
        'en-US': destination
      },
    };
    return this.getContentType('page')
      .then(() => this.getPage(origin))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${origin} doesn't exists`,
          }));
        }
        const props = { ...entries.items[0], ...{ fields: payload} };
        return this.createEntry('page', props)
          .then(() => ({ ...this.response, ...{ data: { origin, destination } } }));
      })
      .catch((error) => JSON.parse(error.message));
    // Handle content clone from here.
  }

  movePage(origin: string, destination: string) {
    const payload = {
      path: {
        'en-US': destination
      },
    };
    return this.getContentType('page')
      .then(() => this.getPage(origin))
      .then((entries: CollectionProp<EntryProps>) => {
        if (entries.total === 0) {
          throw new Error(JSON.stringify({
            ...this.response,
            status: 409,
            statusText: `Error: page ${origin} doesn't exists`,
          }));
        }
        const entryId = entries.items[0].sys.id;
        const props = { ...entries.items[0], ...{ fields: payload} };
        return this.updateEntry(entryId, props)
          .then(() => ({ ...this.response, ...{ data: { origin, destination } } }));
      })
      .catch((error) => JSON.parse(error.message));
  }
}
