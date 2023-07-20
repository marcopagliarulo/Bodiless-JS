import React, { FC, Fragment } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Ul } from '@bodiless/fclasses';
import { Helmet } from 'react-helmet';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselComponents } from './types';
import { carouselScript } from './utils/carousel';

type VitalCarouselBaseProps = DesignableComponentsProps<VitalCarouselComponents>;

const cssString = ':root { --carouselActive: #019881; --carouselInActive: #BFBFBF; }';
const CarouselScript = () => (
  <Helmet>
    <script type="text/javascript">
      {carouselScript}
    </script>
    <style>
      {cssString}
    </style>
  </Helmet>
);

/**
 * The starting components for each slot.
 */
const vitalCarouselComponents: VitalCarouselComponents = {
  Wrapper: Div,
  Script: CarouselScript,
  SliderWrapper: Div,
  Slider: Ul,
  Slide: Div,
  ControlsWrapper: Div,
  Indicator: Fragment,
};

const VitalCarouselBase: FC<VitalCarouselBaseProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Script />
    <C.SliderWrapper>
      <C.Slider />
    </C.SliderWrapper>
    <C.ControlsWrapper>
      <C.Indicator />
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
