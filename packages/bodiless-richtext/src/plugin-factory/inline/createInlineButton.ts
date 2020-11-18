/**
 * Copyright © 2019 Johnson & Johnson
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

import { ComponentType } from 'react';
import { removeInline, insertInline, hasInline } from './inlineUtils';
import createPluginButton from '../createPluginButton';
import { EditorButtonProps } from '../../Type';

type CreateInlineButton = (
  inlineType: string,
  icon: string,
) => ComponentType<EditorButtonProps>;

const createInlineButton: CreateInlineButton = (inlineType, icon) => createPluginButton({
  icon,
  toggle: ({ value, editor }) => {
    if (hasInline(value, inlineType)) {
      removeInline(editor, inlineType);
    } else {
      insertInline({ value, editor, inlineType });
    }
  },
  isActive: value => hasInline(value, inlineType),
  // Workaround to handle losing focus on click #603.
  onMouseUp: (event: React.MouseEvent) => {
    const currentTarget = event.currentTarget as HTMLElement;
    currentTarget.focus();
  },
});

export default createInlineButton;
