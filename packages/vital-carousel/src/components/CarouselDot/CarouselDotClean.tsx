import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Div, Span } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { CarouselDotComponents } from './types';
import { useCarouselSlideIndex } from '../utils/hooks';

type CarouselDotBaseProps = DesignableComponentsProps<CarouselDotComponents>;

/**
 * The starting components for each slot.
 */
const carouselDotComponents: CarouselDotComponents = {
  Wrapper: Div,
  Dot: Span,
};

const CarouselDotBase: FC<CarouselDotBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    // Accessbility: Remove an element using tabindex="-1"
    <C.Wrapper class="indicator" data-index={slideIndex} tabindex="-1" {...rest}>
      <C.Dot />
    </C.Wrapper>
  );
};

const CarouselDotClean = designable(carouselDotComponents, 'CarouselDot')(CarouselDotBase);

/**
 * A token creator that respects the CarouselDot slots.
 *
 * @category Token Collection
 */
export const asCarouselDotToken = asVitalTokenSpec<CarouselDotComponents>();

export default CarouselDotClean;
