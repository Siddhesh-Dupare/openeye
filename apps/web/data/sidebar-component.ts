
import {
  Activity,
  CheckCircle2,
  Home,
  Link2,
  MemoryStick,
  MessageSquarePlus,
  Settings,
  Target,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type SidebarNavItem = {
  label: string;
  icon: LucideIcon;
  isActive?: boolean;
  className?: string;
  iconClassName?: string;
};

export const sidebarNavItems: SidebarNavItem[] = [
  { label: "Home", icon: Home },
  {
    label: "New Chat",
    icon: MessageSquarePlus,
    className: "border border-sidebar-border bg-sidebar-accent font-medium",
    iconClassName: "text-accent",
  },
  { label: "Goals", icon: Target },
  { label: "Activity", icon: Activity },
  { label: "Connections", icon: Link2 },
  { label: "Memory", icon: MemoryStick },
  { label: "Approvals", icon: CheckCircle2 },
  { label: "Settings", icon: Settings },
];
