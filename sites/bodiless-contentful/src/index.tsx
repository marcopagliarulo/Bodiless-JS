import React from 'react';
import { render } from 'react-dom';

import DefaultPage from './templates/_default';

const root = document.getElementById('root');

const Page = () => {
  const pageContext = {
    slug: '/',
    subPageTemplate: '_default',
  };

  const pageData = {
    template: '',
    subPageTemplate: '_default',
    pagePath: '/'
  };

  return React.createElement(
    DefaultPage,
    {},
  );
};

render(
  <Page />,
  root
);
