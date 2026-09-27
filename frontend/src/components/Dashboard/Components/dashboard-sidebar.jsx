"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Inbox, Menu, X, LogOut, Settings, User } from "lucide-react";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export function DashboardSidebar({ unreadCount = 0 }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md text-gray-700"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile sidebar overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-navy-900 bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar for mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-smsorange-500 flex items-center justify-center">
              <span className="text-white font-bold">SMS</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">SMS</h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </motion.div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 p-2 bg-smsorange-50 text-smsorange-600 rounded-md">
            <Inbox size={18} />
            <span>Contact Messages</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-[#FF8A00] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex flex-col gap-2">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <User size={18} />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar for desktop */}
      <div className="w-64 bg-white shadow-sm hidden md:block h-screen">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-[#FF8A00] flex items-center justify-center">
              <span className="text-white font-bold">ST</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">SMS</h2>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center space-x-2 p-2 bg-[#FF8A00]/10 text-[#FF8A00] rounded-md">
            <Inbox size={18} />
            <span className="font-medium">Inbox</span>
            {unreadCount > 0 && (
              <span className="ml-auto bg-[#FF8A00] text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                {unreadCount}
              </span>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-64 p-4 border-t">
          <div className="flex flex-col gap-2">
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <User size={18} />
              <span>Profile</span>
            </button>
            <button className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700">
              <Settings size={18} />
              <span>Settings</span>
            </button>
            <button
              className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md text-gray-700"
              onClick={handleLogout}
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
