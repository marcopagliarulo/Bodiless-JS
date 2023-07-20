/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/*
 * Sourced from https://github.com/barthy-koeln/scroll-snap-slider
 */

export const sliderSimpleInitScript = `

const sliderSimpleInit = (sliderSimpleElement) => {
  try {
    const slider = sliderSimpleElement.getElementsByClassName('scroll-snap-slider'); 
    const slides = sliderSimpleElement.getElementsByClassName(
      'scroll-snap-slide'
    );
    const sliderSimple = new ScrollSnapSlider({ element: slider[0] });
  
    const buttons = sliderSimpleElement.querySelectorAll('.indicators .indicator');
    const buttonsThumbs = sliderSimpleElement.querySelectorAll('.indicators .thumbs.indicator');
  
    const setSelected = function (event) {
      const slideElementIndex = event.detail;
      const slideElement = slides[slideElementIndex];
  
      for (const button of buttons) {
        const isActive = button.classList.toggle(
          '-active',
          button.dataset.index === slideElement.dataset.index
        );
      }
    };
  
    // Only make the thumbs clickable not all dots
    for (const button of buttonsThumbs) {
      button.addEventListener('click', (event) => {
        const slideElementIndex = Array.prototype.slice
          .call(slides)
          .findIndex((item) => item.dataset.index === button.dataset.index);
  
        sliderSimple.slideTo(slideElementIndex);
      });
    }
  
    sliderSimple.addEventListener('slide-pass', setSelected);
    sliderSimple.addEventListener('slide-stop', setSelected);
  } catch(e) {
    //
  }
};
`;
