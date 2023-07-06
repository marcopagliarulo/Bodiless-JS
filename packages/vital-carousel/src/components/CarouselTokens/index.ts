import { asTokenGroup } from '@bodiless/vital-elements';

export const CarouselMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Carousel'],
  },
};

// Note all created without design output
const vitalCarouselTokens = asTokenGroup(CarouselMeta)({
  BorderCarouselThumbnail: 'border-2 border-black',
  ColorCarouselScrollDotInactive: 'bg-neutral-400', // #D2D1D2;
  ColorCarouselScrollDotActive: 'bg-primary-500', // #019881
  SizeCarouselScrollDot: 'w-2 h-2',
  SpacingCarouselScrollDot: 'm-1',
  SpacingCarouselPadding: 'p-x-sm md:p-md lg:p-x-lg',
  SpacingCarouselMargin: '-m-x-sm md:-m-md lg:-m-x-lg',
});

export default vitalCarouselTokens;
