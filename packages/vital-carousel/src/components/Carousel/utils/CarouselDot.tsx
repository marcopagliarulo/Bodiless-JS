// /**
//  * Copyright © 2021 Johnson & Johnson
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  * http://www.apache.org/licenses/LICENSE-2.0
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

import React from 'react';
import { Button } from '@bodiless/fclasses';
import { useCarouselSlideIndex } from './hooks';
// import vitalCarouselTokens from '../../CarouselTokens';

const styles = {
  indicator: {
    // 'background-color': '#BFBFBF', //  vitalCarouselTokens.ScrollIndicatorInactive,
    // border: '0',
    // 'border-radius': '50%',
    // cursor: 'pointer',
    // display: 'block',
    // transition: 'black 0.3s cubic-bezier(0.42, 0.42, 0.84, 1)',
    // width: '8px',
    // height: '8px',
  },

  // .indicator:not(.-active):hover {
  //   'background-color': vitalCarouselTokens.ScrollIndicatorActive,
  // }

  // .indicator.-active {
  //   'background-color': vitalCarouselTokens.ScrollIndicatorActive,
  // }
};

const CarouselDot = (props: any) => {
  const slideIndex = useCarouselSlideIndex();
  return <Button data-index={slideIndex} tab-index="-1" type="button" class="dot indicator" style={styles.indicator} {...props} />;
};

export default CarouselDot;
