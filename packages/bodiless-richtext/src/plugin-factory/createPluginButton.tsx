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

import React from 'react';
import { Editor } from 'slate';
import { useSlate } from 'slate-react';
import { ToggleProps } from '../Type';
import PluginButton from '../components/PluginButton';

const defaultButton = {
  defaultProps: {
    name: 'Button',
    type: 'button',
  },
};

type requiredProps = {
  className?: string,
  children?: any,
};
type Opts = {
  toggle(options: ToggleProps): void;
  isActive(editor: Editor): boolean;
  icon: string;
  onMouseUp?(event: React.MouseEvent): void;
};

const withToggle = <P extends requiredProps> (opts:Opts) => (
  (Component:any) => (props:P) => {
    const {
      toggle,
      isActive,
      icon,
      onMouseUp,
    } = opts;
    const { children, className = '' } = props;
    const editor = useSlate();
    const componentName = Component.defaultProps ? Component.defaultProps.name : undefined;
    return (
      <PluginButton
        componentName={componentName}
        onMouseDown={
          () => toggle({
            editor,
          })
        }
        onMouseUp={
          (event) => onMouseUp?.(event)
        }
        className={`${
          isActive(editor) ? 'active bl-active' : ''
        } ${className}`}
        icon={icon}
      >
        {children}
      </PluginButton>
    );
  }
);

const createPluginButton = (props:Opts) => withToggle(props)(defaultButton);
export default createPluginButton;
export { withToggle };
