import type { ComponentType } from 'react';
import { withoutHydration, /* withoutHydrationInline */ } from '@bodiless/hydration';
import type { VitalCarouselProps } from './types';
import VitalCarouselClean from './VitalCarouselClean';

/**
 * This clean component is always static.  That means it is never hydrated
 * in the browser, and must not contain any client-side interactivity.
 *
 * If anything inserted into a component slot (or any children) requires
 * interactivity, Use VitalCarouselClean instead.
 */
const VitalCarouselStatic: ComponentType<VitalCarouselProps> = withoutHydration()(
  VitalCarouselClean
);
// @TODO Use withoutHydrationInline if your component renders inline
// const VitalCarouselStatic: ComponentType<VitalCarouselProps> = withoutHydrationInline()(
//   VitalCarouselClean
// );

export {
  VitalCarouselClean,
  VitalCarouselStatic,
};
export { default as vitalCarousel } from './tokens';
export { default as vitalCarouselStatic } from './tokens';
