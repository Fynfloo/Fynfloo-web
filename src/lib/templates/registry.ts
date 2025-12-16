import { beautyTemplate } from './beauty';
import { eventsTemplate } from './events';
import { fashionTemplate } from './fashion';
import { foodTemplate } from './food';
import { generalTemplate } from './general';
import { Template } from './types';

const templates: Template[] = [
  fashionTemplate,
  foodTemplate,
  generalTemplate,
  eventsTemplate,
  beautyTemplate,
];

export function getTemplateByKey(key: string): Template | undefined {
  return templates.find((template) => template.key === key);
}

export function getAllTemplates(): Template[] {
  return templates;
}
