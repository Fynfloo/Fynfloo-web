export type CraftComponent<TProps extends object = Record<string, unknown>> =
  React.FC<TProps> & {
    craft?: {
      rules?: {
        canDrag?: (node: Node & { data: { props: TProps } }) => boolean;
        canMoveIn?: (incomingNodes: Node[]) => boolean;
        canMoveOut?: (outgoingNodes: Node[]) => boolean;
      };
      related?: Record<string, React.ComponentType<unknown>>;
    };
  };

export type ContentEditableEvent = {
  target: EventTarget & { value: string };
};
