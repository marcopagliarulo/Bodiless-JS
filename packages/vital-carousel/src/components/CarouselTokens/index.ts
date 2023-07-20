import { asTokenGroup } from '@bodiless/vital-elements';

export const CarouselMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Carousel'],
  },
};

// Need to move to vital-elements when its updated.
const vitalCarouselTokens = asTokenGroup(CarouselMeta)({
  ScrollIndicatorInactive: '#BFBFBF',
  ScrollIndicatorBackgroundInactive: 'bg-[#BFBFBF]',
  ScrollIndicatorActive: '#019881',
  Spacing8: 'space-x-2',
  SpacingMedium: 'pb-5 lg:pb-6',
});

export default vitalCarouselTokens;
