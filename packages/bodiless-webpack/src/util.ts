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

export const createLogger = (log = true) => (message: string) => {
  // eslint-disable-next-line no-console
  if (log) console.log(message);
};

type IncludeSetting = RegExp | boolean;

export type PluginOptions = {
  enabled?: boolean,
  logging?: boolean,
  include?: IncludeSetting,
  exclude?: RegExp,
};

export type StatoscopePluginOptions = Omit<PluginOptions, 'include' | 'logging'> & {
  sitePath: string;
  root?: string;
  open?: false | 'dir' | 'file';
  name?: string;
  additionalStats?: string[];
};

type Resolver = (args: { componentName: string, packageName?: string }) => string;

export type TokenShadowPluginOptions = Omit<PluginOptions, 'exclude'> & {
  resolvers: Resolver[];
};
