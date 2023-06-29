/**
 * Copyright © 2023 Johnson & Johnson
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
  varyDesigns,
} from '@bodiless/fclasses';
import {
  VitalCarouselClean,
  withEditor,
  vitalCarousel,
} from '@bodiless/vital-carousel';
import { vitalImage } from '@bodiless/vital-image';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent, withNode, withNodeKey } from '@bodiless/data';
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

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(VitalCarouselClean)(
    withEditor(CAROUSEL_NODE_KEY),
    withImageSlide,
    withNode,
    vitalCarousel.Default,
  ),
};

const CarouselVariations = {
  Default: '',
  NavButtons: vitalCarousel.WithNavigationButtons,
  InfiteLoop: as(vitalCarousel.WithInfinitiveLoop, vitalCarousel.WithNavigationButtons),
  AutoPlay: vitalCarousel.WithAutoPlay,
};

const vitalCarouselVariations = varyDesigns(
  BaseVariation,
  CarouselVariations,
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalCarouselVariations,
  },
});

// Setup Default Data
const image1 = {
  src: 'https://placehold.co/1400x300/ff0000/FFF',
  alt: 'red',
  title: 'red'
};
const image2 = {
  src: 'https://placehold.co/1400x300/00ff00/FFF',
  alt: 'green',
  title: 'green'
};
const image3 = {
  src: 'https://placehold.co/1400x300/0000ff/FFF',
  alt: 'blue',
  title: 'blue'
};

const data = {
  examples$Default$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$Default$slides$image1$defaultlandscapeimage: image1,
  examples$Default$slides$image2$defaultlandscapeimage: image2,
  examples$Default$slides$image3$defaultlandscapeimage: image3,
  examples$NavButtons$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$NavButtons$slides$image1$defaultlandscapeimage: image1,
  examples$NavButtons$slides$image2$defaultlandscapeimage: image2,
  examples$NavButtons$slides$image3$defaultlandscapeimage: image3,
  examples$InfiteLoop$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$InfiteLoop$slides$image1$defaultlandscapeimage: image1,
  examples$InfiteLoop$slides$image2$defaultlandscapeimage: image2,
  examples$InfiteLoop$slides$image3$defaultlandscapeimage: image3,
  examples$AutoPlay$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$AutoPlay$slides$image1$defaultlandscapeimage: image1,
  examples$AutoPlay$slides$image2$defaultlandscapeimage: image2,
  examples$AutoPlay$slides$image3$defaultlandscapeimage: image3,
};

export const Carousel = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Carousel</>),
    Description: replaceWith(() => <>The following are examples of Vital Carousel.</>),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      vitalCarouselFlowContainer,
      withDefaultContent(data),
    ),
  },
});
