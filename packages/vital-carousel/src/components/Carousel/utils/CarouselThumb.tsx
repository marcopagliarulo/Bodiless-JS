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
import { Img, Button, as } from '@bodiless/fclasses';
import { vitalImage } from '@bodiless/vital-image';
import { useCarouselSlideIndex } from './hooks';

const styles = {
  thumbs: {
    border: '0',
    cursor: 'pointer',
    display: 'block',
    transition: 'black 0.3s cubic-bezier(0.42, 0.42, 0.84, 1)',
    width: '94px',
    height: '94px',
  },
};

const ThumbImage = as(
  vitalImage.Default,
)(Img);

const CarouselThumb = (props: any) => {
  const slideIndex = useCarouselSlideIndex();
  return <Button class="thumbs indicator" data-index={slideIndex} tab-index="-1" type="button" style={styles.thumbs} {...props}><ThumbImage /></Button>;
};

export default CarouselThumb;
