import {
  staticTokenCollection,
  StaticBlock as StaticComponent,
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

export { default as vitalCarousel } from './tokens';
export const vitalCarouselStatic = staticTokenCollection;
export { default as VitalCarouselClean } from './VitalCarouselClean';
export const VitalCarouselStatic = StaticComponent;
