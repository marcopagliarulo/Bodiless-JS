import { vitalImage } from '@bodiless/vital-image';
import { asVitalCarouselThumbToken } from '../VitalCarouselThumbClean';

const Default = asVitalCarouselThumbToken({
  Components: {
    Image: vitalImage.Default,
  },
  Theme: {
    Image: 'border-none',
  },
  Layout: {
    Image: 'block w-[94px] h-[94px]',
  },
  Behavior: {
    Image: 'cursor-pointer'
  }
});

const vitalThumbCarousel = {
  Default
};

export default vitalThumbCarousel;
