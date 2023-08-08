import { asTokenGroup } from '../util';
import { vitalColor } from './semantic';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['LinkElement'],
  },
};

export default asTokenGroup(meta)({
  TextDisabled: vitalColor.TextInteractiveLightThemeDisabled,
  TextPressed: vitalColor.TextInteractiveLightThemePressed,
  TextIdle: vitalColor.TextInteractiveLightThemeIdle,
  TextFocus: vitalColor.TextInteractiveLightThemeFocus,
  TextHover: vitalColor.TextInteractiveLightThemeHover,
  TextDarkThemeIdle: vitalColor.TextInteractiveDarkThemeIdle,
  TextLightThemeDisabled: vitalColor.TextInteractiveLightThemeDisabled,
  TextLightThemePressed: vitalColor.TextInteractiveLightThemePressed,
  TextLightThemeIdle: vitalColor.TextInteractiveLightThemeIdle,
  TextLightThemeFocus: vitalColor.TextInteractiveLightThemeFocus,
  TextDarkThemeFocus: vitalColor.TextInteractiveDarkThemeFocus,
  TextDarkThemePressed: vitalColor.TextInteractiveDarkThemePressed,
  TextDarkThemeDisabled: vitalColor.TextInteractiveDarkThemeDisabled,
  TextDarkThemeHover: vitalColor.TextInteractiveDarkThemeHover,
  TextLightThemeHover: vitalColor.TextInteractiveLightThemeHover,
  BorderRadiusTopLeft: 'rounded-tl-2px md:rounded-tl-2px lg:rounded-tl-2px',
  BorderRadiusTopRight: 'rounded-tr-2px md:rounded-tr-2px lg:rounded-tr-2px',
  BorderRadiusBottomRight: 'rounded-br-2px md:rounded-br-2px lg:rounded-br-2px',
  BorderRadiusBottomLeft: 'rounded-bl-2px md:rounded-bl-2px lg:rounded-bl-2px',
});
