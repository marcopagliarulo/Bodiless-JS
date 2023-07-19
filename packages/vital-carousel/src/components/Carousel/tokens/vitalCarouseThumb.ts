import { vitalImage } from '@bodiless/vital-image';
import { asVitalCarouselThumbToken } from '../VitalCarouselThumbClean';

const Default = asVitalCarouselThumbToken({
  Components: {
    Image: vitalImage.Default,
  },
  Theme: {
    Wrapper: 'border-none',
  },
  Layout: {
    Wrapper: 'block',
    // Fixed width for now. Site builder can override if they choose
    Image: 'w-[94px] h-[94px]',
  },
  Behavior: {
    Image: 'cursor-pointer'
  },
  Spacing: {
    Wrapper: 'space-x-2',
  }
});

const vitalThumbCarousel = {
  Default
};

export default vitalThumbCarousel;
