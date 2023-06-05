/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { ComponentType } from 'react';
import { useNode, NodeProvider } from '@bodiless/data';
import { HOC } from '@bodiless/fclasses';
import type { BreadcrumbStoreType } from './BreadcrumbStore';

const BreadcrumbsStoreContext = React.createContext<BreadcrumbStoreType | undefined>(undefined);
BreadcrumbsStoreContext.displayName = 'BreadcrumbsStoreContext';

/**
 * Component that adds react context provider containing store to its children.
 */
const BreadcrumbStoreProvider: ComponentType<any> = ({ children, store }: any) => (
  <BreadcrumbsStoreContext.Provider value={store}>{children}</BreadcrumbsStoreContext.Provider>
);

/**
 * React hook to get store.
 */
const useBreadcrumbStore = () => React.useContext(BreadcrumbsStoreContext);

/**
 * @private
 *
 * Wrap a breadcrumb source which is rendered only on the server to populate
 * the store before any components which need breadcrumb store data are
 * rendered.
 *
 * @param Component
 */
const asHiddenBreadcrumbSource: HOC = Component => {
  if (typeof window === 'undefined') {
    const AsHiddenBreadcrumbSource = (props: any) => {
      const store = useBreadcrumbStore();
      const { node } = useNode();
      // eslint-disable-next-line global-require
      const reactDomServer = require('react-dom/server');

      reactDomServer.renderToPipeableStream(
        <NodeProvider node={node}>
          <BreadcrumbStoreProvider store={store}>
            <Component {...props} />
          </BreadcrumbStoreProvider>
        </NodeProvider>,
      );
      return null;
    };
    return AsHiddenBreadcrumbSource;
  }
  return () => null;
};

export {
  useBreadcrumbStore,
  BreadcrumbStoreProvider,
  asHiddenBreadcrumbSource,
};
