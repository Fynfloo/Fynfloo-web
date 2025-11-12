import { Box, Grid, Text, Button, Flex } from '@radix-ui/themes';

export const Toolbox = () => {
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

      <Button size="2">Button</Button>

      <Button size="2">Text</Button>

      <Button size="2">Container</Button>

      <Button size="2">Card</Button>
    </Flex>
  );
};
