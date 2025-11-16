import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { ReactNode } from 'react';
import { useNode } from '@craftjs/core';

export type ToolbarSectionProps = {
  title: string;
  props: string[];
  summary: string[];
  children: ReactNode;
};

export const ToolbarSection = ({
  title,
  props,
  summary,
  children,
}: Partial<ToolbarSectionProps>) => {
  const { nodeProps } = useNode((node) => ({
    nodeProps:
      props &&
      props.reduce((res: Record<string, string>, key) => {
        res[key] = node.data.props[key] || null;
        return res;
      }, {}),
  }));

  const summaryText =
    summary && nodeProps
      ? summary.map((key) => `${key}: ${nodeProps[key] ?? ''}`).join(' | ')
      : '';

  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue={title || 'section'}
    >
      <AccordionItem value={title || 'section'}>
        <AccordionTrigger>
          {title}{' '}
          {summaryText && (
            <span className="ml-2 text-muted-foreground text-sm">
              {summaryText}
            </span>
          )}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
