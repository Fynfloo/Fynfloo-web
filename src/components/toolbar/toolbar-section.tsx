import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { ReactNode, JSX } from 'react';
import { useNode } from '@craftjs/core';

export type ToolbarSectionProps = {
  title?: string;
  props: string[];
  //summary: (props: Record<string, unknown>) => ReactNode;
  children?: ReactNode;
};

export const ToolbarSection = ({
  title,
  props,
  //summary,
  children,
}: ToolbarSectionProps) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((acc: Record<string, unknown>, key) => {
        acc[key] = node.data.props[key];
        return acc;
      }, {}),
  }));

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full bg-card rounded-md shadow-sm"
    >
      <AccordionItem value={title || 'section'}>
        <AccordionTrigger className="flex justify-between items-center px-4 py-2 text-sm font-medium">
          <span>{title}</span>
          {/* {summary && (
            <span className="text-xs text-muted-foreground">
              {summary(nodeProps)}
            </span>
          )} */}
        </AccordionTrigger>
        <AccordionContent className="px-4 py-2 space-y-2">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
