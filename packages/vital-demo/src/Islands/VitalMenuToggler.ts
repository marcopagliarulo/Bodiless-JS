import {
  asBurgerMenuToggler,
} from '@bodiless/vital-navigation';
import {
  as,
  A,
} from '@bodiless/fclasses';
import { BurgerIcon } from '@bodiless/vital-layout';
import { asElementToken } from '@bodiless/vital-elements';
import {
  withChild,
} from '@bodiless/core';

const VitalMenuToggler = as(asElementToken({
  Core: {
    _: as(
      asBurgerMenuToggler,
      'flex justify-center items-center',
      'w-6 h-6',
      withChild(BurgerIcon),
    )
  }
}))(A);

export default VitalMenuToggler;
