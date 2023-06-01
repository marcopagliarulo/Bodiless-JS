/**
 * Copyright © 2020 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { HTMLProps } from 'react';
import isEmpty from 'lodash/isEmpty';
import {
  EditButtonOptions,
  withEditButton,
  useMenuOptionUI,
  useEditContext,
  TagType,
} from '@bodiless/core';
import type { InputRenderer } from 'react-tag-autocomplete';
import { useNodeDataHandlers } from '@bodiless/data';
import { flowHoc } from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';
import { TagButtonProps, TagsNodeType, WithRegisterSuggestionsType } from './types';

export type UseTagButtonOverrides<P = any> = (props: P) => Partial<EditButtonOptions<P, any>>;

type TagButtonType = EditButtonOptions<TagButtonProps & HTMLProps<HTMLElement>, TagsNodeType>;

// Options used to create an edit button.
export const tagButtonOptions: TagButtonType = {
  icon: 'local_offer',
  label: 'Groups',
  groupLabel: 'Filter',
  name: 'Tag',
  renderForm: ({ componentProps }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormUnwrapButton,
      ReactTags,
    } = useMenuOptionUI();

    const {
      getSuggestions = () => [],
      placeholder = 'Select Tags',
      noOptionsText = 'No matching tags found.',
      allowNew = true,
      allowMultipleTags = true,
      inputAttributes = { name: 'react-tags-input' },
      formTitle = 'Tags',
      formBodyText = 'Select from available tags:',
      seeAllText = 'See all tags',
    } = componentProps;

    const suggestions = getSuggestions();
    const suggestionsTransform = (value: string, suggestions: TagType[]) => (
      suggestions.filter((tag: TagType) => value && tag.label && tag.label.search(value) >= 0)
    );

    const context = useEditContext();
    const displayListOfTags = () => context.showPageOverlay({
      message: suggestions
        .slice()
        .reduce((acc: any, _tag: TagType) => `${acc}\n${_tag.label}`, ''),
      hasSpinner: false,
      hasCloseButton: true,
    });

    const Input: InputRenderer = ({ classNames, inputWidth, ...inputProps }) => (
      <input
        className={classNames.input}
        style={{ width: inputWidth }}
        {...inputProps}
        {...inputAttributes}
      />
    );

    return (
      <>
        <ComponentFormTitle>{formTitle}</ComponentFormTitle>
        <ComponentFormLabel>{formBodyText}</ComponentFormLabel>
        <ReactTags
          suggestions={suggestions}
          placeholderText={placeholder}
          noOptionsText={noOptionsText}
          allowNew={allowNew}
          allowMultipleTags={allowMultipleTags}
          selected={[]}
          renderInput={Input}
          suggestionsTransform={suggestionsTransform}
        />
        <ComponentFormUnwrapButton type="button" onClick={displayListOfTags}>
          {seeAllText}
        </ComponentFormUnwrapButton>
      </>
    );
  },

  global: false,
  local: true,
};

const withRegisteredTags: HOC<WithRegisterSuggestionsType> = Component => {
  const WithRegisteredTags = (props: any) => {
    const { registerSuggestions } = props;
    const { componentData } = useNodeDataHandlers<TagsNodeType>();

    if (!isEmpty(componentData) && componentData.tags) {
      registerSuggestions([...componentData.tags]);
    }

    return <Component {...props} />;
  };
  return WithRegisteredTags;
};

const withTagButton = (useOverrides?: UseTagButtonOverrides) => {
  const editButtonOptions = useOverrides
    ? (props: any) => ({ ...tagButtonOptions, ...useOverrides(props) })
    : tagButtonOptions;
  return flowHoc(
    withEditButton(editButtonOptions),
    withRegisteredTags,
  );
};

export default withTagButton;
