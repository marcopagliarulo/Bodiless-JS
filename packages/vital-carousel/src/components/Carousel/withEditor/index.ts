/**
 * Copyright © 2021 Johnson & Johnson
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
import { ifEditable } from '@bodiless/core';
import { withNode } from '@bodiless/data';
import type { WithNodeKeyProps } from '@bodiless/data';
import { asBodilessList } from '@bodiless/components';
import {
  withDesign, replaceWith, flowHoc, as, addProps
} from '@bodiless/fclasses';
import { Slide } from 'pure-react-carousel';
import withTotalSlides from '../utils/withTotalSlides';

// import { withIntrinsicHeight, withNoDragIfEditable, withNoAutoPlayIfEditable } from './token';

const withEditor = (nodeKeys?: WithNodeKeyProps) => flowHoc(
  withNode,
  withDesign({
    Wrapper: as(
      withTotalSlides(nodeKeys),
      // below is withIntrinsicHeigght
      addProps({ isIntrinsicHeight: true }),
      // below is withNoDragIfEditable
      ifEditable(addProps({ dragEnabled: false })),
    ),
    Slider: flowHoc(
      asBodilessList(nodeKeys, undefined, () => ({ groupLabel: 'Slide' })),
      withDesign({
        Item: replaceWith(Slide),
      }),
    ),
    // withNoAutoPlayIfEditable
    ButtonPlay: ifEditable(addProps({ disabled: true })),
  }),
);

export default withEditor;
