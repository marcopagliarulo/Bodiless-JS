import { asVitalCarouselDotToken } from '../VitalCarouselDotClean';

const Default = asVitalCarouselDotToken({
  Theme: {
    Wrapper: 'bg-[#BFBFBF] rounded-full border-none',
  },
  Layout: {
    // Hardcdoded for now, site builders can override this.
    Wrapper: 'block w-[8px] h-[8px]',
  },
  Behavior: {
    Wrapper: 'cursor-pointer'
  }
});

const vitalDotCarousel = {
  Default
};

export default vitalDotCarousel;
