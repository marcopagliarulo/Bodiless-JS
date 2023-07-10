import { asCardToken, CardClean, CardStatic } from '../Card';

const ProductCardClean = CardClean;

/**
 * A token creator that respects the ProductCard slots.
 *
 * @category Token Collection
 */
export const asProductCardToken = asCardToken;

export const ProductCardStatic = CardStatic;

export default ProductCardClean;
