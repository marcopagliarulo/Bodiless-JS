// import {
//   ifReadOnly, ifEditable, withChild, ifToggledOn, withAppendChild
// } from '@bodiless/core';
import {
  withChild, withAppendChild
} from '@bodiless/core';
// import { asBodilessList } from '@bodiless/components';
import { withNodeKey } from '@bodiless/data';
// import negate from 'lodash/negate';
// import {
//   Ul, Li, Img, addProps, as, replaceWith, stylable, flowHoc,
//   addPropsIf, withDesign, addClasses, on, removeClasses,
// } from '@bodiless/fclasses';
import {
  Img, Div, Ul, Li, addProps, as, on, replaceWith, stylable, flowHoc,
  withDesign,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
// import vitalCarouselTokens from '../../CarouselTokens';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
// import withCarouselItemTabIndex from '../utils/withCarouselItemTabIndex';
import '../../../../assets/swiped.css';
import '../../../../assets/dots.css';
import { CAROUSEL_NODE_KEY } from '../utils/constants';
import CarouselDot from '../utils/CarouselDot';
import CarouselRadio from '../utils/CarouselRadio';

// const withHiddenMobile = asVitalCarouselToken({
//   Layout: {
//     ButtonNext: 'hidden lg:inline-block',
//     ButtonBack: 'hidden lg:inline-block',
//   },
// });

// // No Design Navigation buttons designed yet so going with basics
// const WithNavigationButtons = asVitalCarouselToken(
//   {
//     Components: {
//       ButtonBack: replaceWith(stylable(ButtonBack)),
//       ButtonNext: replaceWith(stylable(ButtonNext)),
//     },
//     Theme: {
//       ButtonNext: 'text-white uppercase disabled:opacity-50 disabled:cursor-not-allowed',
//       ButtonBack: 'text-white uppercase disabled:opacity-50 disabled:cursor-not-allowed',
//     },
//     Layout: {
//       SliderWrapper: 'relative',
// eslint-disable-next-line max-len
//       ButtonNext: 'absolute transform -translate-y-1/2 top-1/2 right-0 left-auto rtl:left-0 rtl:right-auto',
// eslint-disable-next-line max-len
//       ButtonBack: 'absolute transform -translate-y-1/2 top-1/2 left-0 right-auto rtl:right-0 rtl:left-auto',
//     },
//     Content: {
//       ButtonNext: addProps({ children: 'Next' }),
//       ButtonBack: addProps({ children: 'Back' }),
//     },
//     Spacing: {
//       ButtonNext: 'p-2',
//       ButtonBack: 'p-2'
//     },
//   },
//   withHiddenMobile,
// );

const WithControls = asVitalCarouselToken({
  Components: {
    Inputs: as(
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(
          withChild(
            stylable(CarouselRadio), 'Radio',
          )(Div),
        ),
      }),
    ),
    Dots: as(
      replaceWith(Ul),
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls',
      withDesign({
        Item: as(
          replaceWith(
            withChild(
              stylable(CarouselDot), 'Dot',
            )(Li),
          ),
        ),
      }),
    ),
  },
});

const WithCarouselDots = asVitalCarouselToken(
  WithControls,
  {
    // TODO Unwrap this styling in theme/layout/spacing & remove withDesign
    Theme: {
    // Need to handle dots better -> https://github.com/express-labs/pure-react-carousel/issues/177
      ControlsWrapper: 'flex pt-2',
      Dots: as(
        'flex items-center',
        withDesign({
          Item: 'dots',
        })
        // withDesign({
        //   Item: as(
        //     'inline-block align-middle',
        //     'rounded-full',
        //     vitalCarouselTokens.SizeCarouselScrollDot,
        //     vitalCarouselTokens.SpacingCarouselScrollDot,
        //     vitalCarouselTokens.ColorCarouselScrollDotInactive,
        //   ),
        // }),
      ),
    },
  }
);

const ThumbImage = as(
  vitalImage.Default,
)(Img);

// // src: https://github.com/johnsonandjohnson/Bodiless-JS/pull/1260/files#diff-04c34c2e135143e1c8e492ed23602d7608b159e226659d00cc0cfd8cd38da9ba
const WithThumbnail = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Dots: withDesign({
        Item: withDesign({
          Dot: withAppendChild(ThumbImage, 'Thumbnail'),
        }),
      }),
    },
    Theme: {
      Dots: withDesign({
        Item: withDesign({
          Dot: as(
            'mr-3 inline-block align-middle',
            // withDesign({
            //   Thumbnail: ifToggledOn(useIsCarouselItemActive)(
            //     // TODO Can't added tokens to ifToggledOn
            //     addClasses('border-2 border-black'),
            //     // vitalCarouselTokens.BorderCarouselThumbnail,
            //   ),
            // }),
          ),
        }),
      }),
    },
    Layout: {
      ControlsWrapper: 'flex justify-left',
      Dots: as(
        'flex items-center',
        withDesign({
          Item: withDesign({
            Dot: 'max-w-[94px] max-h-[94px]',
          })
        }),
      ),
    },
    Spacing: {
      ControlsWrapper: 'pt-6',
    },
  }
);

// const asAccessibleCarouselButton = flowHoc(
//   addProps({
//     role: 'button',
//   }),
// );

// const withAriaSelectedCarouselItem = flowHoc(
//   addPropsIf(useIsCarouselItemActive)({
//     'aria-selected': true,
//     'aria-hidden': false,
//   }),
//   addPropsIf(negate(useIsCarouselItemActive))({
//     'aria-selected': false,
//     'aria-hidden': true,
//   }),
// );

// const asAccessibleCarousel = asVitalCarouselToken({
//   A11y: {
//     Slider: flowHoc(
//       addProps({
//         tabIndex: 'auto',
//       }),
//       withDesign({
//         Item: flowHoc(
//           withCarouselItemTabIndex,
//           withAriaSelectedCarouselItem,
//         ),
//       }),
//     ),
//     ButtonBack: asAccessibleCarouselButton,
//     ButtonNext: asAccessibleCarouselButton,
//     Dots: withDesign({
//       Item: flowHoc(
//         withAriaSelectedCarouselItem,
//         addProps({
//           'aria-hidden': false,
//           role: 'presentation',
//         }),
//         withDesign({
//           Dot: asAccessibleCarouselButton,
//         }),
//       ),
//     }),
//     ButtonPlay: asAccessibleCarouselButton,
//   }
// });

const Default = asVitalCarouselToken({
  Components: {
    Slider: flowHoc(
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(Li),
      }),
    ),
  },
  Behavior: {
    SliderWrapper: as(
      'swiped swiped-has-preview-mobile',
    ),
    Slider: as(
      'swiped-items',
      withDesign({
        Item: 'swiped-item',
        Title: 'image is-1by1',
      }),
    ),
  },
});

const ForSection = asVitalCarouselToken({
  Behavior: {
    SliderWrapper: as(
      addProps({ 'data-swiped-item-count-mobile': '1' }),
      addProps({ 'data-swiped-item-count-tablet': '3' }),
      addProps({ 'data-swiped-item-count-desktop': '4' }),
    ),
  },
});

const ForPDP = asVitalCarouselToken({
  Behavior: {
    SliderWrapper: as(
      addProps({ 'data-swiped-item-count': '1' }),
    ),
  },
});

const WithImageSlide = asVitalCarouselToken({
  Components: {
    Slider: withDesign({
      Title: on(Img)(
        vitalImage.Default,
        withNodeKey('image'),
      )
    }),
  }
});

const WithCardSlide = asVitalCarouselToken({
  Components: {
    Slider: withDesign({
      Title: on(CardClean)(
        vitalCard.Product,
        withNodeKey('card'),
      )
    }),
  },
});

const MobileOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'md:hidden'
  },
});

const TabletOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden md:block lg:hidden'
  },
});

const TabletDesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden md:block'
  },
});

const DesktopOnly = asVitalCarouselToken({
  Layout: {
    Wrapper: 'hidden lg:block'
  },
});

/**
 * Tokens for VitalCarouselClean
 *
 * @category Token Collection
 * @see [[VitalCarousel]]
 * @see [[VitalCarouselClean]]
 */
const vitalCarousel: VitalCarousel = {
  Default,
  // WithNavigationButtons,
  WithControls,
  WithCarouselDots,
  WithThumbnail,
  // asAccessibleCarousel,
  WithImageSlide,
  WithCardSlide,
  MobileOnly,
  TabletOnly,
  TabletDesktopOnly,
  DesktopOnly,
  ForSection,
  ForPDP,
};

export default vitalCarousel;
