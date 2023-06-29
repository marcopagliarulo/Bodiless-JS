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
export interface VitalVitalCarousel {
  /**
   * Default styling and behavior.
   */
  Default: VitalCarouselToken;

  // Document other tokens here.
};
