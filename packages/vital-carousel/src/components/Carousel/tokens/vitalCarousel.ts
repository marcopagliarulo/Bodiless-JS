import {
  ifReadOnly, ifEditable, withChild, ifToggledOn, withAppendChild
} from '@bodiless/core';
import { asBodilessList } from '@bodiless/components';
// import type { WithNodeKeyProps } from '@bodiless/data';
import negate from 'lodash/negate';
import {
  Ul, Li, Img, addProps, as, replaceWith, stylable, flowHoc, addPropsIf, withDesign, addClasses,
} from '@bodiless/fclasses';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { vitalImage } from '@bodiless/vital-image';
import { vitalColor } from '@bodiless/vital-elements';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';
import { useIsCarouselItemActive } from '../utils/hooks';
import withCarouselItemTabIndex from '../utils/withCarouselItemTabIndex';
import CarouselDot from '../utils/CarouselDot';
// import withEditor from '../withEditor';

const CAROUSEL_NODE_KEY = 'slides';

const WithNavigationButtons = asVitalCarouselToken({
  Components: {
    ButtonBack: replaceWith(stylable(ButtonBack)),
    ButtonNext: replaceWith(stylable(ButtonNext)),
  },
  Theme: {
    ButtonNext: 'text-white uppercase disabled:opacity-50 disabled:cursor-not-allowed',
    ButtonBack: 'text-white uppercase disabled:opacity-50 disabled:cursor-not-allowed',
  },
  Layout: {
    SliderWrapper: 'relative',
    ButtonNext: 'absolute transform -translate-y-1/2 top-1/2 right-0 left-auto rtl:left-0 rtl:right-auto',
    ButtonBack: 'absolute transform -translate-y-1/2 top-1/2 left-0 right-auto rtl:right-0 rtl:left-auto',
  },
  Content: {
    ButtonNext: addProps({ children: 'Next' }),
    ButtonBack: addProps({ children: 'Back' }),
  },
  Spacing: {
    ButtonNext: 'p-2',
    ButtonBack: 'p-2'
  },
});

const WithInfinitiveLoop = asVitalCarouselToken({
  Behavior: {
    Wrapper: addProps({ infinite: true }),
  },
});

const WithAutoPlay = asVitalCarouselToken({
  Behavior: {
    Wrapper: ifReadOnly(
      addProps({ isPlaying: true }),
      addProps({ number: 3000 })
    ),
  }
});

const WithIntrinsicHeight = asVitalCarouselToken({
  Behavior: {
    Wrapper: addProps({ isIntrinsicHeight: true }),
  }
});

const WithNoDragIfEditable = asVitalCarouselToken({
  Behavior: {
    Wrapper: ifEditable(
      addProps({ dragEnabled: false }),
    ),
  }
});

const WithNoAutoPlayIfEditable = asVitalCarouselToken({
  Behavior: {
    Wrapper: ifEditable(
      addProps({ isPlaying: false }),
    ),
  }
});

// const WithCarouselDots = (nodeKeys?: WithNodeKeyProps) => asVitalCarouselToken({
const WithControls = asVitalCarouselToken({
  Components: {
    Dots: as(
      replaceWith(Ul),
      asBodilessList(CAROUSEL_NODE_KEY, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(
          withChild(
            stylable(CarouselDot), 'Dot',
          )(Li),
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
          Item: as(
            'w-2 h-2 m-1 inline-block align-middle rounded-full',
            vitalColor.BgPrimaryDivider,
            // TODO color-neutral.600 #D2D1D2
            withDesign({
              Dot: ifToggledOn(useIsCarouselItemActive)(
                addClasses('bg-vital-primary-interactive'),
                // TODO Can't added tokens to ifToggeldOn
                // vitalColor.BgPrimaryInteractive,
              ),
            }),
          ),
        }),
      ),
    },
  }
);

const ThumbImage = as(
  vitalImage.Default,
)(Img);

// src: https://github.com/johnsonandjohnson/Bodiless-JS/pull/1260/files#diff-04c34c2e135143e1c8e492ed23602d7608b159e226659d00cc0cfd8cd38da9ba
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
            //     addClasses('border-2 border-black'),
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
      ControlsWrapper: 'pt-2',
    },
  }
);

// https://github.com/express-labs/pure-react-carousel/issues/234 to show partial slides
const WithPeek = asVitalCarouselToken({
  Behavior: {
    Wrapper: addProps({ visibleSlides: 1.3 }),
  }
});

const asAccessibleCarouselButton = flowHoc(
  addProps({
    role: 'button',
  }),
);

const withAriaSelectedCarouselItem = flowHoc(
  addPropsIf(useIsCarouselItemActive)({
    'aria-selected': true,
    'aria-hidden': false,
  }),
  addPropsIf(negate(useIsCarouselItemActive))({
    'aria-selected': false,
    'aria-hidden': true,
  }),
);

const asAccessibleCarousel = asVitalCarouselToken({
  A11y: {
    Slider: flowHoc(
      addProps({
        tabIndex: 'auto',
      }),
      withDesign({
        Item: flowHoc(
          withCarouselItemTabIndex,
          withAriaSelectedCarouselItem,
        ),
      }),
    ),
    ButtonBack: asAccessibleCarouselButton,
    ButtonNext: asAccessibleCarouselButton,
    Dots: withDesign({
      Item: flowHoc(
        withAriaSelectedCarouselItem,
        addProps({
          'aria-hidden': false,
          role: 'presentation',
        }),
        withDesign({
          Dot: asAccessibleCarouselButton,
        }),
      ),
    }),
    ButtonPlay: asAccessibleCarouselButton,
  }
});

const Default = asVitalCarouselToken(
  asAccessibleCarousel,
  // withEditor(CAROUSEL_NODE_KEY),
);

/**
 * Tokens for VitalCarouselClean
 *
 * @category Token Collection
 * @see [[VitalCarousel]]
 * @see [[VitalCarouselClean]]
 */
const vitalCarousel: VitalCarousel = {
  Default,
  WithNavigationButtons,
  WithInfinitiveLoop,
  WithAutoPlay,
  WithIntrinsicHeight,
  WithNoDragIfEditable,
  WithNoAutoPlayIfEditable,
  WithControls,
  WithCarouselDots,
  WithThumbnail,
  WithPeek,
  asAccessibleCarousel,
};

export default vitalCarousel;
