'use client';

import React from 'react';
import { useEditorStore } from '@/components/editor/core/store';
import { ColorPicker } from '@/components/editor/ui/color-picker';
import { tokens } from '@/design-system/tokens';

const ContainerSettings: React.FC = () => {
  const selectedId = useEditorStore((s) => s.selectedId);
  const node = useEditorStore((s) => (selectedId ? s.nodes[selectedId] : null));
  const updateProps = useEditorStore((s) => s.updateProps);

  if (!node) return null;
  const onChange = (k: string, v: string) => updateProps(node.id, { [k]: v });

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      {/* Background Setting */}
      <label>Background</label>
      <ColorPicker
        value={
          typeof node.props.backgroundColor === 'string'
            ? node.props.backgroundColor || tokens.color.backgroundAlt
            : ''
        }
        onChange={(v) => onChange('backgroundColor', v)}
      />
      {/* Padding Setting */}
      <label>Padding (single value or JSON)</label>
      <input
        value={
          typeof node.props.padding === 'string'
            ? node.props.padding
            : JSON.stringify(node.props.padding)
        }
        onChange={(e) => {
          try {
            const parsed = JSON.parse(e.target.value);
            onChange('padding', parsed);
          } catch {
            onChange('padding', e.target.value);
          }
        }}
      />

      {/* Max Width Setting */}
      <label>Max width</label>
      <input
        value={
          typeof node.props.maxWidth === 'string'
            ? node.props.maxWidth
            : '1200px'
        }
        onChange={(e) => onChange('maxWidth', e.target.value)}
      />
    </div>
  );
};

export default ContainerSettings;
