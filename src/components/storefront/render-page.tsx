'use client';

import type { PageLayout, SectionInstance } from '@/lib/sections/types';
import { getSectionDefinition } from '@/lib/sections/registry';

export function RenderPage({ layout }: { layout: PageLayout }) {
  return (
    <>
      {layout.map((section) => (
        <RenderSection key={section.id} section={section} />
      ))}
    </>
  );
}

function RenderSection({ section }: { section: SectionInstance }) {
  const def = getSectionDefinition(section.type);
  if (!def) return null;
  const Component = def.component;
  return <Component data={section.data} />;
}
