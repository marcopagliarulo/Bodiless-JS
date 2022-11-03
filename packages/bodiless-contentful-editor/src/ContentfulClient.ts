/* eslint-disable no-console */
import { BodilessStoreBackend } from '@bodiless/core';
import { AxiosPromise, AxiosResponse } from 'axios';
import { createClient } from 'contentful-management';
import { KnownSDK } from '@contentful/app-sdk';

import type { PlainClientAPI, EntryProps, KeyValueMap, CollectionProp } from 'contentful-management';

type ContentfulPageData = {
  path: KeyValueMap,
  template?: KeyValueMap
};

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
          statusText: 'Error: content type page doesn\'t exists',
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

  createPage(payload: ContentfulPageData) {
    return this.cma.entry.create(
      {contentTypeId: 'page'},
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

  publishPage(entryId: string, props: EntryProps) {
    return this.cma.entry.publish({ entryId }, props)
      .catch(() => {
        throw new Error(JSON.stringify({
          ...this.response,
          status: 500,
          statusText: 'Error: Unable to publish the page.',
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
      .then(() => this.createPage(payload))
      .then((props: EntryProps) => {
        const entryId = props.sys.id;
        return this.publishPage(entryId, props)
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

  /**
   * Posts a message back to the parent window containing the data to be serialized.
   * Note - these data should be **merged** with data which were previously serialized.
   */
   savePath(resourcePath: string, data: any): Promise<any> {
    console.log(resourcePath);
    console.log(JSON.parse(JSON.stringify(data)));
    return Promise.resolve();
  }

  deletePath(): Promise<any> {
    console.log('deletePath');
    // No need to worry about deleting items.
    return Promise.resolve();
  }

  get(resourcePath: string) {
    console.log('get');
    return Promise.resolve();
  }

  post(resourcePath: string, data: any) {
    console.log('post');
    return Promise.resolve();
  }

  delete(resourcePath: string) {
    console.log('delete');
    return Promise.resolve();
  }

  disablePage(path: string) {
  }

  log() {
    console.log('log');
    return Promise.resolve();
  }

  clonePage(origin: string, destination: string) {
    const payload = {
      origin,
      destination,
    };
    console.log('clonePage');
    console.log(payload);
    return Promise.resolve() as unknown as AxiosPromise<any>;
  }

  movePage(origin: string, destination: string) {
    const payload = {
      origin,
      destination,
    };
    console.log(payload);
    console.log('movePage');
    return Promise.resolve() as unknown as AxiosPromise<any>;
  }

}
