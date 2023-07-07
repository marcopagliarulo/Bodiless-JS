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
  vitalCarousel,
  asVitalCarouselToken,
  CAROUSEL_NODE_KEY,
  withEditor,
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent, withNode } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(VitalCarouselClean)(
    withEditor(CAROUSEL_NODE_KEY),
    withNode,
    vitalCarousel.WithImageSlide,
    vitalCarousel.Default,
  ),
};

const CardVariations = {
  '': on(VitalCarouselClean)(
    withEditor(CAROUSEL_NODE_KEY),
    withNode,
    vitalCarousel.WithCardSlide,
    vitalCarousel.Default,
    vitalCarousel.WithCarouselDots
  ),
};

const forceHalf = asVitalCarouselToken({
  Theme: {
    Wrapper: 'md:w-1/2'
  }
});

const CarouselVariations = {
  Default: '',
  NavButtons: vitalCarousel.WithNavigationButtons,
  InfiniteLoop: as(vitalCarousel.WithInfinitiveLoop, vitalCarousel.WithNavigationButtons),
  AutoPlay: vitalCarousel.WithAutoPlay,
};

const vitalCarouselVariations = varyDesigns(
  BaseVariation,
  CarouselVariations,
);

const vitalPDPVariations = varyDesigns(
  BaseVariation,
  {
    MobilePDPCarousel: as(
      vitalCarousel.WithCarouselDots,
      vitalCarousel.WithPeek,
      vitalCarousel.MobileOnly
    ),
    DesktopTabletPDPCarousel: as(
      vitalCarousel.WithThumbnail,
      vitalCarousel.WithNavigationButtons,
      vitalCarousel.TabletDesktopOnly,
      forceHalf, // forcing half since this is how it will display on PDP
    ),
  },
);

const vitalCardCarouselVariations = varyDesigns(
  CardVariations,
  {
    MobileProductCarousel: as(vitalCarousel.WithPeek, vitalCarousel.MobileOnly),
    TabletProductCarousel: as(vitalCarousel.WithThreeSlides, vitalCarousel.TabletOnly),
    DesktopProductCarousel: as(vitalCarousel.WithFourSlides, vitalCarousel.DesktopOnly),
  },
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalCarouselVariations,
    ...vitalCardCarouselVariations,
    ...vitalPDPVariations,
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
  examples$MobilePDPCarousel$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$MobilePDPCarousel$slides$image1$image: squareimage1,
  examples$MobilePDPCarousel$slides$image2$image: squareimage2,
  examples$MobilePDPCarousel$slides$image3$image: squareimage3,
  examples$DesktopTabletPDPCarousel$slides: {
    items: ['image1', 'image2', 'image3'],
  },
  examples$DesktopTabletPDPCarousel$slides$image1$image: squareimage1,
  examples$DesktopTabletPDPCarousel$slides$image2$image: squareimage2,
  examples$DesktopTabletPDPCarousel$slides$image3$image: squareimage3,
  examples$MobileProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$TabletProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$DesktopProductCarousel$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
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
