import React, { useEffect } from 'react';
import { HOC, as } from '@bodiless/fclasses';
import {
  BodilessStoreProvider, PageEditor, useEditContext, BodilessMobxStore,
  BodilessStore,
} from '@bodiless/core';
import { LocalContextMenu } from '@bodiless/core-ui';
import { ContentfulEditClient } from './ContentfulEditClient';

class DefaultStore
  extends BodilessMobxStore<Map<string, any>>
  implements BodilessStore<Map<string, any>> {
  // eslint-disable-next-line class-methods-use-this
  parseData(rawData: Map<string, any>) {
    return rawData;
  }
}

export class ContentfulEditStoreProvider extends BodilessStoreProvider {
  /**
   * Creates the store which will be provided.
   *
   * @param config
   */
  protected createStore(): BodilessStore<any> {
    const { data } = this.props;
    const sdk = data.get('sdk');
    data.delete('sdk');
    return new DefaultStore({ slug: this.slug, client: new ContentfulEditClient(sdk) });
  }
}

const ui = {
  GlobalContextMenu: () => null,
  LocalContextMenu,
  PageOverlay: () => null,
};

export const withPageEditor: HOC = Component => props => (
  <PageEditor ui={ui}>
    <Component {...props} />
  </PageEditor>
);

export const withAlwaysEditable: HOC = Component => props => {
  const c = useEditContext();
  useEffect(() => c.toggleEdit(true), []);
  return <Component {...props} />;
};

export const withEditBodilessStore: HOC = Component => props => (
  <ContentfulEditStoreProvider
    data={new Map()}
    pageContext={{ slug: './' }}
  >
    <Component {...props} />
  </ContentfulEditStoreProvider>
);

export const ContentfulEditProvider = as(
  withPageEditor,
  withAlwaysEditable,
  withEditBodilessStore,
)('div');

export const withContentfulEditProvider: HOC = Component => props => (
  <ContentfulEditProvider>
    <Component {...props} />
  </ContentfulEditProvider>
);
