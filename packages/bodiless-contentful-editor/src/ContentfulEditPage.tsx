/**
 * Copyright © 2019 Johnson & Johnson
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

import React, {
  FC,
  ComponentType,
  Fragment,
  useEffect,
  useState
} from 'react';
import {
  NotificationProvider,
  withNotificationButton,
  withSwitcherButton,
  OnNodeErrorNotification,
  ContextWrapperProps,
} from '@bodiless/core';
import { observer } from 'mobx-react';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import { withPageDisableButton } from '@bodiless/components';
import {
  PageDataProvider,
  withRedirectAliasButton,
} from '@bodiless/page';

import { PageProps } from '@bodiless/gatsby-theme-bodiless';
import { SDKProvider, useSDK } from '@contentful/react-apps-toolkit';
import { ContentfulStoreProvider } from './ContentfulEditProvider';
import { ContentfulEditPageButtons } from './ContentfulEditPageButtons';
import { ContentfulClientDataRetriever } from './ContentfulClientDataRetriever';

const defaultUI: FinalUI = {
  ContextWrapper,
  PageEditor,
};

type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};

type UI = Partial<FinalUI>;

const getUI = (ui: UI = {}): FinalUI => ({ ...defaultUI, ...ui });

const NotificationButton = withNotificationButton(Fragment);
const SwitcherButton = withSwitcherButton(Fragment);
const DisablePageButton = withPageDisableButton(Fragment);
const RedirectAliasButton = withRedirectAliasButton(Fragment);

export type ContentfulPageProp = Omit<PageProps, 'gitInfo' | 'data'>;

export const ContentfulStoreProviderWithSDK: FC<ContentfulPageProp> = ({
  children,
  ui,
  pageData,
  pageContext
}) => {
  const sdk = useSDK();
  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  const {
    // @ts-ignore non-existing gitInfo, subPageTemplate, and template, types in pageContext.
    slug,
  } = pageContext;

  const [contentfulData, setContentfulData] = useState(new Map());

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getData() {
      const contentfulData = await ContentfulClientDataRetriever(
        sdk, slug
      );
      setContentfulData(contentfulData);
    }

    getData();
  }, []);

  return contentfulData.get('sdk') ? (
    <ContentfulStoreProvider pageContext={pageContext} data={contentfulData}>
      <PageDataProvider pageData={pageData}>
        <NotificationProvider>
          <SwitcherButton />
          <NotificationButton />
          <Editor>
            <OnNodeErrorNotification />
            <ContentfulEditPageButtons />
            <DisablePageButton />
            <Wrapper clickable>
              {children}
            </Wrapper>
            <RedirectAliasButton />
          </Editor>
        </NotificationProvider>
      </PageDataProvider>
    </ContentfulStoreProvider>
  ): <>Waiting for the SDK to be loaded</>;
};

export const ContentfulEditPage: FC<ContentfulPageProp> = observer((props) => (
  <SDKProvider>
    <ContentfulStoreProviderWithSDK {...props} />
  </SDKProvider>
));
