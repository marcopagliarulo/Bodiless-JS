import type { ComponentOrTag, DesignableProps, TokenSpec } from '@bodiless/fclasses';
import type { DefaultDomains } from '@bodiless/vital-elements';

/**
 * Type representing the "slots" exposed by the VitalCarouselClean component.
 */
export type VitalCarouselComponents = {
  Wrapper: ComponentOrTag<any>,
  SliderWrapper: ComponentOrTag<any>,
  Slider: ComponentOrTag<any>,
  Slide: ComponentOrTag<any>,
  ControlsWrapper: ComponentOrTag<any>,
  Dots: ComponentOrTag<any>,
  ButtonBack: ComponentOrTag<any>,
  ButtonNext: ComponentOrTag<any>,
  ButtonPlay: ComponentOrTag<any>,
};

/**
 * The props accepted by the VitalCarouselClean component
 */
export type VitalCarouselProps = DesignableProps<VitalCarouselComponents>;

/**
 * The type of a token spec which applies to the VitalCarouselClean component.
 */
export type VitalCarouselToken = TokenSpec<VitalCarouselComponents, DefaultDomains>;

/**
 * Tokens for the VitalCarouselClean component.
 *
 * @category Token Collection
 * @see [[VitalCarouselClean]]
 */
export interface VitalCarousel {
  /**
   * Default styling and behavior.
   */
  Default: VitalCarouselToken;
  /**
   * WithNavigationButtons: add Navigation buttons on the left & right side of items
   */
  // WithNavigationButtons: VitalCarouselToken;
  // /**
  //  * WithInfinitiveLoop: when at end loops back to start
  //  */
  // WithInfinitiveLoop: VitalCarouselToken;
  // /**
  //  * WithAutoPlay: will autorotate
  //  */
  // WithAutoPlay: VitalCarouselToken;
  // /**
  //  * withIntrinsicHeight: sets height to tallest slide
  //  */
  // WithIntrinsicHeight: VitalCarouselToken;
  // /**
  //  * WithNoDragIfEditable: if edit mode is not draggable carousel
  //  */
  // WithNoDragIfEditable: VitalCarouselToken;
  // /**
  //  * WithNoAutoPlayIfEditable: if edit mode will not autoplay
  //  */
  // WithNoAutoPlayIfEditable: VitalCarouselToken;
  // /**
  // eslint-disable-next-line max-len
  //  * WithControls: Use controls, must setup display of controls (WithCarouselDots or WithThumbnail)
  //  */
  // WithControls: VitalCarouselToken;
  // /**
  //  * WithCarouselDots: Show dots
  //  */
  // WithCarouselDots: VitalCarouselToken;
  // /**
  //  * WithThumbnail: Show dots as thumbnail images.
  //  */
  // WithThumbnail: VitalCarouselToken;
  // /**
  //  * WithPeek: Show 1 + partial of next slide
  //  */
  // WithPeek: VitalCarouselToken;
  // /**
  //  * asAccessibleCarousel: make carousel accessible
  //  */
  // asAccessibleCarousel: VitalCarouselToken;
  // /**
  //  * WithImageSlide: Show Image for each slide
  //  */
  WithImageSlide: VitalCarouselToken;
  // /**
  //  * WithCardSlide: Show Product Card for each slide
  //  */
  // WithCardSlide: VitalCarouselToken;
  // /**
  //  * WithThreeSlides: Show 3 slides
  //  */
  // WithThreeSlides: VitalCarouselToken;
  // /**
  //  * WithFourSlides: Show 4 slides
  //  */
  // WithFourSlides: VitalCarouselToken;
  // /**
  //  * MobileOnly: Show only on Mobile
  //  */
  // MobileOnly: VitalCarouselToken;
  // /**
  //  * TabletOnly: Show only on Tablet
  //  */
  // TabletOnly: VitalCarouselToken;
  // /**
  //  * TabletDesktopOnly: Show only on Tablet/Desktop
  //  */
  // TabletDesktopOnly: VitalCarouselToken;
  // /**
  //  * DesktopOnly: Show only Desktop
  //  */
  // DesktopOnly: VitalCarouselToken;
}
