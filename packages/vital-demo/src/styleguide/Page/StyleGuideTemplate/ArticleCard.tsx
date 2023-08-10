import React from 'react';
import { asFluidToken } from '@bodiless/vital-elements';
import { ArticleCardClean, vitalArticleCard } from '@bodiless/vital-card';
import { asStyleGuideTemplateToken, vitalStyleGuideTemplate } from '@bodiless/vital-templates';
import {
  flowHoc, replaceWith, on, varyDesigns, addProps, as
} from '@bodiless/fclasses';

import { StyleGuideExamplesClean, vitalStyleGuideExamples } from '../../Examples';

/*
 * Compose the default vertical & horizontal cards
 */
const OrientationVariations = varyDesigns(
  {
    '': on(ArticleCardClean)(vitalArticleCard.Default), // Use '' to not get a name for these
  },
  {
    Horizontal: vitalArticleCard.WithHorizontalOrientation,
    Vertical: vitalArticleCard.WithVerticalOrientation,
  },
);

/*
 * Compose the orientated cards with Descriptions & Eyebrows & Both toggles
 */
const DescriptonVariations = varyDesigns(
  OrientationVariations,
  {
    WithDescription: vitalArticleCard.WithDescription,
    WithEyebrow: vitalArticleCard.WithEyebrow,
    WithDescriptionEyebrow: as(vitalArticleCard.WithDescription, vitalArticleCard.WithEyebrow),
  },
);

const WithArticleCardVariations = asFluidToken({
  Components: {
    ...OrientationVariations,
    ...DescriptonVariations,
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
  text: 'Example Article Card Title'
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

/**
 * Add two columns for the component preview on the Styleguide page.
 */
const StyleGuideColumns = asFluidToken({
  ...vitalStyleGuideExamples.Default,
  Layout: {
    Wrapper: 'flex flex-wrap',
    ItemWrapper: 'w-1/2 p-4',
  },
});

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
      StyleGuideColumns,
      WithArticleCardVariations,
      addProps({ content }),
    ),
  },
});
