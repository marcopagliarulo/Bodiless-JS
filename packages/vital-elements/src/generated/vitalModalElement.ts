import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ModalElement'],
  },
};

export default asTokenGroup(meta)({
  TextLink: vitalColor.TextInteractiveLightThemeIdle,
  TextHeadline: vitalColor.TextLightThemeBase,
  BorderBorder: vitalColor.BorderLightThemeBase,
  BackgroundBackground: vitalColor.BackgroundBase,
  TextBodySmall: vitalColor.TextLightThemeBase,
  TextBody: vitalColor.TextLightThemeBase,
  TextLightThemeLink: vitalColor.TextInteractiveLightThemeIdle,
  TextLightThemeHeadline: vitalColor.TextLightThemeBase,
  BorderLightThemeBorder: vitalColor.BorderLightThemeBase,
  BackgroundLightThemeBackground: vitalColor.BackgroundBase,
  TextLightThemeBodySmall: vitalColor.TextLightThemeBase,
  TextLightThemeBody: vitalColor.TextLightThemeBase,
  BorderRadiusAll: 'rounded-0px',
  PaddingTop: 'pt-16px md:pt-24px lg:pt-36px',
  PaddingLeft: 'pl-16px md:pl-24px lg:pl-36px',
  PaddingRight: 'pr-16px md:pr-24px lg:pr-36px',
  PaddingBottom: 'pb-16px md:pb-24px lg:pb-36px',
});
