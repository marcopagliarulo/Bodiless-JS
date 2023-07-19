import { asVitalCarouselDotToken } from '../VitalCarouselDotClean';

const Default = asVitalCarouselDotToken({
  Theme: {
    Dot: 'bg-[#BFBFBF] rounded-full border-none',
  },
  Layout: {
    // Hardcdoded for now, site builders can override this.
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
