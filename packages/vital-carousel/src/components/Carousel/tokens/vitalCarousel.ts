import { ifReadOnly, ifEditable } from '@bodiless/core';
import {
  Ul, addProps, as, replaceWith, stylable
} from '@bodiless/fclasses';
import { ButtonBack, ButtonNext } from 'pure-react-carousel';
import { asVitalCarouselToken } from '../VitalCarouselClean';
import type { VitalCarousel } from '../types';

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
      addProps({
        isPlaying: true,
      }),
    ),
  }
});

// TODO (now to pass in tokens:  (interval: number = 3000) )
const WithAutoPlayInterval = asVitalCarouselToken({
// const withAutoPlayInterval = (interval: number = 3000) => withDesign({
  Behavior: {
    Wrapper: addProps({
      // interval,
    }),
  },
});

const WithIntrinsicHeight = asVitalCarouselToken({
  Behavior: {
    Wrapper: addProps({
      isIntrinsicHeight: true,
    }),
  }
});

const WithNoDragIfEditable = asVitalCarouselToken({
  Behavior: {
    Wrapper: ifEditable(
      addProps({
        dragEnabled: false,
      }),
    ),
  }
});

const WithNoAutoPlayIfEditable = asVitalCarouselToken({
  Behavior: {
    Wrapper: ifEditable(
      addProps({
        isPlaying: false,
      }),
    ),
  }
});

// TODO (now to pass in tokens:  (nodeKeys?: WithNodeKeyProps) )
const WithCarouselDots = asVitalCarouselToken({
// const withCarouselDots = (nodeKeys?: WithNodeKeyProps) => flowHoc(
  Components: {
    Dots: as(
      replaceWith(Ul),
      //       asBodilessList(nodeKeys, undefined, () => ({ groupLabel: 'Slide' })),
      //       withDesign({
      //         Item: replaceWith(
      //           withChild(
      //             stylable(CarouselDot), 'Dot',
      //           )(Li),
      //         ),
      //       }),
      //     ),
      //   }),
      // );
    ),
  },
});

// src: https://github.com/johnsonandjohnson/Bodiless-JS/pull/1260/files#diff-04c34c2e135143e1c8e492ed23602d7608b159e226659d00cc0cfd8cd38da9ba
const WithThumbnail = asVitalCarouselToken({
  Components: {
    // Dots: withDesign({
    //   Item: withDesign({
    //     Dot: withAppendChild(SquareImage, 'Thumbnail'),
    //   }),
    // }),
  },
  Theme: {
    // ControlsWrapper: addClasses('flex justify-left pt-2'),
    // Dots: flowHoc(
    //   addClasses('flex items-center'),
    //   withDesign({
    //     Item: withDesign({
    //       Dot: flowHoc(
    //         addClasses('mr-5 inline-block align-middle'),
    //         withDesign({
    //           Thumbnail: flowHoc(
    //             asImageRounded,
    //             ifToggledOn(useIsCarouselItemActive)(
    //               addClasses('border-2 border-black'),
    //             ),
    //           ),
    //         }),
    //       ),
    //     }),
    //   }),
    // ),
  }
});

// COMPOSE example
// /* Thumbnail & Image that will share the same image */
// const ThumbnailCarousel = flowHoc(
//   asEditableCarousel(CAROUSEL_NODE_KEY),
//   withCarouselDots(CAROUSEL_NODE_KEY),
//   withThumbbailDots,
//   withThumbnailStyles,
//   asAccessibleCarousel,
//   withImageSlide,
// )(CarouselClean);

// Need to handle dots better -> https://github.com/express-labs/pure-react-carousel/issues/177
// const withReactDotStyles = flowHoc(
  // withControlsWrapperStyles,
  // withDesign({
  //   Dots: flowHoc(
  //     addClasses('flex items-center'),
  //     withDesign({
  //       Item: withDesign({
  //         Dot: flowHoc(
  //           addClasses('w-20 h-2 inline-block border-2 border-solid align-middle'),
  //           ifToggledOn(useIsCarouselItemActive)(
  //             addClasses('bg-blue-700'),
  //           ),
  //         ),
  //       }),
  //     }),
  //   ),
  // }),
// );

// https://github.com/express-labs/pure-react-carousel/issues/234 to show partial slides
// const withFourSlides = flowHoc(
//   withDesign({
//     Wrapper: addProps({ visibleSlides: 4.2 }),
//   }),
// );

const WithPeek = asVitalCarouselToken({
  // TO DO
});

// TODO
// const withCarouselItemTabIndex: HOC = Component => {
//   const WithCarouselItemTabIndex: FC<any> = props => {
//     const isItemActive = useIsCarouselItemActive();
//     const tabIndex = isItemActive ? 0 : -1;
//     return <Component {...props} tabIndex={tabIndex} />;
//   };
//   return WithCarouselItemTabIndex;
// };

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

// const asAccessibleCarousel = withDesign({
//   Slider: flowHoc(
//     addProps({
//       tabIndex: 'auto',
//     }),
//     withDesign({
//       Item: flowHoc(
//         withCarouselItemTabIndex,
//         withAriaSelectedCarouselItem,
//       ),
//     }),
//   ),
//   ButtonBack: asAccessibleCarouselButton,
//   ButtonNext: asAccessibleCarouselButton,
//   Dots: withDesign({
//     Item: flowHoc(
//       withAriaSelectedCarouselItem,
//       addProps({
//         'aria-hidden': false,
//         role: 'presentation',
//       }),
//       withDesign({
//         Dot: asAccessibleCarouselButton,
//       }),
//     ),
//   }),
//   ButtonPlay: asAccessibleCarouselButton,
// });

const Default = asVitalCarouselToken({
  Core: {
    // Essential behavior or styling added by this token which are very unlikely to be
    // overridden.
    // ...
  },
  // Components: {
  //   // When the design elements of a complex component are themselves complex components,
  //   // it is generally best practice to define tokens which apply to the sub-components as a
  //   // whole, and apply them in the Components domain of the enclosing component.
  //   // ...
  // },
  // A11y: {
  //   // Behavior or props related to accessibility; e.g. an `aria-labeledby' prop.
  //   // ...
  // },
  // Analytics: {
  //   // Behavior or props related to analytics; e.g., pushing events to a data layer.
  //   // ...
  // },
  // SEO: {
  //   // Behavior or props related to search engine optimization, e.g., adding schema.org markup.
  //   // ...
  // },
  // Layout: {
  //   // Tokens which define the visual structure of a component, and are thus unlikely to be
  //   // overridden; e.g., those which define the orientation of a card.
  //   // ...
  // },
  // Spacing: {
  //   // Tokens which sit somewhere between Theme and Layout; e.g., padding, margin,
  //   // line-spacing, etc.
  //   // ...
  // },
  // Theme: {
  //   // Tokens which apply styling which is very likely to be overridden; e.g., colors,
  //   // typography, sizing such as width and height, etc.
  //   // ...
  // },
  // A11yContent: {
  //   // Tokens which provide default, localized content related to accessibility.
  //   // ...
  // },
  // Content: {
  //   // Tokens which provide default content or other fixed props. Any hardcoded,
  //   // translatable strings belong in this domain.
  //   // ...
  // },
  // Behavior: {
  //   // Tokens which define or add behaviors to a component; e.g., the expanding and contracting
  //   // of an accordion.
  //   // ...
  // },
  // Schema: {
  //   // Tokens which define how a component's data are organized; e.g., node keys.
  //   Slot1: withChildNode('slot-1'),
  //   Slot2: withChildNode('slot-2),
  //   // ...
  // },
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
  WithNavigationButtons,
  WithInfinitiveLoop,
  WithAutoPlay,
  WithIntrinsicHeight,
  WithNoDragIfEditable,
  WithNoAutoPlayIfEditable,
  WithCarouselDots,
  WithAutoPlayInterval,
  WithThumbnail,
  WithPeek,
};

export default vitalCarousel;
