'use client';
import React from 'react';
import { tokens } from '@/design-system/tokens';

type Props = {
  value: string;
  onChange: (hex: string) => void;
  compareTo?: string;
  showTokens?: boolean;
};

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  const full =
    h.length === 3
      ? h
          .split('')
          .map((c) => c + c)
          .join('')
      : h;
  const bigint = parseInt(full, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return { r, g, b };
}

function luminance({ r, g, b }: { r: number; g: number; b: number }) {
  const srgb = [r, g, b].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * srgb[0] + 0.7152 * srgb[1] + 0.0722 * srgb[2];
}

function contrastRatio(hex1: string, hex2: string) {
  const l1 = luminance(hexToRgb(hex1));
  const l2 = luminance(hexToRgb(hex2));
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return +((brighter + 0.05) / (darker + 0.05)).toFixed(2);
}

export const ColorPicker: React.FC<Props> = ({
  value,
  onChange,
  compareTo,
  showTokens = true,
}) => {
  const compare = compareTo || tokens.color.textOnPrimary;
  const contrast = contrastRatio(value || '#000000', compare);
  const tokenEntries = Object.entries(tokens.color);

  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          type="color"
          value={value || '#000000'}
          onChange={(e) => onChange(e.target.value)}
          style={{ width: 44, height: 28, border: 'none' }}
        />
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          style={{ fontFamily: 'monospace', padding: '6px 8px', width: 120 }}
        />
        <div style={{ fontSize: 12, color: tokens.color.textSecondary }}>
          Contrast: <strong>{contrast}:1</strong>
        </div>
        <div
          style={{
            padding: '4px 8px',
            background: contrast >= 4.5 ? '#dff0d8' : '#fde2e2',
            borderRadius: 6,
            fontSize: 12,
          }}
        >
          {contrast >= 4.5 ? 'AA' : 'Fail'}
        </div>
      </div>

      {showTokens && (
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {tokenEntries.slice(0, 8).map(([k, v]) => (
            <button
              key={k}
              onClick={() => onChange(v)}
              title={k}
              style={{
                width: 28,
                height: 28,
                borderRadius: 6,
                background: v,
                border: '1px solid rgba(0,0,0,0.08)',
                cursor: 'pointer',
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
