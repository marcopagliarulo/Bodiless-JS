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

import isEmpty from 'lodash/isEmpty';
import { useNode, TagType } from '@bodiless/core';
import { TagsNodeType } from './types';

const useTagsAccessors = () => {
  const { node } = useNode<TagsNodeType>();
  const nodeDataTag = { value: '', label: '' } as TagType;

  if (!isEmpty(node.data.tags)) {
    const {
      id = '',
      name = '',
      value = '',
      label = ''
    } = node.data.tags[0];
    nodeDataTag.value = value || id;
    nodeDataTag.label = label || name;
  }
  return {
    getTags: () => node.data.tags || [],
    tag: nodeDataTag,
    nodeId: node.path[node.path.length - 2] === 'default' ? node.path.toString() : node.path[node.path.length - 2],
  };
};

export default useTagsAccessors;
