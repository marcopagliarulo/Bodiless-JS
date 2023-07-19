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
  varyDesigns,
  as,
} from '@bodiless/fclasses';
import {
  CarouselStatic,
  asVitalCarouselToken,
  vitalCarouselStatic,
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(CarouselStatic)(
    vitalCarouselStatic.Default,
    vitalCarouselStatic.WithImageSlide,
  ),
};

const forceHalf = asVitalCarouselToken({
  Theme: {
    Wrapper: 'md:w-1/2'
  }
});

const vitalPDPVariations = varyDesigns(
  BaseVariation,
  {
    MobilePDPCarousel: as(
      vitalCarouselStatic.WithCarouselDots,
      vitalCarouselStatic.MobileOnly,
    ),
    DesktopTabletPDPCarousel: as(
      vitalCarouselStatic.WithThumbnail,
      vitalCarouselStatic.TabletDesktopOnly,
      forceHalf, // forcing half since this is how it will display on PDP
    ),
  },
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalPDPVariations,
    ProductCardSection: on(CarouselStatic)(
      vitalCarouselStatic.Default,
      vitalCarouselStatic.WithCardSlide,
      vitalCarouselStatic.WithCarouselDots,
    ),
  },
});

// Setup Default Data
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
  examples$ProductCardSection$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
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
