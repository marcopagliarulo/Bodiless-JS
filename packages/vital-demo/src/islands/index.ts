import loadable from '../loadable/index.gatsby';
// @ts-ignore
const VitalMenuToggler = loadable(() => import('./VitalMenuToggler'));
// @ts-ignore
const VitalBurgerMenu = loadable(() => import('./VitalBurgerMenu'));
// @ts-ignore
const VitalSearchToggler = loadable(() => import('./VitalSearchToggler'));
// @ts-ignore
const VitalMobileSearch = loadable(() => import('./VitalMobileSearch'));
// @ts-ignore
const VitalDesktopSearch = loadable(() => import('./VitalDesktopSearch'));
// @ts-ignore
const VitalSearchResults = loadable(() => import('./VitalSearchResults'));

export {
  VitalMenuToggler,
  VitalBurgerMenu,
  VitalSearchToggler,
  VitalDesktopSearch,
  VitalMobileSearch,
  VitalSearchResults
};
