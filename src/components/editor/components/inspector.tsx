'use client';
import React from 'react';
import { useEditorStore } from '../core/store';
import { propSchema } from '../core/propSchema';
import { ColorPicker } from '../ui/color-picker';
import { tokens } from '@/design-system/tokens';

type FieldType =
  | 'string'
  | 'number'
  | 'boolean'
  | 'select'
  | 'color'
  | 'object';

interface FieldBase {
  type: FieldType;
}

interface StringField extends FieldBase {
  type: 'string';
}

interface NumberField extends FieldBase {
  type: 'number';
}

interface BooleanField extends FieldBase {
  type: 'boolean';
}

interface SelectField extends FieldBase {
  type: 'select';
  options: string[];
}

interface ColorField extends FieldBase {
  type: 'color';
}

interface ObjectField extends FieldBase {
  type: 'object';
}

type Field =
  | StringField
  | NumberField
  | BooleanField
  | SelectField
  | ColorField
  | ObjectField;

type UpdateFn = (k: string, v: string | number | boolean | object) => void;

function renderField(
  nodeId: string,
  key: string,
  field: Field,
  value: unknown,
  update: UpdateFn
) {
  const commonStyle: React.CSSProperties = { width: '100%', padding: 6 };

  switch (field.type) {
    case 'string':
      return (
        <input
          style={commonStyle}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => update(key, e.target.value)}
        />
      );

    case 'number':
      return (
        <input
          style={commonStyle}
          type="number"
          value={typeof value === 'number' ? value : ''}
          onChange={(e) => update(key, Number(e.target.value))}
        />
      );

    case 'boolean':
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => update(key, e.target.checked)}
        />
      );

    case 'select':
      return (
        <select
          style={commonStyle}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => update(key, e.target.value)}
        >
          <option value="">(default)</option>
          {field.options.map((o: string) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      );

    case 'color':
      return (
        <ColorPicker
          value={typeof value === 'string' ? value : tokens.color.primary}
          onChange={(v) => update(key, v)}
        />
      );

    case 'object':
      return (
        <textarea
          style={{ width: '100%', minHeight: 80 }}
          value={JSON.stringify(value || {})}
          onChange={(e) => {
            try {
              update(key, JSON.parse(e.target.value));
            } catch {}
          }}
        />
      );

    default:
      return (
        <input
          style={commonStyle}
          value={typeof value === 'string' ? value : ''}
          onChange={(e) => update(key, e.target.value)}
        />
      );
  }
}

export const Inspector: React.FC = () => {
  const selectedId = useEditorStore((s) => s.selectedId);
  const node = useEditorStore((s) =>
    selectedId ? s.nodes[selectedId] : undefined
  );
  const updateProps = useEditorStore((s) => s.updateProps);
  const removeNode = useEditorStore((s) => s.removeNode);
  const undo = useEditorStore((s) => s.undo);
  const redo = useEditorStore((s) => s.redo);
  const clearHistory = useEditorStore((s) => s.clearHistory);

  if (!node) {
    return (
      <div style={{ padding: tokens.spacing.md }}>
        <div style={{ marginBottom: tokens.spacing.sm }}>
          <strong>No selection</strong>
        </div>
        <div style={{ color: tokens.color.textSecondary }}>
          Select an element to edit its props.
        </div>
        <div
          style={{
            marginTop: tokens.spacing.md,
            display: 'flex',
            gap: tokens.spacing.sm,
          }}
        >
          <button onClick={() => undo()}>Undo</button>
          <button onClick={() => redo()}>Redo</button>
          <button onClick={() => clearHistory()}>Clear</button>
        </div>
      </div>
    );
  }

  const schema = propSchema[node.type];
  const update = (k: string, v: string | number | boolean | object) =>
    updateProps(node.id, { [k]: v });

  return (
    <div style={{ padding: tokens.spacing.md, width: 340 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: tokens.spacing.sm,
        }}
      >
        <div>
          <strong>{node.type}</strong>
          <div
            style={{
              color: tokens.color.textSecondary,
              fontSize: tokens.font.sizes.sm,
            }}
          >
            {node.id}
          </div>
        </div>
        <div style={{ display: 'flex', gap: tokens.spacing.xs }}>
          <button onClick={() => removeNode(node.id)}>Delete</button>
        </div>
      </div>

      {schema?.settingsComponent
        ? React.createElement(schema.settingsComponent)
        : null}

      <div
        style={{
          marginTop: tokens.spacing.md,
          display: 'grid',
          gap: tokens.spacing.sm,
        }}
      >
        {schema
          ? Object.entries(schema.props).map(([key, field]) => (
              <div key={key}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    color: tokens.color.textSecondary,
                  }}
                >
                  {field.label ?? key}
                </label>
                {renderField(node.id, key, field, node.props?.[key], update)}
              </div>
            ))
          : Object.entries(node.props || {}).map(([k, v]) => (
              <div key={k}>
                <label
                  style={{
                    display: 'block',
                    marginBottom: 6,
                    color: tokens.color.textSecondary,
                  }}
                >
                  {k}
                </label>
                <input
                  style={{ width: '100%' }}
                  value={String(v ?? '')}
                  onChange={(e) => update(k, e.target.value)}
                />
              </div>
            ))}
      </div>

      <div
        style={{
          marginTop: tokens.spacing.md,
          display: 'flex',
          gap: tokens.spacing.sm,
        }}
      >
        <button onClick={() => undo()}>Undo</button>
        <button onClick={() => redo()}>Redo</button>
        <button onClick={() => clearHistory()}>Clear</button>
      </div>
    </div>
  );
};
