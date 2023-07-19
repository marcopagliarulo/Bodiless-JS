import React, { FC, Fragment } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Ul } from '@bodiless/fclasses';
import { Helmet } from 'react-helmet';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselComponents } from './types';
import { carouselScript } from './utils/carousel';

type VitalCarouselBaseProps = DesignableComponentsProps<VitalCarouselComponents>;

const CarouselScript = () => (
  <Helmet>
    <script type="text/javascript">
      {carouselScript}
    </script>
  </Helmet>
);

/**
 * The starting components for each slot.
 */
const vitalCarouselComponents: VitalCarouselComponents = {
  Wrapper: Div,
  Script: CarouselScript,
  Inputs: Fragment,
  SliderWrapper: Div,
  Slider: Ul,
  Slide: Div,
  ControlsWrapper: Div,
  Indicator: Fragment,
  ButtonBack: Fragment,
  ButtonNext: Fragment,
  ButtonPlay: Fragment,
};

const VitalCarouselBase: FC<VitalCarouselBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Script />
    <C.Inputs />
    <C.SliderWrapper>
      <C.Slider />
      <C.ButtonBack />
      <C.ButtonNext />
    </C.SliderWrapper>
    <C.ControlsWrapper>
      <C.Indicator />
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
