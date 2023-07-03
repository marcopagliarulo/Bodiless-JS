import { vitalPageBase } from '@bodiless/vital-templates/lib/base';
import { on, as } from '@bodiless/fclasses';
import { vitalContentListingTemplate } from '@bodiless/vital-content-listing';
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import { withIslandsHydrator } from '@bodiless/hydration';
import {
  GenericTemplateStatic,
  vitalGenericTemplateStatic,
  // GenericTemplateClean,
  PDPTemplateStatic,
  vitalPDPTemplateStatic
} from '@bodiless/vital-templates';

import { withBurgerMenuProvider } from '@bodiless/navigation';
import {
  vitalSearchGenericTemplate, withSearchMenuProvider, withSearchResult
} from '@bodiless/vital-search';

import {
  VitalMenuToggler,
  VitalBurgerMenu,
  VitalDesktopSearch,
  VitalMobileSearch,
  VitalSearchToggler,
  VitalSearchResults,
  VitalContentListing,
} from '../../../islands';

const islands = {
  VitalMenuToggler,
  VitalBurgerMenu,
  VitalDesktopSearch,
  VitalMobileSearch,
  VitalSearchToggler,
  VitalSearchResults,
  VitalContentListing
};

const Base = asFluidToken(vitalPageBase.Default, {
  Core: {
    _: as(
      withIslandsHydrator(islands),
      withBurgerMenuProvider,
      withLanguages([
        {
          name: 'en',
          label: 'English',
          isDefault: true,
        },
        {
          name: 'es',
          label: 'Español',
        },
      ]),
    )
  }
});

const Default = asFluidToken({
  ...Base,
  Components: {
    _default: on(GenericTemplateStatic)(vitalGenericTemplateStatic.Default),
    PDP: on(PDPTemplateStatic)(vitalPDPTemplateStatic.Default),
    Search: on(GenericTemplateStatic)(vitalSearchGenericTemplate.Search),
    ContentListing: on(GenericTemplateStatic)(vitalContentListingTemplate.Default),
  },
  Compose: {
    ...vitalPageBase.Default.Compose,
    WithSearchContext: as(withSearchMenuProvider, withSearchResult),
  },
});

export default {
  ...vitalPageBase,
  Default,
};
