import { vitalGenericTemplate } from '@bodiless/vital-templates';
import { ContentListingClean, vitalContentListing } from '@bodiless/vital-content-listing';
import {
  as
} from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';
import {
  withNode, withNodeKey,
} from '@bodiless/data';

const VitalContentListing = as(asElementToken({
  Core: {
    _: as(
      withNodeKey({ nodeKey: 'content-listing', nodeCollection: 'site' }),
      withNode,
      vitalGenericTemplate.Default.Schema.Content,
      vitalContentListing.Default
    ),
  }
}))(ContentListingClean);

export default VitalContentListing;
