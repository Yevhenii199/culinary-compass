import { Outlet } from "react-router-dom";
import AppHeader from "@/components/global/AppHeader";
import AppFooter from "@/components/global/AppFooter";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <AppFooter />
    </div>
  );
}
