import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { UIButton } from '@/components/craft/ui-button';

const items = [
  {
    title: 'Grid',
  },
  {
    title: 'Flex',
  },
  {
    title: 'Heading',
  },
  {
    title: 'Text',
  },
  {
    title: 'Button',
  },
  {
    title: 'Card',
  },
  {
    title: 'Container',
  },
];

export function SidebarLeft() {
  return (
    <Sidebar
      collapsible="icon"
      className="bg-background top-(--header-height) h-[calc(100svh-var(--header-height))]"
    >
      <SidebarContent>
        {/* Group 1 */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-md mb-4 mt-2">
            Components
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <UIButton
                  key={item.title}
                  className="mb-2 w-full justify-start"
                >
                  {item.title}
                </UIButton>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
