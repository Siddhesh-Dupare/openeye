
import { SidebarFooter, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";

import { User2 } from "lucide-react";

export default function SideBarFooter() {
  return (
    <SidebarFooter className="border-t border-sidebar-border p-3">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton className="h-auto cursor-pointer gap-3 px-2.5 py-2 hover:bg-sidebar-accent">
            <User2 className="size-5 text-text-secondary" />
            <div className="flex min-w-0 flex-col gap-0.5">
              <span className="truncate text-sm font-medium text-foreground">
                John Doe
              </span>
              <span className="truncate text-xs text-text-secondary">
                john.doe@example.com
              </span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
}
