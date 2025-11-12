import { Label } from '@radix-ui/react-label';
import { Badge, Box, Flex, Grid, Text, Button, Slider } from '@radix-ui/themes';

export const SettingsPanel = () => {
  return (
    <Flex mt="2" px="2" py="2" direction="column" gap="3" width="200px">
      <Flex as="div" direction="column" gap="0">
        <Grid as="div" flow="column" gap="0">
          <Box as="div" pb="2">
            <Flex as="div" justify="between" align="center">
              <Box as="div">
                <Text>Selected</Text>
              </Box>
              <Box as="div">
                <Text>
                  <Badge variant="solid" radius="full" color="indigo">
                    Selected
                  </Badge>
                </Text>
              </Box>
            </Flex>
          </Box>
        </Grid>
        <Flex width="100%" direction="column" gap="2" pb="2">
          <Label htmlFor="slider">Prop</Label>
          <Slider min={7} max={50} step={1} defaultValue={[0]} id="slider" />
        </Flex>

        <Button size="2" variant="outline" color="red">
          Delete
        </Button>
      </Flex>
    </Flex>
  );
};
