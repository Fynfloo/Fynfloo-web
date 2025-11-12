import { Container } from './container';
import { Text } from './text';
import { Button } from './button';
import { useNode, Element } from '@craftjs/core';
import { ReactNode } from 'react';

interface CraftRuleNode {
  data: {
    type?: {
      resolvedName?: string;
    };
    props?: Record<string, unknown>;
  };
}

export const CardTop = ({ children }: { children: ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      className="text-only"
    >
      {children}
    </div>
  );
};

CardTop.craft = {
  rules: {
    canMoveIn: (incomingNode: CraftRuleNode | CraftRuleNode[]) => {
      const nodes = Array.isArray(incomingNode) ? incomingNode : [incomingNode];
      return nodes.every((node) => node.data.type === Text);
    },
  },
};

export const CardBottom = ({ children }: { children: ReactNode }) => {
  const {
    connectors: { connect },
  } = useNode();
  return (
    <div
      ref={(ref) => {
        if (ref) connect(ref);
      }}
    >
      {children}
    </div>
  );
};

CardBottom.craft = {
  rules: {
    // Only accept Buttons
    canMoveIn: (incomingNodes: CraftRuleNode | CraftRuleNode[]) => {
      const nodes = Array.isArray(incomingNodes)
        ? incomingNodes
        : [incomingNodes];
      return nodes.every((node) => node.data.type === Button);
    },
  },
};

export const Card = ({
  background = '#fff',
  padding = 20,
}: {
  background?: string;
  padding?: number;
}) => {
  return (
    <Container background={background} padding={padding}>
      {/*<Element /> used inside User Component must specify an id prop*/}
      <Element id="text" is={CardTop} canvas>
        <Text text="Title" fontSize={20} />
        <Text text="Subtitle" fontSize={15} />
      </Element>
      {/*<Element /> used inside User Component must specify an id prop*/}
      <Element id="buttons" is={CardBottom} canvas>
        <Button color="blue" size="medium" variant="solid" text="Learn more" />
      </Element>
    </Container>
  );
};
