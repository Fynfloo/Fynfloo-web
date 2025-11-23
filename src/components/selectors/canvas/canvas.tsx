'use client';
import React, { useState, useRef, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNode } from '@craftjs/core';
import { UserComponent } from '@craftjs/core';
//import { CanvasSettings } from './Canvas-settings';

export type CanvasProps = {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  height?: number;
  scale?: number;
};

const VIEWPORTS = {
  desktop: { label: 'Desktop', width: 1200, height: 800 },
  tablet: { label: 'Tablet', width: 800, height: 1000 },
  mobile: { label: 'Mobile', width: 375, height: 667 },
};

const Toolbar = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
  max-width: 100%;
`;

type StyledCanvasProps = {
  $width?: CanvasProps['width'];
  $height?: CanvasProps['height'];
  $scale: CanvasProps['scale'];
};

const StyledCanvas = styled.div<StyledCanvasProps>`
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background: var(--canvas-inner);
  box-shadow: 0 0 0 1px #ccc;
  border-radius: 12px;
  overflow: auto;
  box-sizing: border-box;
  position: relative;
  transform-origin: top center;
  transition: width 0.2s ease, height 0.2s ease, transform 0.2s ease;
  transform: ${({ $scale }) => `scale(${$scale})`};
`;

export const Canvas: UserComponent<CanvasProps> = (props) => {
  const {
    connectors: { connect, drag },
  } = useNode();

  const { children, className } = props;

  const [viewport, setViewport] = useState<keyof typeof VIEWPORTS>('desktop');
  const [scale, setScale] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const parentWidth =
          containerRef.current.parentElement?.offsetWidth || 0;
        const maxWidth = VIEWPORTS[viewport].width;
        if (parentWidth < maxWidth) {
          setScale(parentWidth / maxWidth);
        } else {
          setScale(1);
        }
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [viewport]);

  const increaseScale = () => setScale((s) => Math.min(s + 0.1, 2));
  const decreaseScale = () => setScale((s) => Math.max(s - 0.1, 0.2));

  return (
    <div
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toolbar>
        {Object.entries(VIEWPORTS).map(([key, vp]) => (
          <button
            key={key}
            onClick={() => setViewport(key as keyof typeof VIEWPORTS)}
            style={{
              fontWeight: viewport === key ? 'bold' : 'normal',
            }}
            type="button"
          >
            {vp.label}
          </button>
        ))}
        <span style={{ marginLeft: 'auto' }}>
          Scale: <b>{(scale * 100).toFixed(0)}%</b>
          <button
            onClick={decreaseScale}
            style={{ margin: '0 0.5rem' }}
            type="button"
          >
            −
          </button>
          <button onClick={increaseScale} type="button">
            +
          </button>
        </span>
      </Toolbar>
      <StyledCanvas
        ref={(dom) => {
          if (dom) connect(drag(dom));
        }}
        $width={VIEWPORTS[viewport].width}
        $height={VIEWPORTS[viewport].height}
        $scale={scale}
        className={className}
        style={{ maxWidth: '100%' }}
      >
        {children}
      </StyledCanvas>
    </div>
  );
};

Canvas.craft = {
  displayName: 'Canvas',
};
