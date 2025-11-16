'use client';

import React from 'react';
import Viewport from '@/components/viewport/viewport';
import { Editor, Frame, Element } from '@craftjs/core';
import { Container } from '@/components/craft/container';
import { Text } from '@/components/selectors/text';
import { Button } from '@/components/selectors/button';

export default function Page() {
  return (
    <Editor
      resolver={{
        Container,
        Text,
        Button,
      }}
    >
      <Viewport>
        <Frame>
          <Element canvas is={Container}></Element>
        </Frame>
      </Viewport>
    </Editor>
  );
}
