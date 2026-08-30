import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MobileNav from "./MobileNav";
import PageTransition from "./PageTransition";

export default function AppShell() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <div className="flex-1 min-w-0 flex flex-col">
        <Header />
        <main className="flex-1 px-5 md:px-8 py-6 pb-24 md:pb-10 max-w-6xl w-full mx-auto">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
      <MobileNav />
    </div>
  );
}
