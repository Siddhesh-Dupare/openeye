
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export default function SideBarHeader() {
  return (
    <SidebarMenu className="border-b border-sidebar-border px-3 py-4">
      <SidebarMenuItem>
        <span className="px-2 text-lg font-semibold tracking-tight text-foreground">
          OpenEye
        </span>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
