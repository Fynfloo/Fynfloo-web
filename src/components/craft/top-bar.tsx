import { Label } from '@radix-ui/react-label';
// import { Switch } from '@radix-ui/react-switch';
import { Box, Button, Flex, Switch } from '@radix-ui/themes';
import { useEditor } from '@craftjs/core';

export const TopBar = () => {
  const { actions, query, enabled } = useEditor((state) => ({
    enabled: state.options.enabled,
  }));
  return (
    <Box px="1" py="1" mt="3" mb="1">
      <Box>
        <Flex as="div" align="center" justify="between">
          <Flex as="div" align="center" justify="center" gap="1">
            <Switch
              id="enable"
              checked={enabled}
              onCheckedChange={(value) =>
                actions.setOptions((options) => {
                  options.enabled = value;
                })
              }
            />
            <Label htmlFor="enable">Enable</Label>
          </Flex>
          <Flex as="div" align="center" justify="center">
            <Button
              size="2"
              variant="outline"
              onClick={() => {
                console.log(query.serialize());
              }}
            >
              Serialize JSON to console
            </Button>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
