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
import type { KnapsackBodilessSpec } from '@bodiless/knapsack-renderer';
import React from 'react';
import { Div } from '@bodiless/fclasses';
import { vitalTextDecoration } from './components/TextDecoration';

export * from './components/Typography';
export * from './components/Color';
export * from './components/FontSize';
export * from './components/Spacing';
export * from './components/TextDecoration';
export * from './util';
export * from './KsEditProvider';

export const ElementClean = (props: any) => (
  <Div {...props}>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua
  </Div>
);

export const elementsSpec: KnapsackBodilessSpec = {
  tokens: vitalTextDecoration,
  tokensExportName: 'vitalTextDecoration',
  // @todo Provide a default content hoc in the spec which allows adding
  // some basic demo content, even if the component is later editable.
  component: ElementClean,
  componentExportName: 'ElementClean',
  slots: {},
};
