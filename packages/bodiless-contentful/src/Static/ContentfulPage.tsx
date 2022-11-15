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
  useEffect,
  useState
} from 'react';
import {
  ContextWrapperProps,
  StaticPage,
} from '@bodiless/core';
import { ContextWrapper, PageEditor } from '@bodiless/core-ui';
import {
  PageDataProvider,
} from '@bodiless/page';
import {
  Fragment,
  withShowDesignKeys,
} from '@bodiless/fclasses';
import { createClient } from 'contentful';

import { ContentfulStoreProvider } from './ContentfulProvider';
import { ContentfulClientDataRetriever } from './ContentfulClientDataRetriever';
import { ContentfulPageProp } from '../Types';

const ShowDesignKeys = (
  process.env.NODE_ENV === 'development' || process.env.BODILESS_SHOWDESIGNKEYS === '1'
) ? withShowDesignKeys()(Fragment) : Fragment;

const defaultUI: FinalUI = {
  ContextWrapper,
  PageEditor,
};

type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};

type UI = Partial<FinalUI>;

const getUI = (ui: UI = {}): Omit<FinalUI, 'PageEditor'> => ({ ...defaultUI, ...ui });

export const ContentfulPage: FC<ContentfulPageProp> = ({
  children,
  ui,
  data,
  pageData,
  pageContext
}) => {
  const { ContextWrapper: Wrapper } = getUI(ui);
  const {
    // @ts-ignore non-existing gitInfo, subPageTemplate, and template, types in pageContext.
    slug,
  } = pageContext;

  const [contentfulData, setContentfulData] = useState(data);

  if (!process.env.BODILESS_CONTENTFUL_SPACE_ID || !process.env.BODILESS_CONTENTFUL_ACCESS_TOKEN) {
    throw new Error('Configure BODILESS_CONTENTFUL_SPACE_ID and BODILESS_CONTENTFUL_ACCESS_TOKEN to get access to contentful');
  }

  const client = createClient({
    space: process.env.BODILESS_CONTENTFUL_SPACE_ID,
    accessToken: process.env.BODILESS_CONTENTFUL_ACCESS_TOKEN
  });

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getData() {
      const contentfulData = await ContentfulClientDataRetriever(client, slug);
      setContentfulData(contentfulData);
    }

    getData();
  }, []);

  return (
    <ContentfulStoreProvider pageContext={pageContext} data={contentfulData}>
      <PageDataProvider pageData={pageData}>
        <ShowDesignKeys>
          <StaticPage>
            <Wrapper>
              {children}
            </Wrapper>
          </StaticPage>
        </ShowDesignKeys>
      </PageDataProvider>
    </ContentfulStoreProvider>
  );
};
