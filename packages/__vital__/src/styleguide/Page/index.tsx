/**
 * Copyright © 2022 Johnson & Johnson
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

import { asFluidToken } from '@bodiless/vital-elements';
import {
  vitalPage,
} from '@bodiless/vital-templates';
import { __vital__StyleGuideTemplate } from './StyleGuideTemplate';

const {
  Editors,
  EditorsMonoFont,
  Typography,
  Layout,
  Header,
  FlowContainer,
  Images,
  Footer,
  _default
} = __vital__StyleGuideTemplate;

const Default = asFluidToken({
  ...vitalPage.Default,
  Components: {
    _default,
    Editors,
    EditorsMonoFont,
    Typography,
    Layout,
    Header,
    FlowContainer,
    Images,
    Footer,
  },
});

export const __vital__StyleGuidePage = { Default };