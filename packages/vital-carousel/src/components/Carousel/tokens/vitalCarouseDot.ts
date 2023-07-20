import { as } from '@bodiless/fclasses';
import { asVitalCarouselDotToken } from '../VitalCarouselDotClean';
import vitalCarouselTokens from '../../CarouselTokens';

const Default = asVitalCarouselDotToken({
  Theme: {
    Dot: as(
      'rounded-full border-none',
      vitalCarouselTokens.ScrollIndicatorBackgroundInactive,
    ),
  },
  Layout: {
    // Hardcoded for now, site builders can override this.
    Dot: 'dot block w-[8px] h-[8px]',
  },
  Behavior: {
    Wrapper: 'cursor-pointer'
  }
});

const vitalDotCarousel = {
  Default
};

export default vitalDotCarousel;
