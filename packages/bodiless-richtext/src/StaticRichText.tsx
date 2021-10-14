import React, { ComponentType } from 'react';
import isEmpty from 'lodash/isEmpty';
import flow from 'lodash/flow';
import pick from 'lodash/pick';
import {
  designable,
  Div,
  Span,
  Sup,
  B,
  Em,
  A,
  H1,
  H2,
  H3,
  applyDesign,
  extendDesign,
  Design,
  DesignableComponents,

 } from '@bodiless/fclasses';
import {
  withNode,
} from '@bodiless/core';
import withDataMigrator from './withDataMigrator';
import { withPreview } from './RichTextPreview';
import withNodeStateHandlers from './withNodeStateHandlers';
import type {
  RichTextBaseProps,
  RichTextProps,
} from './Type';
import useInitialValue from './useInitialValue';
import { serializeHtml } from './serializers/htmlSerializer';
import {
  withBoldMeta,
  withSuperScriptMeta,
  withItalicMeta,
  withUnderlineMeta,
  withLinkMeta,
  withAlignLeftMeta,
  withAlignRightMeta,
  withAlignCenterMeta,
  withAlignJustifyMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
} from './meta';

const defaults = {
  SuperScript: Sup,
  Bold: B,
  Italic: Em,
  Underline: Span,
  Link: A,
  AlignLeft: Div,
  AlignRight: Div,
  AlignCenter: Div,
  AlignJustify: Div,
  H1,
  H2,
  H3,
} as DesignableComponents;

const lastDesign = {
  SuperScript: withSuperScriptMeta,
  Bold: withBoldMeta,
  Italic: withItalicMeta,
  Underline: withUnderlineMeta,
  Link: withLinkMeta,
  AlignLeft: withAlignLeftMeta,
  AlignRight: withAlignRightMeta,
  AlignCenter: withAlignCenterMeta,
  AlignJustify: withAlignJustifyMeta,
  H1: withHeader1Meta,
  H2: withHeader2Meta,
  H3: withHeader3Meta,
};

const apply = (design: Design<DesignableComponents>) => {
  // We want to add our meta data if the keys are present.
  const start = Object.getOwnPropertyNames(design)
    .reduce(
      (acc, key) => (
        {
          ...acc,
          [key]: Object.prototype.hasOwnProperty.call(defaults, key)
            ? defaults[key]
            : Span,
        }
      ),
      {},
    );
  const finalDesign = pick(lastDesign, Object.getOwnPropertyNames(design));
  return applyDesign(start)(extendDesign(finalDesign)(design));
};

const BasicRichText = (props: RichTextBaseProps)  => {
  const {
    initialValue,
    value,
  } = props;
  const initialValue$ = useInitialValue(initialValue);
  const value$ = value !== undefined && !isEmpty(value) ? value : initialValue$;
  return (
    <Div dangerouslySetInnerHTML={{ __html: serializeHtml(value$) }}></Div>
  )
}

const StaticRichText = flow(
  withDataMigrator,
  withNodeStateHandlers,
  withNode,
  withPreview,
  designable(apply, 'RichText'),
)(BasicRichText) as ComponentType<RichTextProps>;

export default StaticRichText;
