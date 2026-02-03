// src/components/ui/TopBar.jsx
import React, { useState, useEffect, useRef } from "react";
import {
  Instagram,
  Ticket,
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
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const TopBar = ({ username = "Vincent" }) => {
  const location = useLocation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLogin, setDropdownOpenLogin] = useState(false);
  const createRef = useRef(null);
  const loginRef = useRef(null);

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

  return (
    <div className="flex items-center justify-between bg-white border-b px-6 h-16">
      {/* Left Side */}
      <div className="flex items-center space-x-4">
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-pink-500 transition-colors"
        >
          <Instagram size={16} />
        </a>
        <a
          href="https://www.tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-black transition-colors"
        >
          <Ticket size={16} />
        </a>

        {/* Create Dropdown */}
        <div className="relative" ref={createRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors bg-gray-100 px-3 py-1 rounded-md"
          >
            <PlusCircle size={16} />
            <span>Create</span>
            <ChevronDown size={16} />
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 w-64 bg-white border rounded-lg shadow-lg z-50 divide-y">
              {/* Category 1: Class / Meeting */}
              <div className="p-2 rounded-t-lg">
                <p className="text-xs font-semibold text-orange-600 mb-1">
                  Class / Meeting
                </p>
                <Link
                  to="/classes/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-orange-100 rounded"
                >
                  <BookOpen size={16} /> Class
                </Link>
                <Link
                  to="/meetings/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-orange-100 rounded"
                >
                  <Calendar size={16} /> Meeting
                </Link>
              </div>

              {/* Category 2: Mentor / Mentee */}
              <div className="p-2">
                <p className="text-xs font-semibold text-green-600 mb-1">
                  Mentor / Mentee
                </p>
                <Link
                  to="/mentors/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-green-100 rounded"
                >
                  <UserPlus size={16} /> Mentor
                </Link>
                <Link
                  to="/mentees/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-green-100 rounded"
                >
                  <UserPlus size={16} /> Mentee
                </Link>
              </div>

              {/* Category 3: Task / Note / Material */}
              <div className="p-2 rounded-b-lg">
                <p className="text-xs font-semibold text-blue-600 mb-1">
                  Task / Note / Material
                </p>
                <Link
                  to="/tasks/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                >
                  <CheckSquare size={16} /> Task
                </Link>
                <Link
                  to="/notes/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                >
                  <FileText size={16} /> Note
                </Link>
                <Link
                  to="/materials/create"
                  className="flex items-center gap-2 px-3 py-1 hover:bg-blue-100 rounded"
                >
                  <Archive size={16} /> Material
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Login Dropdown */}
      <div className="relative" ref={loginRef}>
        <button
          onClick={() => setDropdownOpenLogin(!dropdownOpenLogin)}
          className="flex items-center space-x-2 text-gray-700 hover:text-orange-600 transition-colors"
        >
          <User size={20} />
          <span className="font-medium">{username ?? "User"}</span>
          <ChevronDown size={16} />
        </button>

        {dropdownOpenLogin && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">
            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              <User size={16} className="mr-2" /> Account
            </button>
            <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors">
              <LogOut size={16} className="mr-2" /> Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopBar;
