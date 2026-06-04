import React, { useState, useEffect, useRef } from "react";
import {
  Sun,
  Moon,
  ChevronDown,
  LogOut,
  User,
  PlusCircle,
  BookOpen,
  Calendar,
  CheckSquare,
  FileText,
  Archive,
  UserPlus,
  Settings,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { useThemeStore } from "@/features/theme/theme.store";
import { logout } from "@/app/store/slices/authSlice";

import { can } from "@/helpers/can";

const TopBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const role = user?.role;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);

  const createRef = useRef(null);
  const loginRef = useRef(null);

  const { theme, toggleTheme } = useThemeStore();

  const roleStyles = {
    Owner:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300",

    Admin:
      "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300",

    Mentor: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",

    Mentee:
      "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (createRef.current && !createRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setDropdownOpenLogin(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/auth/login");
  };

  const hasCreateAccess =
    can(role, "class", "create") ||
    can(role, "meeting", "create") ||
    can(role, "mentor", "create") ||
    can(role, "mentee", "create") ||
    can(role, "task", "create") ||
    can(role, "note", "create") ||
    can(role, "material", "create");

  return (
    <div className="flex items-center justify-between bg-[var(--color-surface)] border-b border-[var(--color-border)] px-6 h-16 transition-colors">
      {/* Left Side */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="flex items-center justify-center w-10 h-10 rounded-xl bg-orange-50 dark:bg-neutral-800 border border-orange-100 dark:border-neutral-700 text-orange-600 dark:text-orange-400 hover:scale-105 transition-all"
        >
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* Create Dropdown */}
        {hasCreateAccess && (
          <div className="relative" ref={createRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-[var(--color-surface-muted)] hover:bg-orange-50 dark:hover:bg-neutral-800 transition-all"
            >
              <PlusCircle size={16} />
              <span className="font-medium">Create</span>
              <ChevronDown size={16} />
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-64 bg-white border rounded-md border-gray-300 shadow-lg z-50 divide-y divide-gray-200">
                {/* Category 1: Class / Meeting */}
                {(can(role, "class", "create") ||
                  can(role, "meeting", "create")) && (
                  <div className="p-2 rounded-t-lg">
                    <p className="text-xs font-semibold text-orange-600 mb-1">
                      Class / Meeting
                    </p>

                    {can(role, "class", "create") && (
                      <Link
                        to="/classes/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-orange-100 rounded"
                      >
                        <BookOpen size={16} />
                        Class
                      </Link>
                    )}

                    {can(role, "meeting", "create") && (
                      <Link
                        to="/meetings/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-orange-100 rounded"
                      >
                        <Calendar size={16} />
                        Meeting
                      </Link>
                    )}
                  </div>
                )}

                {/* Category 2: Mentor / Mentee */}
                {(can(role, "mentor", "create") ||
                  can(role, "mentee", "create")) && (
                  <div className="p-2">
                    <p className="text-xs font-semibold text-green-600 mb-1">
                      Mentor / Mentee
                    </p>

                    {can(role, "mentor", "create") && (
                      <Link
                        to="/mentors/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-green-100 rounded"
                      >
                        <UserPlus size={16} />
                        Mentor
                      </Link>
                    )}

                    {can(role, "mentee", "create") && (
                      <Link
                        to="/mentees/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-green-100 rounded"
                      >
                        <UserPlus size={16} />
                        Mentee
                      </Link>
                    )}
                  </div>
                )}

                {/* Category 3: Task / Note / Material */}
                {(can(role, "task", "create") ||
                  can(role, "note", "create") ||
                  can(role, "material", "create")) && (
                  <div className="p-2 rounded-b-lg">
                    <p className="text-xs font-semibold text-blue-600 mb-1">
                      Task / Note / Material
                    </p>

                    {can(role, "task", "create") && (
                      <Link
                        to="/tasks/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                      >
                        <CheckSquare size={16} />
                        Task
                      </Link>
                    )}

                    {can(role, "note", "create") && (
                      <Link
                        to="/notes/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                      >
                        <FileText size={16} />
                        Note
                      </Link>
                    )}

                    {can(role, "material", "create") && (
                      <Link
                        to="/materials/create"
                        className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                      >
                        <Archive size={16} />
                        Material
                      </Link>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Right Side */}
      <div className="relative" ref={loginRef}>
        <div className="flex items-center gap-3">
          <span
            className={`rounded-sm px-3 py-1 text-xs font-semibold ${
              roleStyles[user?.role] || "bg-gray-100 text-gray-700"
            }`}
          >
            {user?.role || "Guest"}
          </span>

          <button
            onClick={() => setDropdownOpenLogin(!dropdownOpenLogin)}
            className="flex items-center gap-2 rounded-sm px-3 py-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
          >
            <User size={18} />

            <span className="font-medium">{user?.name || "Guest"}</span>

            <ChevronDown size={16} />
          </button>
        </div>

        {dropdownOpenLogin && (
          <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-sm border border-[var(--color-border)] bg-[var(--color-surface)] shadow-lg">
            <button
              onClick={() => navigate("/profile")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-50 dark:hover:bg-neutral-800"
            >
              <User size={16} />
              Profile
            </button>

            <div className="border-t border-gray-200" />

            <button
              onClick={() => navigate("/settings")}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm transition hover:bg-gray-50 dark:hover:bg-neutral-800"
            >
              <Settings size={16} />
              Settings
            </button>

            <div className="border-t border-gray-200" />

            <button
              onClick={handleLogout}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/20"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
