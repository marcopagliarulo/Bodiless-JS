import React, { ReactNode } from 'react';
import {
  Html,
  Head,
  Main,
  NextScript
} from 'next/document';
import { Helmet } from 'react-helmet';

type DocumentProps = {
  PreHead?: ReactNode | JSX.Element
  PostHead?: ReactNode | JSX.Element
  PreBody?: ReactNode | JSX.Element
  PostBody?: ReactNode | JSX.Element
};

export default function Document(documentProps?: DocumentProps) {
  const {
    PreHead = null,
    PostHead = null,
    PreBody = null,
    PostBody = null
  } = documentProps || {};

  return () => {
    const helmet = Helmet.renderStatic();
    const helmetComponents = [
      helmet.link.toComponent(),
      helmet.meta.toComponent(),
      helmet.noscript.toComponent(),
      helmet.script.toComponent(),
      helmet.style.toComponent(),
      helmet.base.toComponent(),
    ];

    // Push default viewport.
    if (helmet.meta.toString().search('name="viewport"') === -1) {
      helmetComponents.push(
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      );
    }

    return (
      <Html {...helmet.htmlAttributes.toComponent()}>
        <Head>
          {PreHead}
          {helmetComponents}
          {PostHead}
        </Head>
        <body {...helmet.bodyAttributes.toComponent()}>
          {PreBody}
          <Main />
          {PostBody}
          <NextScript />
        </body>
      </Html>
    );
  };
}
