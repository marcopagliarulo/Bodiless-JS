import { Fragment } from 'react';
import { as, designable } from '@bodiless/fclasses';
import { withNode } from '@bodiless/data';
import {
  cardComponentStart, CardBase, asCardToken, CardStatic,
} from '../Card/CardClean';

const articleCardComponentStart = {
  ...cardComponentStart,
  EyebrowWrapper: Fragment,
  Eyebrow: Fragment,
  Description: Fragment,
};

const ArticleCardClean = as(
  designable(articleCardComponentStart, 'ArticleCard'),
  withNode,
)(CardBase);

/**
 * A token creator that respects the ArticleCard slots.
 *
 * @category Token Collection
 */
export const asArticleCardToken = asCardToken;

export const ArticleCardStatic = CardStatic;

export default ArticleCardClean;
