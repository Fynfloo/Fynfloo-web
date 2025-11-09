import { tokens } from '@/design-system/tokens';
import TextSettings from '../settings/text-settings';
import ButtonSettings from '../settings/ButtonSettings';
import ContainerSettings from '../settings/container-settings';

export type PropField =
  | { type: 'string'; label?: string; placeholder?: string }
  | { type: 'number'; label?: string; min?: number; max?: number }
  | { type: 'boolean'; label?: string }
  | { type: 'color'; label?: string }
  | { type: 'select'; label?: string; options: string[] }
  | { type: 'object'; label?: string };

export type ComponentSchema = {
  props: Record<string, PropField>;
  settingsComponent?: unknown;
};

export const propSchema: Record<string, ComponentSchema> = {
  Text: {
    props: {
      text: { type: 'string', label: 'Text' },
      size: {
        type: 'select',
        label: 'Size',
        options: Object.keys(tokens.font.sizes),
      },
      weight: {
        type: 'select',
        label: 'Weight',
        options: Object.keys(tokens.font.weights),
      },
      color: { type: 'color', label: 'Color' },
      align: {
        type: 'select',
        label: 'Align',
        options: ['left', 'center', 'right'],
      },
      margin: { type: 'string', label: 'Margin' },
    },
    settingsComponent: TextSettings,
  },
  Button: {
    props: {
      label: { type: 'string', label: 'Label' },
      variant: {
        type: 'select',
        label: 'Variant',
        options: ['solid', 'outline', 'ghost'],
      },
      size: { type: 'select', label: 'Size', options: ['sm', 'md', 'lg'] },
      color: { type: 'color', label: 'Color' },
      radius: {
        type: 'select',
        label: 'Radius',
        options: Object.keys(tokens.radius),
      },
      padding: { type: 'string', label: 'Padding' },
    },
    settingsComponent: ButtonSettings,
  },

  Container: {
    props: {
      backgroundColor: { type: 'color', label: 'Background' },
      padding: { type: 'string', label: 'Padding' },
      maxWidth: { type: 'string', label: 'Max width' },
    },
    settingsComponent: ContainerSettings,
  },

  Card: {
    props: {
      backgroundColor: { type: 'color', label: 'Background' },
      padding: { type: 'string', label: 'Padding' },
      title: { type: 'string', label: 'Title' },
      subtitle: { type: 'string', label: 'Subtitle' },
    },
  },
};
