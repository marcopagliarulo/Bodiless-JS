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

/* eslint-disable no-underscore-dangle */
import { applyDesign, Fragment } from '@bodiless/fclasses';
import type { Design, ComponentOrTag, DesignableComponents } from '@bodiless/fclasses';
import { pick } from '@bodiless/utils';
import { useRef } from 'react';

/**
 * Interface for an object which exposes two sets of components: those
 * needed to render the flow container or chameleon, and those needed to
 * render the component selector.
 */
export type SelectorComponentsInterface = {
  /**
   * The components needed to render the flow container itself
   */
  components: DesignableComponents;
  /**
   * The components neededd to render the component selector.
   */
  selectableComponents: DesignableComponents;
};

/**
 * Properties which must be passed to the constructor of the
 * SelectorComponents class.
 */
export type SelectorComponentsProps = {
  startComponents?: DesignableComponents | undefined;
  DefaultComponent: ComponentOrTag<any>;
  design: Design;
  selectedComponents: string[];
};

/**
 * @private
 */
const selectorComponentsDefaultProps: SelectorComponentsProps = {
  design: {},
  DefaultComponent: Fragment,
  selectedComponents: [],
};

export class SelectorComponents implements SelectorComponentsInterface {
  props: SelectorComponentsProps;

  protected _components: DesignableComponents = {};

  protected _selectableComponents: DesignableComponents | undefined;

  constructor(props: Partial<SelectorComponentsProps>) {
    this.props = { ...selectorComponentsDefaultProps, ...props };
  }

  spawn(props: Partial<SelectorComponentsProps>) {
    const offspring = new SelectorComponents(props);
    // Initialize the components of the offspring so they are not recreated.
    offspring._components = this._components;
    return offspring;
  }

  get components() {
    this._components = this.getComponents();
    return this._components;
  }

  get selectableComponents() {
    if (!this._selectableComponents) this._selectableComponents = this.getSelectableComponents();
    return this._selectableComponents;
  }

  protected getComponents(): DesignableComponents {
    const {
      design, startComponents = {}, selectedComponents = [], DefaultComponent
    } = this.props;
    const start = selectedComponents
      // Only apply design for components which haven't aleady been created.
      .filter(c => !this._components[c])
      .reduce(
        (acc, next) => ({
          ...acc,
          [next]: startComponents[next] || DefaultComponent,
        }),
        {},
      );
    return {
      ...this._components,
      ...applyDesign(start)(pick(design, Object.keys(start))),
    };
  }

  protected getSelectableComponents(): DesignableComponents {
    const {
      design, startComponents, DefaultComponent
    } = this.props;
    const start: DesignableComponents = {
      ...Object.keys(design).reduce(
        (acc, next) => ({
          ...acc,
          [next]: DefaultComponent,
        }),
        {}
      ),
      ...startComponents,
    };
    // @ts-ignore
    const name = DefaultComponent.name || DefaultComponent.displayName;
    return applyDesign(start)(design);
  }
}

export const useSelectorComponents = (props: Partial<SelectorComponentsProps>) => {
  const ref = useRef<SelectorComponents>();
  ref.current = ref.current ? ref.current.spawn(props) : new SelectorComponents(props);
  return ref.current;
};
