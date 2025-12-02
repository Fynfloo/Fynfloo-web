'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Globe2,
  Home,
  Package,
  Settings,
  ShoppingCart,
  Users,
} from 'lucide-react';

export function TenantSidebar({ tenantSlug }: { tenantSlug: string }) {
  return (
    <Sidebar collapsible="icon" className="bg-background">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Store</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/s/${tenantSlug}/dashboard`}>
                  <Home className="h4 w-4" />
                  <span>Overview</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/s/${tenantSlug}/products`}>
                  <Package className="h4 w-4" />
                  <span>Products</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/s/${tenantSlug}/orders`}>
                  <ShoppingCart className="h4 w-4" />
                  <span>Orders</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`https://${tenantSlug}.fynfloo.com`} target="_blank">
                  <Globe2 className="h-4 w-4" />
                  <span>View Store</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel>Settings</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/s/${tenantSlug}/team`}>
                  <Users className="h-4 w-4" />
                  <span>Team Members</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <a href={`/s/${tenantSlug}/settings`}>
                  <Settings className="h-4 w-4" />
                  <span>Store Settings</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
