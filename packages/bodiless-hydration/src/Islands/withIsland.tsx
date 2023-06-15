import React from 'react';
import { HOC } from '@bodiless/fclasses';

const stringifyReplacer = (key: string, value: any): any => {
  const propsToRemove = ['__source', '__self', 'stateNode', '_context', 'return', 'children'];
  return propsToRemove.includes(key) ? undefined : value;
};

const createSerializedData = (props: any) => JSON.stringify(props, stringifyReplacer);

const withIsland = (ComponentName: string) : HOC => (Component) => {
  const WithIsland = (props: any) => {
    const serializedData = createSerializedData(props);

    return (
      <span
        data-island-component={ComponentName}
        data-island-props={serializedData}
        style={{display: 'content'}}
      >
        <Component
          {...props}
        />
      </span>
    );
  };

  return WithIsland;
};

export {
  withIsland,
};

export default withIsland;
