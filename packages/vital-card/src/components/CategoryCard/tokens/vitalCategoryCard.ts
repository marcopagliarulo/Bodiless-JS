import { withPlaceholder } from '@bodiless/components';
import {
  as, extendMeta, flowHoc, H3, on, startWith, TokenCollection
} from '@bodiless/fclasses';
import { asButtonToken, ButtonClean, vitalButton } from '@bodiless/vital-button';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import {
  DefaultDomains, vitalCategoryCardElement, vitalSpacing, vitalTypography
} from '@bodiless/vital-elements';
import { CardComponents } from 'src/components/Card';
import { CardToken } from 'src/components/Card/CardClean';
import Base from '../../Card/tokens/Base';
import { asCategoryCardToken } from '../CategoryCardClean';

/**
 * Default Category Card Button.
 * Plain vital button with `WithTertiaryStyle` token and `READ MORE` placeholder.
 */
const CategoryCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithTertiaryStyle,
  {
    Content: {
      Body: withPlaceholder('CATEGORY LINK'),
    },
  }
);
const Default = asCategoryCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    Eyebrow: undefined,
    Description: undefined,
    CTAWrapper: undefined,
    Title: undefined,
    CTALink: on(ButtonClean)(CategoryCardButton),
  },
  Layout: {
    ImageWrapper: 'relative overflow-hidden aspect-5/3',
    Image: 'absolute top-0 h-full w-full',
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

const WithTitle = asCategoryCardToken({
  Components: {
    TitleWrapper: startWith(H3),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Theme: {
    TitleWrapper: as(
      vitalTypography.HeadlineSmall,
      vitalCategoryCardElement.TextLightThemeHeadline,
    ),
  },
  Spacing: {
    TitleWrapper: vitalSpacing.MarginBottomMedium,
  },
  Content: {
    Title: withPlaceholder('Category Title'),
  }
});

export interface VitalCategoryCard extends TokenCollection<CardComponents, DefaultDomains> {
  /**
   * Defines the default Category card for the Vital DS.
   * - Extends the Base card.
   */
  Default: CardToken,
  /**
   * Token that adds an Title to the Category Card.
   * Adds the `TitleWrapper` slot as an `H3` and the `Title` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Default` token.
   */
  WithTitle: CardToken,
}
/**
   *
/**
 * Tokens for CategoryCardClean
 * This token collection extends vitalCategoryCard
 *
 * @category Token Collection
 * @see vitalCategoryCard
 */

const vitalCategoryCard: VitalCategoryCard = {
  Default,
  WithTitle,
};

export default vitalCategoryCard;
