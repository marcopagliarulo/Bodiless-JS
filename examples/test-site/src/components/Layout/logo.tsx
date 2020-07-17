/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { FC, ComponentType, HTMLProps } from 'react';
import { Link } from 'gatsby';
import { flow } from 'lodash';
import {
  addClasses,
  withDesign,
  designable,
  DesignableComponentsProps,
  Div,
  Img,
} from '@bodiless/fclasses';

type LogoComponents = {
  SiteReturn: ComponentType<any>,
  SiteLogo: ComponentType<any>,
};
export type Props = {
  siteLogo: string,
} & DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;

const logoComponents:LogoComponents = {
  SiteReturn: Div,
  SiteLogo: Img,
};
const Logo: FC<Props> = ({ siteLogo, components }) => {
  const {
    SiteReturn,
    SiteLogo,
  } = components;

  return (
    <SiteReturn>
      <Link to="/">
        <SiteLogo src={siteLogo} alt="Return To Home" />
      </Link>
    </SiteReturn>
  );
};
const asLogo = flow(
  designable(logoComponents),
  withDesign({
    SiteReturn: addClasses('py-4 px-2'),
    SiteLogo: addClasses('h-16'),
  }),
);

export default asLogo(Logo);
