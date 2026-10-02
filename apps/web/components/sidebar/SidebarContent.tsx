
import {
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { sidebarNavItems, type SidebarNavItem } from "@/data/sidebar-component";

function renderSidebarNavItem({
  label,
  icon: Icon,
  isActive,
  className = "",
  iconClassName = "",
}: SidebarNavItem) {
  return (
    <SidebarMenuItem key={label}>
      <SidebarMenuButton
        className={`cursor-pointer ${className}`}
        isActive={isActive}
      >
        <Icon className={`size-4 ${iconClassName}`} />
        <span>{label}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export default function SideBarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="px-3 py-4">
        <SidebarMenu className="gap-1">
          {sidebarNavItems.map(renderSidebarNavItem)}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
