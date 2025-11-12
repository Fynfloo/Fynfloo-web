import { Label } from '@radix-ui/react-label';
// import { Switch } from '@radix-ui/react-switch';
import { Box, Button, Flex, Switch } from '@radix-ui/themes';

export const TopBar = () => {
  return (
    <Box px="1" py="1" mt="3" mb="1">
      <Box>
        <Flex as="div" align="center" justify="between">
          <Flex as="div" align="center" justify="center" gap="1">
            <Switch id="enable" value="true" defaultChecked />
            <Label htmlFor="enable">Enable</Label>
          </Flex>
          <Flex as="div" align="center" justify="center">
            <Button size="2" variant="outline">
              Serialize JSON to console
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
