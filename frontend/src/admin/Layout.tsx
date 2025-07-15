import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet, Link } from "react-router-dom";
import { AppSidebar } from "./app-sidebar";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <SidebarTrigger />
        <Outlet />
      </main>
    </SidebarProvider>
  );
}