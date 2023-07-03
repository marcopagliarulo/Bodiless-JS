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

import { withPlaceholder } from '@bodiless/components';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { ButtonClean, vitalButtons } from '@bodiless/vital-buttons';
import {
  flowHoc, extendMeta, replaceWith, on, Div, P, Img, addProps, TokenCollection,
} from '@bodiless/fclasses';

import { asCardToken, CardComponents } from '../../Card/CardClean';
import type { CardToken } from '../../Card/CardClean';
import Base from '../../Card/tokens/Base';

/**
  * Default Product Card Token. By default Product Card has `Image`, `Title` and `Link` slots.
  */
const Default = asCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    EyebrowWrapper: replaceWith(() => null),
    Description: replaceWith(() => null),
  },
  Content: {
    Title: withPlaceholder('Product Title'),
    CTAText: withPlaceholder('Product Link'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Product'),
  ),
});

/**
 * Token that adds an Eyebrow slot to the Product Card.
 * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithEyebrow = asCardToken({
  Components: {
    EyebrowWrapper: replaceWith(Div),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Eyebrow: withPlaceholder('Eyebrow Text'),
  }
});

/**
 * Token that adds the Description slot to the Product Card.
 * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
 * as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithDescription = asCardToken({
  Components: {
    DescriptionWrapper: replaceWith(P),
    Description: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Description: withPlaceholder('Description Text'),
  }
});

/**
 * Token that adds the Primary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithPrimaryButton = asCardToken({
  Components: {
    CTAWrapper: replaceWith(Div),
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    CTALink: vitalButtons.Primary,
  },
  Content: {
    CTAText: withPlaceholder('Button Text'),
  },
});

/**
 * Token that adds the Secondary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithSecondaryButton = asCardToken({
  Components: {
    CTAWrapper: replaceWith(Div),
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    CTALink: vitalButtons.Secondary,
  },
  /**
   * @TODO: Do we need the meta for these tokens? What would it be?
   */
  Meta: extendMeta(
    flowHoc.meta.term('CTA Style')('Secondary Button'),
    flowHoc.meta.term('CTA Type')('Visible Link'),
  ),
});

/**
 * Token that adds the Tertiary Vital Button to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithTertiaryButton = asCardToken({
  Components: {
    CTAWrapper: replaceWith(Div),
    CTALink: replaceWith(ButtonClean),
  },
  Theme: {
    /**
     * @TODO: Replace with `vitalButtons.Tertiary` once created.
     */
    CTALink: vitalButtons.Default,
  },
  /**
   * @TODO: Do we need the meta for these tokens? What would it be?
   */
  Meta: extendMeta(
    flowHoc.meta.term('CTA Style')('Tertiary Button'),
    flowHoc.meta.term('CTA Type')('Visible Link'),
  ),
});

/**
 * A token that adds a placeholder ratings to the Product Card.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const withRatings = asCardToken({
  Components: {
    RatingWrapper: replaceWith(Div),
    Rating: on(Img)(addProps({
      src: 'https://svgshare.com/i/sTg.svg',
      alt: 'Stars with 4.1 rating, out of 5 max.',
      title: 'Rating stars',
    })),
  },
});

export interface VitalProductCard extends TokenCollection<CardComponents, {}> {
  /**
   * Defines the Product card for the Vital DS.
   * - Extends the Base card with vertical orientation.
   */
  Default: CardToken,
  /**
   * Token that adds an Eyebrow to the Product Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  WithEyebrow: CardToken,
  /**
   * Token that adds the Description slot to the Product Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  WithDescription: CardToken,
  /**
   * Token that adds the Primary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  WithPrimaryButton: CardToken,
  /**
   * Token that adds the Secondary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  WithSecondaryButton: CardToken,
  /**
   * Token that adds the Tertiary Vital Button to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  WithTertiaryButton: CardToken,
  /**
   * A token that adds a placeholder ratings to the Product Card.
   *
   * Note: This token is meant to be layered on top of the `Product` token.
   */
  withRatings: CardToken,
}

const vitalProductCard: VitalProductCard = {
  Default,
  WithEyebrow,
  WithDescription,
  WithPrimaryButton,
  WithSecondaryButton,
  WithTertiaryButton,
  withRatings,
};

export default vitalProductCard;
