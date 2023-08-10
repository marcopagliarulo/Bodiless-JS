import { asTokenGroup } from '../util';
import { vitalColor } from '../components/Color';

export const meta = {
  categories: {
    Type: ['Element'],
    Group: ['ScrollIndicatorElement'],
  },
};

export default asTokenGroup(meta)({
  Active: vitalColor.ScrollbarInteractiveLightThemeIdle,
  Inactive: vitalColor.BorderLightThemeBase,
  LightThemeActive: vitalColor.ScrollbarInteractiveLightThemeIdle,
  LightThemeInactive: vitalColor.BorderLightThemeBase,
  DarkThemeActive: vitalColor.ScrollbarInteractiveDarkThemeIdle,
  DarkThemeInactive: vitalColor.BorderDarkThemeBase,
});
