import React, { FC } from 'react';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { designable, Fragment, Img } from '@bodiless/fclasses';
import type { DesignableComponentsProps } from '@bodiless/fclasses';
import type { VitalCarouselThumbComponents } from './types';
import { useCarouselSlideIndex } from './utils/hooks';

type VitalCarouselThumbBaseProps = DesignableComponentsProps<VitalCarouselThumbComponents>;

/**
 * The starting components for each slot.
 */
const vitalCarouselThumbComponents: VitalCarouselThumbComponents = {
  Wrapper: Fragment,
  Image: Img,
};

const VitalCarouselThumbBase: FC<VitalCarouselThumbBaseProps> = ({ components: C, ...rest }) => {
  const slideIndex = useCarouselSlideIndex();

  return (
    <C.Wrapper class="thumbs indicator" data-index={slideIndex} tab-index="-1" type="button" {...rest}>
      <C.Image />
    </C.Wrapper>
  );
};

const VitalCarouselThumbClean = designable(vitalCarouselThumbComponents, 'VitalCarouselThumb')(VitalCarouselThumbBase);

/**
 * A token creator that respects the VitalCarousel slots.
 *
 * @category Token Collection
 */
export const asVitalCarouselThumbToken = asVitalTokenSpec<VitalCarouselThumbComponents>();

export default VitalCarouselThumbClean;
