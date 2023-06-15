import React, {
  Component,
  ReactPortal,
  ReactNode,
  useLayoutEffect,
  useState
} from 'react';
import { createPortal /* hydrateRoot */ } from 'react-dom';
import { HOC, ComponentWithMeta } from '@bodiless/fclasses';

type Islands = {
  [key: string]: ComponentWithMeta
};

type IslandsHydratorProps = {
  children: ReactNode
  Islands: Islands
};

const IslandComponents = ({islands}: {islands: Islands}) => {
  const [islandComponents, setIslandComponents] = useState<ReactPortal[]>([]);
  if (typeof window !== 'undefined') {
    useLayoutEffect(() => {
      const components: ReactPortal[] = [];
      document.querySelectorAll('[data-island-component]').forEach((island) => {
        // @ts-ignore
        const { dataset = {} } = island;

        if (typeof dataset.islandComponent === 'undefined') return;

        // @ts-ignore
        if (typeof islands[dataset.islandComponent] === 'undefined') return;

        // @ts-ignore
        const Component = islands[dataset.islandComponent];
        const props = JSON.parse(dataset.islandProps || {});
        // Remove existing html and replace with the component in portal.
        island.innerHTML = '';
        components.push(createPortal(<Component {...props} />, island));
      });
      setIslandComponents(components);
    }, []);
  }

  // eslint-disable-next-line consistent-return
  return (<>{islandComponents}</>);
};

class IslandsHydrator extends Component<IslandsHydratorProps> {
  private children: ReactNode;

  private islands: any;

  constructor(props: IslandsHydratorProps) {
    super(props);
    this.islands = props.Islands;
    this.children = props.children;
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <>
        {this.children}
        <IslandComponents islands={this.islands} />
      </>
    );
  }
}

const withIslandsHydrator = (Islands: Islands) : HOC => Component => {
  const WithIslandsHydrator = (props: any) => (
    <IslandsHydrator Islands={Islands}>
      <Component {...props} />
    </IslandsHydrator>
  );
  return WithIslandsHydrator;
};

export default withIslandsHydrator;
