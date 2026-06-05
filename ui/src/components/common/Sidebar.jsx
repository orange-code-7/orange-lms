import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import logo from "@/assets/ORANGECODE LOGO-FULL COLOUR LANDSCAPE.jpg";

import { MENU_BY_ROLE } from "@/constants/menu";

const Sidebar = () => {
  const location = useLocation();

  const user = useSelector((state) => state.auth.user);

  const role = user?.role;

  const sections = MENU_BY_ROLE[role] || [];

  const navClass = (active) =>
    `group flex items-center rounded-sm px-4 py-3 mr-2 transition-all duration-200 ${
      active
        ? "bg-[var(--color-primary)] text-white shadow-sm"
        : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
    }`;

  const renderItem = (item) => {
    const active =
      location.pathname === item.path ||
      location.pathname.startsWith(`${item.path}/`);

    const Icon = item.icon;

    return (
      <Link key={item.name} to={item.path} className={navClass(active)}>
        <Icon
          size={18}
          className={`shrink-0 ${!active ? "group-hover:text-white" : ""}`}
        />

        <span
          className={`ml-3 text-sm font-medium ${
            !active ? "group-hover:text-white" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Logo */}
      <div className="flex h-20 items-center justify-center border-b border-gray-200 px-4">
        <img src={logo} alt="Orange LMS" className="w-24 object-contain" />
      </div>

      {/* Menu */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {section.title}
              </p>

              <div className="space-y-1">{section.items.map(renderItem)}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
