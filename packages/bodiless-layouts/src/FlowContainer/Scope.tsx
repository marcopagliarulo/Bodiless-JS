import React, { useContext, createContext, ComponentType } from 'react';
import {
  HOC
} from '@bodiless/fclasses';
import {
  isArray,
  mergeWith,
  difference
} from 'lodash';


export type Scope = {
  scope: string[]
};
export type ComponentWithScope<P = any> = ComponentType<P> & Scope;

function customizer(objValue:any, srcValue:any) {
  if (isArray(objValue)) {
    return objValue.concat(srcValue);
  }
  return undefined;
}
/**
 * withScope creates an HOC that will add scope data to a React Component
 * @param scope the data to be side loaded in to the component
 */
export const withScope = (scope:string[]): HOC => Component => {
  const newScope = mergeWith({}, Component, { scope: scope }, customizer);
  return Object.assign(Component, newScope) as ComponentWithScope<any>;
};

export const removeScope = (removedScope:string[]): HOC => Component => {
  const { scope = [] } = Component as any;
  const newScope = { scope: difference(scope, removedScope) };
  return Object.assign(Component, newScope) as ComponentWithScope<any>;
};

export const FlowContainerContext = createContext('Base');
export const useFlowContainerContext = () => useContext(FlowContainerContext);

export const withFlowContainerContextScope = (scope: string) : HOC => (Component) => {
  const WithFlowContainerContextScope = (props: any) => {
    return (
      <FlowContainerContext.Provider value={scope}>
        <Component {...props} />
      </FlowContainerContext.Provider>
    );
  };

  return WithFlowContainerContextScope;
};

export const withFlowContainerScope: HOC = (Component) => {
  const WithFlowContainerScope = (props: any) => {
    const contextScope = useFlowContainerContext() ;
    if (!contextScope) {
      return (
        <Component {...props} />
      );
    }
    const { components } = props;
    const { Wrapper, ComponentWrapper} = components
    const filteredComponents = Object.keys(components)
      .filter( key => {
        const { scope } = components[key];
        return ((!scope && contextScope === 'Base') || (scope  && scope.find((element: string) => element === contextScope)))
      } )
      .reduce( (res, key) => Object.assign(res, { [key]: components[key] }), {} );
    const newComponents = Object.keys(filteredComponents).length === 0
      ? components : {Wrapper, ComponentWrapper, ...filteredComponents};
    return (
      <Component {...props} components={newComponents} />
    );
  
  };

  return WithFlowContainerScope;
};
