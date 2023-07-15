import {
  withChild,
} from '@bodiless/core';
import { withNodeKey } from '@bodiless/data';
import {
  Img, Div, as, on, replaceWith, stylable, flowHoc,
  withDesign, Fragment,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
// import vitalCarouselTokens from '../../CarouselTokens';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
import '../../../../assets/scroll-snap-slider.css';

import { CAROUSEL_NODE_KEY } from '../utils/constants';
import CarouselDot from '../utils/CarouselDot';
import CarouselSlide from '../utils/CarouselSlide';
import CarouselThumb from '../utils/CarouselThumb';

const Default = asVitalCarouselToken({
  Components: {
    Slider: flowHoc(
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(stylable(CarouselSlide)),
      }),
    ),
  },
  Behavior: {
    Wrapper: 'slider',
    SliderWrapper: '',
    Slider: as(
      'scroll-snap-slider -simple',
      withDesign({
        Item: 'scroll-snap-slide',
      }),
    ),
  },
});

const WithControls = asVitalCarouselToken({
  Components: {
    Dots: as(
      replaceWith(Div),
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls indicators',
    ),
  },
});

const WithCarouselDots = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Dots: withDesign({
        Item: as(
          replaceWith(
            withChild(
              stylable(CarouselDot), 'DotIndicator',
            )(Fragment),
          ),
        ),
      }),
    },
    // TODO Unwrap this styling in theme/layout/spacing & remove withDesign
    Theme: {
      Slider: as(
        '-multi space-x-1',
        withDesign({
          Item: 'w-5/6 md:w-1/3 lg:w-1/4',
        }),
      ),
      ControlsWrapper: 'flex pt-2',
      Dots: as(
        'flex items-center dots -simple space-x-1',
        withDesign({
          Item: 'p-2',
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

const WithThumbnail = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Dots: withDesign({
        Item: as(
          replaceWith(
            withChild(
              stylable(CarouselThumb), 'ThumbIndicator',
            )(Fragment),
          ),
        ),
      }),
    },
    Theme: {
      Slider: as(
        withDesign({
          Item: 'w-full',
        }),
      ),
      Dots: withDesign({
        Item: withDesign({
          Dot: as(
            'flex items-center indicators -simple',
          ),
        }),
      }),
    },
    Layout: {
      ControlsWrapper: 'flex justify-left',
      Dots: as(
        'flex items-center space-x-1',
        withDesign({
          Item: 'max-w-[94px] max-h-[94px]',
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

// These are not ideal but allows to swap between tokens on responsive
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
};

export default vitalCarousel;
