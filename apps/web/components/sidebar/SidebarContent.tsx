
import { SidebarContent, SidebarGroup } from "@/components/ui/sidebar";
import { MessageSquarePlus } from "lucide-react";

export default function SideBarContent() {
  return (
    <SidebarContent>
      <SidebarGroup className="px-3 py-4">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center gap-2 rounded-md border border-sidebar-border bg-sidebar-accent px-3 py-2.5 text-sm font-medium text-sidebar-foreground transition-colors hover:border-primary/60 hover:bg-sidebar-accent/80 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
        >
          <MessageSquarePlus className="size-4 text-accent" />
          <span>New Chat</span>
        </button>
      </SidebarGroup>
    </SidebarContent>
  );
}
