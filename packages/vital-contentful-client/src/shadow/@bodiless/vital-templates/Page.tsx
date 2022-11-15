import React, { ComponentType } from 'react';
import {
  ContextWrapperProps
} from '@bodiless/core';
import {
  PageDataContextProviderProps,
} from '@bodiless/page';
import { withLanguages } from '@bodiless/i18n';
import { vitalPageBase } from '@bodiless/vital-templates';
import { asFluidToken } from '@bodiless/vital-elements';
import type { FC } from 'react';
import type { Enhancer, DesignableProps } from '@bodiless/fclasses';
import { ContentfulPage, ContentfulStoreProvider } from '@bodiless/contentful';

export type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};

export type UI = Partial<FinalUI>;

export type Props = {
  data: any,
  pageContext: {
    slug: string
    data?: any,
  }
};

export type PageProps = {
  ui?: UI,
  data?: Object,
} & DesignableProps & React.ComponentProps<typeof ContentfulStoreProvider>
& PageDataContextProviderProps & Props;

export const asBodilessPage: Enhancer<PageProps, DesignableProps<any>> = Component => {
  const AsBodilessPage: FC<any> = (props: PageProps) => {
    const { design, pageContext, ...rest } = props;
    const designProp: any = { design };
    const { data } = pageContext;

    return (
      <ContentfulPage {...rest} pageContext={pageContext} data={new Map(Object.entries(data))}>
        <Component {...designProp} />
      </ContentfulPage>
    );
  };
  return AsBodilessPage;
};

const BaseWithLanguage = asFluidToken(vitalPageBase.Base, {
  Core: {
    _: withLanguages([
      {
        name: 'en',
        label: 'English',
        isDefault: true,
      },
      {
        name: 'es',
        label: 'Español',
      },
    ]),
  },
});

const Base = asFluidToken(
  {
    ...BaseWithLanguage,
    Schema: {
      _: asBodilessPage,
    },
  }
);

const Default = asFluidToken({
  ...Base,
});

export default {
  ...vitalPageBase,
  Base,
  Default,
};
