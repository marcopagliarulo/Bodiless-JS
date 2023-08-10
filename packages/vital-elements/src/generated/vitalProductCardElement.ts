import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ProductCardElement'],
  },
};

export default asTokenGroup(meta)({
  BorderBorder: vitalColor.BorderLightThemeBase,
  TextEyebrow: vitalColor.TextLightThemeBase,
  TextHeadline: vitalColor.TextLightThemeBase,
  TextReviews: vitalColor.TextLightThemeBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextDarkThemeEyebrow: vitalColor.TextDarkThemeBase,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  TextDarkThemeReviews: vitalColor.TextDarkThemeBase,
  TextLightThemeEyebrow: vitalColor.TextLightThemeBase,
  TextDarkThemeHeadline: vitalColor.TextDarkThemeBase,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BackgroundDarkThemeBackground: vitalColor.BackgroundAlt5,
  BorderDarkThemeBorder: vitalColor.BorderDarkThemeBase,
  TextLightThemeReviews: vitalColor.TextLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  BorderRadius: 'rounded-0px',
  PaddingTop: 'pt-16px md:pt-16px lg:pt-24px',
  PaddingBottom: 'pb-16px md:pb-16px lg:pb-24px',
  PaddingLeft: 'pl-16px md:pl-16px lg:pl-24px',
  PaddingRight: 'pr-16px md:pr-16px lg:pr-24px',
});
