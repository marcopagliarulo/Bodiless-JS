/* eslint-disable import/no-dynamic-require, global-require */
/**
 * Copyright © 2023 Johnson & Johnson
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
import { getPackageTailwindConfig } from '@bodiless/fclasses';

const plugin = require('tailwindcss/plugin');

const twConfig = {
  content: [
    './lib/**/!(*.d).{ts,js,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '.scrollbar': {
          overflowY: 'auto',
          scrollbarColor: '#019881 #BFBFBF',
          scrollbarWidth: 'thin',
        },
        '.scrollbar::-webkit-scrollbar': {
          height: '8px',
          width: '2px',
        },
        '.scrollbar::-webkit-scrollbar-thumb': {
          backgroundColor: '#019881',
          'border-radius': '10px',
        },
        '.scrollbar::-webkit-scrollbar-track': {
          'border-radius': '10px',
        },
        '.scrollbar::-webkit-scrollbar-track-piece': {
          backgroundColor: '#BFBFBF',
        },
      });
    }),
    plugin(({ addUtilities }) => {
      addUtilities(
        {
          '.scroll-snap-slider': {
            'padding-inline': '0',
          },
          '.scroll-snap-slider.-multi': {
            width: '100%',
          },
          '.scroll-snap-slider.-draggable': {
            cursor: 'grab',
          },
          '.scroll-snap-slider.-draggable.-dragging': {
            cursor: 'grabbing',
          },
          '.scroll-snap-slider .scroll-snap-slide': {
            'scroll-snap-align': 'start',
          },
          '.indicators': {
            transition: 'opacity 0.3s cubic-bezier(0.42, 0.42, 0.84, 1)',
          },
          '.indicators.-hidden': {
            opacity: '0',
          },
          '.indicators input[type="radio"]': {
            display: 'none',
          },
          // '.indicator:not(.-active):hover': {
          //   'background-color': '#019881',
          // },
          // '.indicators .indicator.-active': {
          //   'background-color': '#019881',
          // },
        }
      );
    }),
  ],
};

module.exports = getPackageTailwindConfig({
  twConfig,
  resolver: (pkgName) => require.resolve(pkgName),
});
