import { as } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';
import {
  SearchTogglerClean,
  vitalSearchToggler,
  asSearchMenuToggler
} from '@bodiless/vital-search';

const VitalSearchToggler = as(asElementToken({
  Core: {
    _: as(
      asSearchMenuToggler,
      vitalSearchToggler.Default
    )
  }
}))(SearchTogglerClean);

export default VitalSearchToggler;
