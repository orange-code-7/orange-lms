import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  Calendar,
  FileText,
  CheckSquare,
  Archive,
  User,
  Users,
  Settings,
  UserCircle,
} from "lucide-react";

import logo from "../../assets/ORANGECODE LOGO-FULL COLOUR LANDSCAPE.jpg";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Classes", icon: BookOpen, path: "/classes" },
    { name: "Meetings", icon: Calendar, path: "/meetings" },
    { name: "Notes", icon: FileText, path: "/notes" },
    { name: "Tasks", icon: CheckSquare, path: "/tasks" },
    { name: "Materials", icon: Archive, path: "/materials" },
    { name: "Mentors", icon: User, path: "/mentors" },
    { name: "Mentees", icon: Users, path: "/mentees" },
  ];

  const bottomItems = [
    { name: "Settings", icon: Settings, path: "/setting" },
    { name: "Profile", icon: UserCircle, path: "/profile" },
  ];

  const navClass = (isActive) =>
    `group flex items-center w-full px-5 py-3 rounded-md transition-all duration-200 ${
      isActive
        ? "bg-[var(--color-primary)] text-white shadow-sm"
        : "text-[var(--color-text)] hover:bg-[var(--color-primary)] hover:text-white"
    }`;

  const renderItem = (item) => {
    const isActive = location.pathname === item.path;
    const Icon = item.icon;

    return (
      <Link key={item.name} to={item.path} className={navClass(isActive)}>
        <Icon size={20} className={!isActive ? "group-hover:text-white" : ""} />

        <span
          className={`ml-4 font-medium ${
            !isActive ? "group-hover:text-white" : ""
          }`}
        >
          {item.name}
        </span>
      </Link>
    );
  };

  return (
    <aside className="flex flex-col h-screen w-64 px-3 bg-[var(--color-surface)] border-r border-gray-300 shadow-sm">
      {/* Logo */}
      <div className="flex items-center justify-center h-20 border-b border-gray-300">
        <img src={logo} alt="Orange LMS" className="w-40 object-contain" />
      </div>

      {/* Main Menu */}
      <nav className="flex-1 mt-6 space-y-2">{menuItems.map(renderItem)}</nav>

      {/* Bottom Menu */}
      <div className="mb-5 pt-4 border-t border-gray-300 space-y-2">
        {bottomItems.map(renderItem)}
      </div>
    </aside>
  );
};

export default Sidebar;
