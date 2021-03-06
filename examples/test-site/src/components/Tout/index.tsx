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

import { flow } from 'lodash';
import {
  withContextActivator,
  withDefaultContent,
  withMenuOptions,
  withResetButton,
  withSidecarNodes,
} from '@bodiless/core';
import {
  ToutClean,
  asTestableTout,
} from '@bodiless/organisms';
import { withDesign } from '@bodiless/fclasses';
import {
  asEditableLink,
} from '../Elements.token';
import { asEditableImage } from '../Image';
import {
  withEditorBasic,
  withEditorSimple,
} from '../Editors';

export const withToutEditors = flow(
  withDesign({
    Image: asEditableImage('image'),
    ImageLink: withSidecarNodes(
      asEditableLink('link'),
    ),
    Title: withEditorSimple('title', 'Tout Title Text'),
    Link: flow(
      withEditorSimple('ctatext', 'CTA'),
      withSidecarNodes(
        asEditableLink('link', undefined, () => ({ groupLabel: 'CTA' })),
      ),
    ),
    Body: withEditorBasic('body', 'Tout Body Text'),
  }),
);

const withEmptyContext = (name: string) => flow(
  withContextActivator('onClick'),
  withMenuOptions({
    name,
    useMenuOptions: () => ([{
      name, isHidden: true, global: false, local: true,
    }]),
  }),
);

export const withToutResetButtons = withDesign({
  ImageLink: withResetButton({ nodeKey: ['image', 'link'] }),
  Title: flow(
    withEmptyContext('Title'),
    withResetButton({ nodeKey: 'title' }),
  ),
  Body: flow(
    withEmptyContext('Body'),
    withResetButton({ nodeKey: 'body' }),
  ),
  Link: withResetButton({ nodeKey: ['link', 'ctatext'] }),
});

export const asEditableTout = flow(
  withToutEditors,
  asTestableTout,
);

export const asContentfulTout = (content: object) => flow(
  withToutEditors,
  withToutResetButtons,
  withDefaultContent(content),
  asTestableTout,
);

const Tout = asEditableTout(ToutClean);
export default Tout;
export { asTestableTout };
