import { Fragment } from 'react';
import { as } from '@bodiless/fclasses';
import { vitalPage } from '@bodiless/vital-templates';

const DefaultPage = as(
  vitalPage.Default,
  vitalPage.WithSearchContext
)(Fragment);

export default DefaultPage;
