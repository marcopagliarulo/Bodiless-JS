import React from 'react';
import { asFluidToken } from '@bodiless/vital-elements';
import { ArticleCardClean, vitalArticleCard } from '@bodiless/vital-card';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, replaceWith, on, varyDesigns, addProps
} from '@bodiless/fclasses';

import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

const BasicVariation = {
  Card: on(ArticleCardClean)(vitalArticleCard.Default),
};

/*
 * Content Variations to use all fields or remove specic fields.
 */
// const ContentVariations = {
//   WithEyebrow: vitalArticleCard.WithEyebrow,
//   WithDescription: vitalArticleCard.WithDescription,
// };

/*
 * Vary Vertical Variations over Content Varitions
 */
const OrientationVariations = varyDesigns(
  {
    Horizontal: vitalArticleCard.WithHorizontalOrientation,
    Vertical: vitalArticleCard.WithVerticalOrientation,
  },
  {
    WithDescription: vitalArticleCard.WithDescription,
  },
  {
    WithEyebrow: vitalArticleCard.WithEyebrow,
  }
);

const ArticleCardVariations = varyDesigns(
  BasicVariation,
  OrientationVariations,
);

const WithArticleCardVariations = asFluidToken({
  Components: {
    ...ArticleCardVariations,
  },
});

// @todo Provide actual default image in package rather than manual upload.
const image = {
  src: '/images/pages/styleguide/card/89e732f5d5bfe4a4a80eebfa4e01a8bd/image1.png',
  alt: '',
  title: '',
  preset: 'fluid_withWebp'
};

const title = {
  text: 'Example Card Title TEST'
};

const description = [
  {
    type: 'paragraph',
    children: [
      {
        text: 'Lorem ipsum '
      },
      {
        text: 'dolor',
        Bold: true
      },
      {
        text: ' sit amet'
      },
      {
        text: 'super',
        SuperScript: true
      },
      {
        text: ', consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. '
      }
    ]
  }
];

const link = {
  href: '#',
  buttontext: 'Read More'
};

const content = {
  description, image, link, title,
};

export const ArticleCard = asStyleGuideTemplateToken(vitalStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Carousel'),
  Content: {
    Title: replaceWith(() => <>Article Cards</>),
    Description: replaceWith(() => (
      <>
        The following are examples of Article Cards.
        {' '}
      </>
    )),
    Examples: on(StyleGuideExamplesClean)(
      vitalStyleGuideExamples.Default,
      WithArticleCardVariations,
      addProps({ content }),
    ),
  },
});
