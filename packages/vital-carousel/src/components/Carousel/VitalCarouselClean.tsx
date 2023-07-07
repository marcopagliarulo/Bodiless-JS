import React, { FC, Fragment } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Ul } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselComponents } from './types';

type VitalCarouselBaseProps = DesignableComponentsProps<VitalCarouselComponents>;

/**
 * The starting components for each slot.
 */
const vitalCarouselComponents: VitalCarouselComponents = {
  Wrapper: Div,
  Inputs: Fragment,
  SliderWrapper: Div,
  Slider: Ul,
  Slide: Div,
  ControlsWrapper: Div,
  Dots: Fragment,
  ButtonBack: Fragment,
  ButtonNext: Fragment,
  ButtonPlay: Fragment,
};

const VitalCarouselBase: FC<VitalCarouselBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Inputs />
    <C.SliderWrapper>
      <C.Slider />
      <C.ButtonBack />
      <C.ButtonNext />
    </C.SliderWrapper>
    <C.ControlsWrapper>
      <C.Dots />
      <C.ButtonPlay />
    </C.ControlsWrapper>
  </C.Wrapper>
);

const VitalCarouselClean = designable(vitalCarouselComponents, 'VitalCarousel')(VitalCarouselBase);

/**
 * A token creator that respects the VitalCarousel slots.
 *
 * @category Token Collection
 */
export const asVitalCarouselToken = asVitalTokenSpec<VitalCarouselComponents>();

export default VitalCarouselClean;
