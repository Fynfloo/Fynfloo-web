import { Label } from '@radix-ui/react-label';
import { Badge, Box, Flex, Grid, Text, Button, Slider } from '@radix-ui/themes';
import { useEditor } from '@craftjs/core';

export const SettingsPanel = () => {
  const { actions, selected } = useEditor((state, query) => {
    const [currentNodeId] = state.events.selected;
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings:
          state.nodes[currentNodeId].related &&
          state.nodes[currentNodeId].related.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }
    return { selected };
  });
  return selected ? (
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
                    {selected.name}
                  </Badge>
                </Text>
              </Box>
            </Flex>
          </Box>
        </Grid>
        <Flex width="100%" direction="column" gap="2" pb="2">
          {selected.settings && <selected.settings />}
        </Flex>
        {selected.isDeletable ? (
          <Button
            size="2"
            variant="outline"
            color="red"
            onClick={() => {
              actions.delete(selected.id);
            }}
          >
            Delete
          </Button>
        ) : null}
      </Flex>
    </Flex>
  ) : null;
};
