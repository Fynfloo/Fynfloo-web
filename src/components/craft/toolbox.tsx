import { Box, Grid, Text, Flex } from '@radix-ui/themes';
import { Element, useEditor } from '@craftjs/core';
import { Container } from './container';
import { Card } from './card';
import { Button } from './button';
import { Text as TextComponent } from './text';
import { UIButton } from './ui-button';

export const Toolbox = () => {
  const { connectors, query } = useEditor();
  return (
    <Flex
      py="2"
      px="2"
      width="100%"
      direction="column"
      align="center"
      justify="center"
      gap="2"
    >
      <Box pb="2">
        <Text>Drag to add</Text>
      </Box>

      <UIButton
        ref={(ref) => {
          if (ref) {
            connectors.create(
              ref,
              <Button text="Click me" size="medium" color="blue" />
            );
          }
        }}
      >
        Button
      </UIButton>

      <UIButton
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <TextComponent text="Hi world" />);
          }
        }}
      >
        Text
      </UIButton>

      <UIButton
        ref={(ref) => {
          if (ref) {
            connectors.create(
              ref,
              <Element is={Container} padding={20} canvas />
            );
          }
        }}
      >
        Container
      </UIButton>

      <UIButton
        ref={(ref) => {
          if (ref) {
            connectors.create(ref, <Card />);
          }
        }}
      >
        Card
      </UIButton>
    </Flex>
  );
};
