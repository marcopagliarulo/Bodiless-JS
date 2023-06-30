import React, { FC } from 'react';
import { HOC } from '@bodiless/fclasses';
import { useIsCarouselItemActive } from './hooks';

// Used to add accessiblity for controls dots/thumbs.
const withCarouselItemTabIndex: HOC = Component => {
  const WithCarouselItemTabIndex: FC<any> = props => {
    const isItemActive = useIsCarouselItemActive();
    const tabIndex = isItemActive ? 0 : -1;
    return <Component {...props} tabIndex={tabIndex} />;
  };
  return WithCarouselItemTabIndex;
};

export default withCarouselItemTabIndex;
