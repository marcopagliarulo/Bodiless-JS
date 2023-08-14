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

import {
  flowHoc, replaceWith, extendMeta, Div, startWith, H3, Span, as,
} from '@bodiless/fclasses';
// import { asButtonToken, vitalButton } from '@bodiless/vital-button';
// import { withPlaceholder } from '@bodiless/components';
import { vitalLink } from '@bodiless/vital-link';
import { asCardToken } from '../CardClean';
import type { CardToken } from '../CardClean';
import Base from './Base';

// const CategoryCardButton = asButtonToken(
//   vitalButton.Plain,
//   vitalButton.WithTertiaryStyle,
//   {
//     Content: {
//       Body: withPlaceholder('READ MORE'),
//     },
//   }
// );

/**
  * TBD: STUB Category Base Card Design.
  */
const Category = asCardToken(Base,
  {
    Components: {
      ...Base.Components,
      EyebrowWrapper: replaceWith(() => null),
      DescriptionWrapper: replaceWith(() => null),
      RatingWrapper: replaceWith(() => null),
      TitleWrapper: replaceWith(() => null),
      CTAWrapper: replaceWith(Div),
      CTALink: vitalLink.Default,
    },
    Theme: {
      ContentWrapper: 'items-start',
    },
    Spacing: {
      ContentWrapper: 'py-16px md:py-24px',
    },
    Meta: extendMeta(
      flowHoc.meta.term('Sub Type')('Category'),
      flowHoc.meta.term('CTA Type')('Fully Clickable'),
    ),
  });

const WithTitle = asCardToken({
  Components: {
    TitleWrapper: startWith(H3),
    Title: startWith(Span),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Features')('With Title'),
  ),
});

export interface VitalCardCategory {
  /**
   * Defines the Category card for the Vital DS.
   * - Extends the Base card with vertical orientation & the fully clickable card.
   * - Components domain:
   *   - Removes Eyebrow, Description, Rating
   *
   * <b>NOTE</b> Not Fully Implemented.
   */
  Category: CardToken,
  WithTitle: CardToken,
}

export {
  Category,
  WithTitle,
};
