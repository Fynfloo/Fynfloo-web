'use client';
import React from 'react';
import { useEditorStore } from '@/components/editor/core/store';
import { ColorPicker } from '@/components/editor/ui/color-picker';
import { tokens } from '@/design-system/tokens';

const TextSettings: React.FC = () => {
  const selectedId = useEditorStore((s) => s.selectedId);
  const node = useEditorStore((s) =>
    selectedId ? s.nodes[selectedId] : undefined
  );
  const updateProps = useEditorStore((s) => s.updateProps);

  if (!node) return null;
  const onChange = (k: string, v: unknown) => updateProps(node.id, { [k]: v });

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <label>Text</label>
      <input
        value={typeof node.props.text === 'string' ? node.props.text : ''}
        onChange={(e) => onChange('text', e.target.value)}
      />

      <label>Size</label>
      <select
        value={typeof node.props.size === 'string' ? node.props.size : 'md'}
        onChange={(e) => onChange('size', e.target.value)}
      >
        {Object.keys(tokens.font.sizes).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      <label>Weight</label>
      <select
        value={
          typeof node.props.weight === 'string' ? node.props.weight : 'normal'
        }
        onChange={(e) => onChange('weight', e.target.value)}
      >
        {Object.keys(tokens.font.weights).map((k) => (
          <option key={k} value={k}>
            {k}
          </option>
        ))}
      </select>

      <label>Color</label>
      <ColorPicker
        value={
          typeof node.props.color === 'string'
            ? node.props.color
            : tokens.color.textPrimary
        }
        onChange={(v) => onChange('color', v)}
      />

      <label>Align</label>
      <select
        value={typeof node.props.align === 'string' ? node.props.align : 'left'}
        onChange={(e) => onChange('align', e.target.value)}
      >
        <option value="left">left</option>
        <option value="center">center</option>
        <option value="right">right</option>
      </select>
    </div>
  );
};

export default TextSettings;
