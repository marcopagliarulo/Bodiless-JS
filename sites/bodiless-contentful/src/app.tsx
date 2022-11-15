import React from 'react';
import { render } from 'react-dom';
import './css/style.css';
import './css/edit.css';
import {
  EditorExtensionSDK,
  init,
  locations,
} from '@contentful/app-sdk';

// @ts-ignore
import DefaultPage from './templates/_default';

type EntryEditorProps = {
  sdk: EditorExtensionSDK,
};

const EntryEditor = ({sdk}: EntryEditorProps) => {
  const { entry } = sdk;

  const template = entry.fields.template.getValue();

  const pageContext = {
    slug: entry.fields.path.getValue(),
    subPageTemplate: '',
  };

  const pageData = {
    template,
    subPageTemplate: '',
    pagePath: pageContext.slug
  };

  return React.createElement(
    DefaultPage,
    {
      pageContext,
      pageData,
    }
  );
};

const Page = () => {
  const pageContext = {
    slug: window.location.pathname,
    subPageTemplate: '_default',
  };

  const pageData = {
    template: '',
    subPageTemplate: '_default',
    pagePath: pageContext.slug
  };

  return React.createElement(
    DefaultPage,
    {
      pageContext,
      pageData,
    }
  );
};

// eslint-disable-next-line consistent-return
init((sdk) => {
  if (sdk.location.is(locations.LOCATION_PAGE)) {
    render(<Page />, document.getElementById('root'));
  } else if (sdk.location.is(locations.LOCATION_ENTRY_EDITOR)) {
    // @ts-ignore
    render(<EntryEditor sdk={sdk} />, document.getElementById('root'));
    return null;
  } else {
    return null;
  }
});
