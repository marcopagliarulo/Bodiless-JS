/**
 * Copyright © 2022 Johnson & Johnson
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

import React from 'react';
import {
  flowHoc,
  replaceWith,
  on,
  withDesign,
  as,
  Img,
} from '@bodiless/fclasses';
import {
  CarouselClean,
  asEditableCarousel,
  // withIntrinsicHeight,
  // withNoDragIfEditable,
  withInfinitiveLoop,
  // withCarouselDots,
  // withNavigationButtons,
  // withAutoPlayButton,
  // withAutoPlayInterval,
  // asAccessibleCarousel,
  // withNoAutoPlayIfEditable
} from '@bodiless/carousel';
import { vitalImage } from '@bodiless/vital-image';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withNode, withNodeKey } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';
import 'pure-react-carousel/dist/react-carousel.es.css';

export const CAROUSEL_NODE_KEY = 'slides';

const DefaultLandscapeImage = as(
  vitalImage.Default,
  vitalImage.WithLandscapePlaceholder,
  withNodeKey('defaultlandscapeimage'),
)(Img);

const withImageSlide = withDesign({
  Slider: withDesign({
    Title: replaceWith(DefaultLandscapeImage),
  }),
});

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    Carousel: on(CarouselClean)(
      asEditableCarousel(CAROUSEL_NODE_KEY),
      withImageSlide,
      withInfinitiveLoop,
      withNode,
    ),
  },
});

export const Carousel = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Carousel</>),
    Description: replaceWith(() => <>The following are examples of Vital Carousel.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCarouselFlowContainer,
    ),
  },
});
