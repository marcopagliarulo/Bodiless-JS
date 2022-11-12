import React from 'react';
import { HOC, as } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, BodilessMobxStore,
  BodilessStore,
} from '@bodiless/core';

class DefaultStore
  extends BodilessMobxStore<Map<string, any>>
  implements BodilessStore<Map<string, any>> {
  // eslint-disable-next-line class-methods-use-this
  parseData(rawData: Map<string, any>) {
    return rawData;
  }
}

export class ContentfulStoreProvider extends BodilessStoreProvider {
  /**
   * Creates the store which will be provided.
   *
   * @param config
   */
   protected createStore(): BodilessStore<any> {
    return new DefaultStore( { slug: '' });
  }
}

export const withBodilessStore: HOC = Component => props => (
  <ContentfulStoreProvider
    data={new Map()}
    pageContext={{ slug: './' }}
  >
    <Component {...props} />
  </ContentfulStoreProvider>
);

export const ContentfulProvider = as(
  withBodilessStore,
)('div');

export const withContentfulProvider: HOC = Component => props => (
  <ContentfulProvider>
    <Component {...props} />
  </ContentfulProvider>
);
