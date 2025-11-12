import { Heading, Flex, Box } from '@radix-ui/themes';
import React from 'react';
import { TopBar } from './top-bar';
import { Container } from './container';
import { Card, CardTop, CardBottom } from './card';
import { Button } from './button';
import { Toolbox } from './toolbox';
import { Text } from './text';
import { SettingsPanel } from './settings-panel';

import { Editor, Frame, Element } from '@craftjs/core';

export default function App() {
  return (
    <Flex
      direction="column"
      as="div"
      py="5"
      px="5"
      gap="5"
      width="100%"
      maxWidth="800px"
      mx="auto"
    >
      <Box as="div" width="100%">
        <Heading as="h5" size="4" mt="5" mb="3" align="center">
          A super simple page editor
        </Heading>
      </Box>
      <Editor resolver={{ Card, Button, Text, Container, CardTop, CardBottom }}>
        <Flex as="div" gap="3" mb="5" width="100%" direction="column">
          <Box as="div" width="100%">
            <TopBar />
          </Box>
          <Flex as="div" gap="3" width="100%">
            <Flex as="div" gap="3" width="100%" flexGrow="1">
              <Frame>
                <Element is={Container} padding={5} background="#eee" canvas>
                  <Card />
                  <Button size="medium" color="blue" text="Click" />
                  <Text text="Hi world!" fontSize={15} />
                  <Element is={Container} padding={6} background="#999" canvas>
                    <Text fontSize={15} text="It's me again!" />
                  </Element>
                </Element>
              </Frame>
            </Flex>
            <Flex>
              <Flex direction="column">
                <Toolbox />
                <SettingsPanel />
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Editor>
    </Flex>
  );
}
