'use client';
import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
} from 'react';
import { styled } from 'styled-components';
import { useNode } from '@craftjs/core';
import { UserComponent } from '@craftjs/core';
import { useViewport, DEVICES } from './context/viewport-context';

export type CanvasProps = {
  children?: React.ReactNode;
  className?: string;
};

const Outer = styled.div`
  flex: 1;
  width: 100%;
  height: 100%;
  min-height: 0;
  min-width: 0;
  padding: 16px;
  display: flex;
  justify-content: center; /* centers tablet/mobile previews */
  align-items: flex-start;

  overflow: auto;
  background: var(--background);
`;

const DeviceFrame = styled.div<{ $w: number; $h: number; $scale: number }>`
  width: 100%;
  max-width: ${({ $w }) => $w}px;
  min-height: ${({ $h }) => $h}px;
  height: auto;
  overflow: visible;

  background: var(--background);
  border-radius: 0;

  box-shadow: ${({ $w }) =>
    $w === DEVICES.desktop.width
      ? 'none'
      : '0 0 0 1px var(--border), 0 8px 24px var(--canvas-inner)'};

  transform-origin: top center;
  transform: ${({ $scale }) => `scale(${$scale})`};

  transition: transform 160ms ease;
`;

const Inner = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  overflow: visible;
`;

export const Canvas: UserComponent<CanvasProps> = ({ children, className }) => {
  const {
    connectors: { connect },
  } = useNode();

  const { device, zoom } = useViewport();

  const outerRef = useRef<HTMLDivElement | null>(null);
  const [outerSize, setOuterSize] = useState<{ w: number; h: number }>({
    w: 0,
    h: 0,
  });

  // Observe resize of canvas area
  useLayoutEffect(() => {
    if (!outerRef.current) return;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setOuterSize({ w: rect.width, h: rect.height });
    });
    ro.observe(outerRef.current);
    return () => ro.disconnect();
  }, []);

  const deviceWidth = useMemo(() => {
    if (device === 'desktop') return outerSize.w;
    return DEVICES[device].width;
  }, [device, outerSize.w]);

  // AUTO-SCALE (now fills width, not capped at 1)
  const autoScale = useMemo(() => {
    if (!outerSize.w) return 1;
    if (device === 'desktop') return 1;
    const maxAvailable = outerSize.w;
    return Math.min(1, maxAvailable / deviceWidth);
  }, [device, outerSize.w, deviceWidth]);

  const finalScale = Number((zoom * autoScale).toFixed(3));

  const frameHeight = useMemo(() => {
    if (!outerSize.h) return 800;

    // Fill vertical space but account for scale
    return outerSize.h / finalScale;
  }, [outerSize.h, finalScale]);

  return (
    <Outer ref={outerRef}>
      <DeviceFrame
        $w={deviceWidth}
        $h={frameHeight}
        $scale={finalScale}
        className={className}
        ref={(dom) => {
          if (dom) connect(dom);
        }}
      >
        <Inner>{children}</Inner>
      </DeviceFrame>
    </Outer>
  );
};

Canvas.craft = {
  displayName: 'Canvas',
};
