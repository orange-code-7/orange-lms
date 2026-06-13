import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { MENU_BY_ROLE } from "@/constants/menu";

import AppLogo from "./AppLogo";

const Sidebar = () => {
  const location = useLocation();

  const role = useSelector((state) => state.auth.user?.role);

  const sections = MENU_BY_ROLE[role] || [];

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`);

  const navClass = (active) =>
    `group mr-2 flex items-center rounded-sm px-4 py-3 transition-all duration-200 ${
      active
        ? "bg-[var(--color-primary)] text-white shadow-sm"
        : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
    }`;

  return (
    <>
      <div className="flex items-center justify-center border-b border-gray-200 px-4">
        <AppLogo />
      </div>

      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto px-3 py-4">
          {sections.map((section) => (
            <div key={section.title} className="mb-6">
              <p className="mb-2 px-2 text-xs font-semibold uppercase tracking-widest text-gray-400">
                {section.title}
              </p>

              <div className="space-y-1">
                {section.items.map((item) => {
                  const active = isActive(item.path);

                  const Icon = item.icon;

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={navClass(active)}
                    >
                      <Icon
                        size={18}
                        className={
                          !active
                            ? "shrink-0 group-hover:text-white"
                            : "shrink-0"
                        }
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
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
