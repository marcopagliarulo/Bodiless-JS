import {
  vitalBurgerMenu, BurgerMenuClean
} from '@bodiless/vital-navigation';
import {
  as,
} from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';

const VitalBurgerMenu = as(asElementToken({
  Core: {
    _: vitalBurgerMenu.Default,
  }
}))(BurgerMenuClean);

export default VitalBurgerMenu;
