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
} from '@bodiless/vital-carousel';
import { asFluidToken } from '@bodiless/vital-elements';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import { withDefaultContent } from '@bodiless/data';
import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BaseVariation = {
  // using '' means it won't add any string to name key of the variations
  '': on(VitalCarouselClean)(
    vitalCarousel.Default,
  ),
};

const CarouselVariations = {
  Image: vitalCarousel.WithImageSlide,
  Card: vitalCarousel.WithCardSlide,
};

const ControlVariations = {
  '': '',
  Dots: as(vitalCarousel.WithCarouselDots, vitalCarousel.ForSection),
  Thumbs: as(vitalCarousel.WithThumbnail, vitalCarousel.ForPDP),
};

const vitalCarouselVariations = varyDesigns(
  BaseVariation,
  CarouselVariations,
  ControlVariations,
);

const vitalCarouselFlowContainer = asFluidToken({
  Components: {
    ...vitalCarouselVariations
  },
});

// Setup Default Data
const image1 = {
  src: 'https://placehold.co/600x600/ff0000/FFF',
  alt: 'red',
  title: 'red'
};
const image2 = {
  src: 'https://placehold.co/600x600/00ff00/FFF',
  alt: 'green',
  title: 'green'
};
const image3 = {
  src: 'https://placehold.co/600x600/0000ff/FFF',
  alt: 'blue',
  title: 'blue'
};

// const data = {
//   examples$MobileProductCarousel$slides: {
//     items: ['card1', 'card2', 'card3', 'card4', 'card5'],
//   },
//   examples$TabletProductCarousel$slides: {
//     items: ['card1', 'card2', 'card3', 'card4', 'card5'],
//   },
//   examples$DesktopProductCarousel$slides: {
//     items: ['card1', 'card2', 'card3', 'card4', 'card5'],
//   },
// };

const data = {
  examples$Image$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5'],
  },
  examples$Image$slides$image1$image: image1,
  examples$Image$slides$image2$image: image2,
  examples$Image$slides$image3$image: image3,
  examples$Image$slides$image4$image: image1,
  examples$Image$slides$image5$image: image2,
  examples$ImageDots$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5'],
  },
  examples$ImageDots$slides$image1$image: image1,
  examples$ImageDots$slides$image2$image: image2,
  examples$ImageDots$slides$image3$image: image3,
  examples$ImageDots$slides$image4$image: image1,
  examples$ImageDots$slides$image5$image: image2,
  examples$ImageThumbs$slides: {
    items: ['image1', 'image2', 'image3', 'image4', 'image5'],
  },
  examples$ImageThumbs$slides$image1$image: image1,
  examples$ImageThumbs$slides$image2$image: image2,
  examples$ImageThumbs$slides$image3$image: image3,
  examples$ImageThumbs$slides$image4$image: image1,
  examples$ImageThumbs$slides$image5$image: image2,
  examples$Card$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$CardThumbs$slides: {
    items: ['card1', 'card2', 'card3', 'card4', 'card5'],
  },
  examples$CardDots$slides: {
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
