import { Sidebar } from "@/components/ui/sidebar";
import SideBarHeader from "@/components/sidebar/SidebarHeader";
import SideBarFooter from "@/components/sidebar/SidebarFooter";
import SideBarContent from "@/components/sidebar/SidebarContent";

export default function Main() {
  return (
    <Sidebar className="border-sidebar-border bg-sidebar">
      <SideBarHeader />
      <SideBarContent />
      <div className="mt-auto">
        <SideBarFooter />
      </div>
    </Sidebar>
  );
}
