'use client';
import React from 'react';
import { useEditorStore } from '@/components/editor/core/store';
import { ColorPicker } from '@/components/editor/ui/color-picker';
import { tokens } from '@/design-system/tokens';

const ButtonSettings: React.FC = () => {
  const selectedId = useEditorStore((s) => s.selectedId);
  const node = useEditorStore((s) => (selectedId ? s.nodes[selectedId] : null));
  const updateProps = useEditorStore((s) => s.updateProps);

  if (!node) return null;
  const onChange = (k: string, v: string) => updateProps(node.id, { [k]: v });

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* Label Setting */}
      <label>Label</label>
      <input
        value={typeof node.props.label === 'string' ? node.props.label : ''}
        onChange={(e) => onChange('label', e.target.value)}
      />

      {/* Variant Setting */}
      <label>Variant</label>
      <select
        value={
          typeof node.props.variant === 'string'
            ? node.props.variant || 'solid'
            : ''
        }
        onChange={(e) => onChange('variant', e.target.value)}
      >
        <option value="solid">solid</option>
        <option value="outline">outline</option>
        <option value="ghost">ghost</option>
      </select>

      {/* Size Setting */}
      <label>Size</label>
      <select
        value={
          typeof node.props.size === 'string' ? node.props.size || 'md' : ''
        }
        onChange={(e) => onChange('size', e.target.value)}
      >
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
      </select>

      {/* Color Setting */}
      <label>Color</label>
      <ColorPicker
        value={
          typeof node.props.size === 'string' ? node.props.size || 'md' : ''
        }
        onChange={(v) => onChange('color', v)}
      />

      {/* Radius Setting */}
      <label>Radius</label>
      <select
        value={
          typeof node.props.radius === 'string' ? node.props.radius || 'md' : ''
        }
        onChange={(e) => onChange('radius', e.target.value)}
      >
        {Object.keys(tokens.radius).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      <label>Padding</label>
      <input
        value={typeof node.props.padding === 'string' ? node.props.padding : ''}
        onChange={(e) => onChange('padding', e.target.value)}
        placeholder="e.g. 12px 24px"
      />
    </div>
  );
};

export default ButtonSettings;
