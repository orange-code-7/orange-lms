import React from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/TopBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen bg-app text-app transition-all">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* TopBar */}
        <TopBar username="Vincent" />

        {/* Main Content */}
        <main className="flex-1 bg-app p-6 overflow-auto transition-all">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
