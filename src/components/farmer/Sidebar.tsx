"use client";

import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { Home, User, Settings, FlaskRound as Flask, Newspaper, HelpCircle, Shield, FileQuestion, LogOut, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import navigationContext from "@/context/navigationContext";
import UserContext from "@/context/userContext";
import { logo, logo_small } from "@/config/ImagesUrl";

const navigationItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'account', label: 'Account', icon: User },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'test', label: 'Soil Analysis', icon: Flask },
  { id: 'news', label: 'News Feed', icon: Newspaper },
  { id: 'support', label: 'Help and Support', icon: HelpCircle },
  { id: 'privacy', label: 'Privacy Policy', icon: Shield },
  { id: 'help', label: 'FAQs', icon: FileQuestion }
];

const Sidebar = () => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const navContext = useContext(navigationContext);
  if (!navContext) {
    console.error("Navigation context is not provided");
    return <div>Error: Navigation context is not provided.</div>;
  }

  const { active, setActive, setPrevActive, sidebarOpen, setSidebarOpen } = navContext;

  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext must be used within a RegisterationProvider");
  }

  const { logout } = userContext;

  useEffect(() => {
    setActive("home");
  }, []);

  const handleNavigation = (itemId: string) => {
    if (setPrevActive) setPrevActive(active);
    setActive(itemId);
    setShowMobileSidebar(false);
  };

  const NavItem = ({ item, isDesktop = true }: { item: typeof navigationItems[0], isDesktop?: boolean }) => {
    const isActive = active === item.id;
    const Icon = item.icon;

    return (
      <button
        onClick={() => handleNavigation(item.id)}
        className={`
          group flex items-center w-full gap-3 px-3 py-2 rounded-lg transition-colors
          ${isActive
            ? 'bg-green-100 text-green-700'
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }
          ${!isDesktop && 'justify-between'}
        `}
      >
        <div className="flex items-center gap-3">
          <Icon
            className={`w-5 h-5 ${isActive ? 'text-green-700' : 'text-gray-500 group-hover:text-gray-700'}`}
          />
          {(sidebarOpen || !isDesktop) && (
            <span className="text-sm font-medium">{item.label}</span>
          )}
        </div>
        {!isDesktop && <ChevronRight className="w-4 h-4 text-gray-400" />}
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className={`
        hidden lg:flex flex-col h-screen border-r border-gray-200 bg-white
        ${sidebarOpen ? 'w-64' : 'w-20'}
        transition-all duration-300
      `}>
        <div className="p-4 flex items-center justify-between border-b border-gray-200">
          <Image
            src={sidebarOpen ? logo : logo_small}
            alt="Krushi Saathi Logo"
            width={sidebarOpen ? 150 : 40}
            height={sidebarOpen ? 150 : 40}
            className="transition-all duration-300"
          />
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronRight className="w-5 h-5 text-gray-500" />
            )}
          </button>
        </div>

        <div className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navigationItems.map(item => (
            <NavItem key={item.id} item={item} />
          ))}
        </div>

        <div className="p-3 border-t border-gray-200">
          <button
            onClick={() => logout()}
            className="flex items-center w-full gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="lg:hidden">
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 bg-white">
          <button
            onClick={() => setShowMobileSidebar(true)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6 text-gray-600" />
          </button>

          <Image
            src={logo_small}
            alt="Krushi Saathi Logo"
            width={40}
            height={40}
          />
        </div>

        {/* Mobile Sidebar */}
        {showMobileSidebar && (
          <>
            <div
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowMobileSidebar(false)}
            />
            <div className="fixed inset-y-0 left-0 w-64 bg-white z-50 shadow-xl">
              <div className="p-4 flex items-center justify-between border-b border-gray-200">
                <Image
                  src={logo}
                  alt="Krushi Saathi Logo"
                  width={150}
                  height={150}
                />
                <button
                  onClick={() => setShowMobileSidebar(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-4 space-y-1">
                {navigationItems.map(item => (
                  <NavItem key={item.id} item={item} isDesktop={false} />
                ))}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    logout();
                    setShowMobileSidebar(false);
                  }}
                  className="flex items-center justify-between w-full px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <LogOut className="w-5 h-5" />
                    <span className="text-sm font-medium">Logout</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Sidebar;