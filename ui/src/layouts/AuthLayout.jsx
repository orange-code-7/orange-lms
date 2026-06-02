import React from "react";
import { Outlet } from "react-router-dom";

import logo from "@/assets/ORANGECODE LOGO-FULL COLOUR LANDSCAPE.jpg";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logo} alt="Orange Kode" className="w-72 object-contain" />
        </div>

        {/* Auth Content */}
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl shadow-lg p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
