import type {
  SectionType,
  SectionDataMap,
  SectionDefaultContext,
} from './types';

export interface SectionDefinition<TType extends SectionType = SectionType> {
  type: TType;
  label: string;
  group: 'hero' | 'content' | 'commerce' | 'food' | 'events' | 'checkout';
  description?: string;
  component: React.ComponentType<{ data: SectionDataMap[TType] }>;
  getDefaultData: (ctx: SectionDefaultContext) => SectionDataMap[TType];
}

type AnySectionDefinition = SectionDefinition<SectionType>;

const registry: Partial<Record<SectionType, AnySectionDefinition>> = {};

export function registerSection<TType extends SectionType>(
  def: SectionDefinition<TType>
) {
  registry[def.type] = def as unknown as AnySectionDefinition;
}

export function getSectionDefinition(
  type: SectionType
): SectionDefinition | undefined {
  return registry[type];
}

export function getAllSections() {
  return Object.values(registry).filter(Boolean) as SectionDefinition[];
}
