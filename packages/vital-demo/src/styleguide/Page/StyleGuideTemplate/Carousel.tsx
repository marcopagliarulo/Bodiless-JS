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
  as,
  varyDesigns,
} from '@bodiless/fclasses';
import {
  VitalCarouselClean,
  withEditor,
  vitalCarousel,
  asVitalCarouselToken,
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent, withNode } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

export const CAROUSEL_NODE_KEY = 'slides';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(VitalCarouselClean)(
    withEditor(CAROUSEL_NODE_KEY),
    withNode,
    vitalCarousel.WithImageSlide,
    vitalCarousel.Default,
  ),
};

const forceHalf = asVitalCarouselToken({
  Theme: {
    Wrapper: 'w-1/2'
  }
});

const CarouselVariations = {
  Default: '',
  NavButtons: vitalCarousel.WithNavigationButtons,
  InfiniteLoop: as(vitalCarousel.WithInfinitiveLoop, vitalCarousel.WithNavigationButtons),
  AutoPlay: vitalCarousel.WithAutoPlay,
  Thumbs: as(
    vitalCarousel.WithThumbnail,
    vitalCarousel.WithNavigationButtons,
    forceHalf, // forcing half since this is how it will dispaly on PDP
  ),

  Dots: as(
    vitalCarousel.WithCarouselDots,
    vitalCarousel.WithNavigationButtons,
  ),
  Peek: as(
    vitalCarousel.WithPeek,
    vitalCarousel.WithCarouselDots,
  ),
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
const squareimage1 = {
  src: 'https://placehold.co/800x800/ff0000/FFF',
  alt: 'red',
  title: 'red'
};
const squareimage2 = {
  src: 'https://placehold.co/800x800/00ff00/FFF',
  alt: 'green',
  title: 'green'
};
const squareimage3 = {
  src: 'https://placehold.co/800x800/0000ff/FFF',
  alt: 'blue',
  title: 'blue'
};

const data = {
  examples$NavButtons$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$NavButtons$slides$image1$image: image1,
  examples$NavButtons$slides$image2$image: image2,
  examples$NavButtons$slides$image3$image: image3,
  examples$InfiniteLoop$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$InfiniteLoop$slides$image1$image: image1,
  examples$InfiniteLoop$slides$image2$image: image2,
  examples$InfiniteLoop$slides$image3$image: image3,
  examples$AutoPlay$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$AutoPlay$slides$image1$image: image1,
  examples$AutoPlay$slides$image2$image: image2,
  examples$AutoPlay$slides$image3$image: image3,
  examples$Thumbs$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$Thumbs$slides$image1$image: squareimage1,
  examples$Thumbs$slides$image2$image: squareimage2,
  examples$Thumbs$slides$image3$image: squareimage3,
  examples$Dots$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$Dots$slides$image1$image: image1,
  examples$Dots$slides$image2$image: image2,
  examples$Dots$slides$image3$image: image3,
  examples$Peek$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$Peek$slides$image1$image: image1,
  examples$Peek$slides$image2$image: image2,
  examples$Peek$slides$image3$image: image3,
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
