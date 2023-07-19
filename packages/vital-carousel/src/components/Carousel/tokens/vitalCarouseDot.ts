import { asVitalCarouselDotToken } from '../VitalCarouselDotClean';

const Default = asVitalCarouselDotToken({
  Theme: {
    // !bg has to be background to override tailwinds button bg-transparency
    Button: '!bg-[#BFBFBF] rounded-full border-none',
  },
  Layout: {
    Button: 'block w-[8px] h-[8px]',
  },
  Behavior: {
    Button: 'cursor-pointer'
  }
});

const vitalDotCarousel = {
  Default
};

export default vitalDotCarousel;
