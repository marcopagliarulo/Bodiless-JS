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

import React, { FC, ComponentType, Fragment } from 'react';
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

type ContentfulPageProp = Omit<PageProps, 'gitInfo'>;

export const ContentfulStoreProviderWithSDK: FC<ContentfulPageProp> = ({
  children,
  ui,
  data = new Map(),
  ...rest
}) => {
  const sdk = useSDK();

  const { PageEditor: Editor, ContextWrapper: Wrapper } = getUI(ui);
  const { pageContext } = rest;
  const {
    // @ts-ignore non-existing gitInfo, subPageTemplate, and template, types in pageContext.
    slug, subPageTemplate, template,
  } = pageContext;

  const pageData = {
    pagePath: slug,
    subPageTemplate,
    template,
  };

  data.set('sdk', sdk);

  return (
    <ContentfulStoreProvider {...rest} data={data}>
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
  );
};

export const ContentfulEditPage: FC<ContentfulPageProp> = observer((props) => (
  <SDKProvider>
    <ContentfulStoreProviderWithSDK {...props} />
  </SDKProvider>
));
