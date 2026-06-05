import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-app text-app transition-all">
      {/* Sidebar */}
      <aside className="h-screen w-[18%] border-r border-gray-200 bg-[var(--color-surface)] shadow-sm">
        <Sidebar />
      </aside>

      {/* Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* TopBar */}
        <TopBar />

        {/* Content */}
        <main className="flex-1 overflow-auto bg-app p-3 transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
