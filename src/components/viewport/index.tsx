'use client';

import React from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import Viewport from './viewport';
import { Text } from '@/components/selectors/text/index';
import { Button } from '@/components/selectors/button/index';
import { Section } from '@/components/selectors/section/index';
import { RenderNode } from './render-node';
import { Canvas } from '@/components/selectors/canvas/canvas';
import { Container } from '@/components/selectors/container/index';
import { Layout } from '@/components/selectors/layout/index';

export default function App() {
  return (
    <div>
      <Editor
        resolver={{
          Text,
          Button,
          Section,
          RenderNode,
          Canvas,
          Container,
          Layout,
        }}
        onRender={RenderNode}
        enabled={true}
      >
        <Viewport>
          <Frame>
            <Element canvas is={Canvas}>
              {/* Your initial nodes can go here */}
            </Element>
          </Frame>
        </Viewport>
      </Editor>
    </div>
  );
}
