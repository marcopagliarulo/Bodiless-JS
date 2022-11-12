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

export type PageProps = {
  ui?: UI,
} & DesignableProps & React.ComponentProps<typeof ContentfulStoreProvider>
& PageDataContextProviderProps;

export const asBodilessPage: Enhancer<PageProps, DesignableProps<any>> = Component => {
  const AsBodilessPage: FC<any> = (props: PageProps) => {
    const { design, ...rest } = props;
    const designProp: any = { design };
    return (
      <ContentfulPage {...rest}>
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
