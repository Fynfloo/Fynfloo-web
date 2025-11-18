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
  summary: (props: Record<string, unknown>) => ReactNode;
  children?: ReactNode;
};

export const ToolbarSection = ({
  title,
  props,
  summary,
  children,
}: ToolbarSectionProps) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: Record<string, unknown>, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={title || 'section'}
    >
      <AccordionItem value={title || 'section'}>
        <AccordionTrigger>
          <div>
            <h5 className="text-sm text-foreground text-left font-medium">
              {title}
            </h5>
          </div>
          {props ? (
            <h5 className="text-light-gray-2 text-sm text-right text-dark-blue">
              {summary(nodeProps)}
            </h5>
          ) : null}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
