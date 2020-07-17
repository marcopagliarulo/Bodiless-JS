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

import React, { FC, ComponentType, HTMLProps } from 'react';
import { flow } from 'lodash';
import {
  addClasses,
  withDesign,
  designable,
  DesignableComponentsProps,
  Div,
} from '@bodiless/fclasses';
import ResponsiveMenu from '../Menus';
import Logo from './logo';
import {
  asPageContainer,
  asHeader1,
  asPrimaryColorBackground,
} from '../Elements.token';

type HeaderComponents = {
  Wrapper: ComponentType<any>,
  Container: ComponentType<any>,
  Menu: ComponentType<any>,
  SiteLogoReturn: ComponentType<any>,
};
export type Props = {
  siteLogo: string,
} & DesignableComponentsProps<HeaderComponents> & HTMLProps<HTMLElement>;

const headerComponents:HeaderComponents = {
  Wrapper: Div,
  Container: Div,
  Menu: ResponsiveMenu,
  SiteLogoReturn: Logo,
};
const Header: FC<Props> = ({ siteLogo, components }) => {
  const {
    Wrapper,
    Container,
    Menu,
    SiteLogoReturn,
  } = components;

  return (
    <Wrapper>
      <Container>
        <SiteLogoReturn siteLogo={siteLogo} />
      </Container>
      <div className="container mx-auto">
        <Menu nodeKey="MainMenu" nodeCollection="site" siteLogo={siteLogo} />
      </div>
    </Wrapper>
  );
};
const asSiteHeader = flow(
  designable(headerComponents),
  withDesign({
    Wrapper: flow(asPrimaryColorBackground, addClasses('')),
    Container: flow(asPageContainer, addClasses('flex min-h-16 items-end')),
    SiteLogoReturn: flow(asHeader1, addClasses('flex-shrink')),
  }),
);

export default asSiteHeader(Header);
