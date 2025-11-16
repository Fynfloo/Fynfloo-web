import { useEditor } from '@craftjs/core';
import * as React from 'react';

export * from './toolbar-item';
export * from './toolbar-section';
export * from './toolbar-text-input';

export const Toolbar = () => {
  const { active, related } = useEditor((state, query) => {
    const currentlySelectedNodeId = query.getEvent('selected').first();

    return {
      active: currentlySelectedNodeId,
      related:
        currentlySelectedNodeId && state.nodes[currentlySelectedNodeId].related,
    };
  });

  return (
    <div className="py-1 h-full">
      {active && related.toolbar && React.createElement(related.toolbar)}
      {!active && (
        <div className="px-5 py-2 flex flex-col items-center h-full justify-center text-center bg-background text-foreground">
          <h2>Click on a component to start editing.</h2>
          <h2>
            You could also double click on the layers below to edit their names,
            like in Photoshop
          </h2>
        </div>
      )}
    </div>
  );
};
