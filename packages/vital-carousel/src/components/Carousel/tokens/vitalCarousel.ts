import { withNodeKey } from '@bodiless/data';
import {
  Img, Div, as, on, replaceWith, stylable, flowHoc,
  withDesign,
} from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { vitalCard, CardClean } from '@bodiless/vital-card';
import { asBodilessList } from '@bodiless/components';
// import vitalCarouselTokens from '../../CarouselTokens';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
import { CAROUSEL_NODE_KEY } from '../utils/constants';
import CarouselSlide from '../utils/CarouselSlide';
import vitalDotCarousel from './vitalCarouseDot';
import VitalCarouselDotClean from '../VitalCarouselDotClean';
import VitalCarouselThumbClean from '../VitalCarouselThumbClean';
import vitalThumbCarousel from './vitalCarouseThumb';

// Using withDesign throughout file to target the list that is added by asBodilessList.

const Default = asVitalCarouselToken({
  Components: {
    Slider: flowHoc(
      // Convert to Bodiless List with carousel node key
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        // Replaces Slide with LI that adds slide indexing
        Item: replaceWith(stylable(CarouselSlide)),
      }),
    ),
  },
  Behavior: {
    // Setup scroll snap behavior
    Wrapper: 'slider',
    Slider: as(
      'scroll-smooth snap-always snap-x',
      'scroll-snap-slider -simple',
      'scrollbar-hide lg:scrollbar-default',
      // Colors the scrollbar
      'scrollbar',
      withDesign({
        Item: as(
          'scroll-snap-slide',
          'snap-start',
        ),
      }),
    ),
  },
  Layout: {
    Slider: as(
      'flex flex-nowrap justify-normal overflow-x-auto',
      withDesign({
        Item: as(
          'items-center flex flex-col justify-center max-w-none',
          'shrink-0 grow-0',
        ),
      }),
    ),
  },
  Spacing: {
    // Padding under slider above controls
    Slider: 'pb-5 lg:pb-6', // TODO Convert to SpacingMedium = Spacing20 and lg:Spacing24
  },
});

const WithControls = asVitalCarouselToken({
  Components: {
    Indicator: as(
      replaceWith(Div),
      // Convert Indicators to List and use the same node key as slides to keep in sync
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      'controls indicators',
      'align-center flex-row justify-center opacity-100',
    ),
  },
});

const WithCarouselDots = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Indicator: withDesign({
        // Replace list items with styled dots
        Item: on(VitalCarouselDotClean)(vitalDotCarousel.Default),
      }),
    },
    Spacing: {
      Slider: '-multi space-x-2',
      ControlsWrapper: 'pt-2',
      Indicator: 'space-x-2', // TODO: Convert to Spacing8
    },
    Layout: {
      Slider: withDesign({
        // Controls Responspivenes Behavior.
        // A setting of at mobile of w-5/6 gives peek of next slide.
        Item: 'w-5/6 md:w-1/3 lg:w-1/4',
      }),
      ControlsWrapper: 'flex',
      Indicator: 'flex items-center dots -simple lg:hidden',
    }
  }
);

const WithThumbnail = asVitalCarouselToken(
  WithControls,
  {
    Components: {
      Indicator: withDesign({
        // Replace list items with styled thumbs
        Item: on(VitalCarouselThumbClean)(vitalThumbCarousel.Default),
      }),
    },
    Theme: {
      Slider: withDesign({
        Item: 'w-full',
      }),
    },
    Layout: {
      ControlsWrapper: 'flex justify-left',
      Indicator: 'flex items-center',
    },
    Spacing: {
      ControlsWrapper: 'pt-6',
      Indicator: 'space-x-2',
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
