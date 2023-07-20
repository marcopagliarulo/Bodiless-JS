import { asTokenGroup } from '@bodiless/vital-elements';

export const CarouselMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Carousel'],
  },
};

// Note all created without design output
const vitalCarouselTokens = asTokenGroup(CarouselMeta)({
  ScrollIndicatorInactive: '#BFBFBF',
  ScrollIndicatorActive: '#019881',
});

export default vitalCarouselTokens;
