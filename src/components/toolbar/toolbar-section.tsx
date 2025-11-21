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
      className="w-full border-b px-2"
      defaultValue={title || 'section'}
    >
      <AccordionItem value={title || 'section'}>
        <AccordionTrigger className="text-foreground font-medium text-md decorative-none">
          {title}
          {/* {summary && (
            <span className="text-xs text-muted-foreground">
              {summary(nodeProps)}
            </span>
          )} */}
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
