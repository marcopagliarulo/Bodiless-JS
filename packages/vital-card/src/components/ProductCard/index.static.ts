import {
  staticTokenCollection,
  StaticBlock as StaticComponent,
  // Use `StaticInline` if your component renders inline elements.
  // StaticInline as StaticComponent,
} from '@bodiless/hydration';

export { default as vitalProductCard } from './tokens';
export const vitalProductCardStatic = staticTokenCollection;
export const ProductCardStatic = StaticComponent;
