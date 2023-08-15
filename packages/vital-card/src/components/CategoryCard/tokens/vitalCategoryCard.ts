import { withPlaceholder } from '@bodiless/components';
import {
  as, extendMeta, flowHoc, H3, on, startWith, TokenCollection
} from '@bodiless/fclasses';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import {
  DefaultDomains, vitalCategoryCardElement, vitalSpacing, vitalTypography
} from '@bodiless/vital-elements';
import { vitalLink } from '@bodiless/vital-link';
import { CardComponents } from 'src/components/Card';
import { CardToken } from 'src/components/Card/CardClean';
import Base from '../../Card/tokens/Base';
import { asCategoryCardToken } from '../CategoryCardClean';

// const Default = asCategoryCardToken({
//   ...Base.Default,
// Core: {
//   // Essential behavior or styling added by this token which are very unlikely to be
//   // overridden.
//   ...vitalCategoryCardBase.Default.Core,
//   // ...
// },
// Components: {
//   // When the design elements of a complex component are themselves complex components,
//   // it is generally best practice to define tokens which apply to the sub-components as a
//   // whole, and apply them in the Components domain of the enclosing component.
//   ...vitalCategoryCardBase.Default.Components,
//   // ...
// },
// A11y: {
//   // Behavior or props related to accessibility; e.g. an `aria-labeledby' prop.
//   ...vitalCategoryCardBase.Default.A11y,
//   // ...
// },
// Analytics: {
//   // Behavior or props related to analytics; e.g., pushing events to a data layer.
//   ...vitalCategoryCardBase.Default.Analytics,
//   // ...
// },
// SEO: {
//   // Behavior or props related to search engine optimization, e.g., adding schema.org markup.
//   ...vitalCategoryCardBase.Default.SEO,
//   // ...
// },
// Layout: {
//   // Tokens which define the visual structure of a component, and are thus unlikely to be
//   // overridden; e.g., those which define the orientation of a card.
//   ...vitalCategoryCardBase.Default.Layout,
//   // ...
// },
// Spacing: {
//   // Tokens which sit somewhere between Theme and Layout; e.g., padding, margin,
//   // line-spacing, etc.
//   ...vitalCategoryCardBase.Default.Spacing,
//   // ...
// },
// Theme: {
//   // Tokens which apply styling which is very likely to be overridden; e.g., colors,
//   // typography, sizing such as width and height, etc.
//   ...vitalCategoryCardBase.Default.Theme,
//   // ...
// },
// A11yContent: {
//   // Tokens which provide default content related to accessibility.
//   ...vitalCategoryCardBase.Default.A11yContent,
//   // ...
// },
// Content: {
//   // Tokens which provide default content or other fixed props. Any hardcoded,
//   // translatable strings belong in this domain.
//   ...vitalCategoryCardBase.Default.Content,
//   // ...
// },
// Behavior: {
//   // Tokens which define or add behaviors to a component; e.g., the expanding and contracting
//   // of an accordion.
//   ...vitalCategoryCardBase.Default.Behavior,
//   // ...
// },
// Schema: {
//   // Tokens which define how a component's data are organized; e.g., node keys.
//   ...vitalCategoryCardBase.Default.Schema,
//   // ...
// },
// });

const Default = asCategoryCardToken({
  ...Base,
  Components: {
    ...Base.Components,
    Eyebrow: undefined,
    Description: undefined,
    CTAWrapper: undefined,
    CTALink: vitalLink.Default,
  },
  Theme: {
    ContentWrapper: 'items-start',
  },
  Layout: {
    ImageWrapper: 'relative pb-[60%] overflow-hidden',
    Image: 'absolute top-0 h-full w-full',
  },
  Spacing: {
    ContentWrapper: vitalSpacing.PaddingYXSmall,
  },
  Content: {
    CTAText: withPlaceholder('CATEGORY LINK'),
  },
  Meta: extendMeta(
    flowHoc.meta.term('Sub Type')('Category'),
    flowHoc.meta.term('CTA Type')('Fully Clickable'),
  ),
});

// Add additional variant tokens or variators here.
// ...

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
   * Defines the default Article card for the Vital DS.
   * - Extends the Base card.
   */
  Default: CardToken,
  /**
   * Token that adds an Eyebrow to the Article Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Article` token.
   */
  // WithEyebrow: CardToken,
  /**
   * Token that adds the Description slot to the Article Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
   */
  // WithDescription: CardToken,
  /**
   * Token that sets Vertical Orientation for the Article Card.
   * Re-Exported directly unchanged from the `vitalCard`.
   *
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
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
