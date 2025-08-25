import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import { Search, ChevronDown, Ticket, User, Grid } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();
  const { isSignedIn, user } = useUser();

  const navItems = [
    { label: "Discover", id: "discover", path: "/discover" },
    { label: "Events", id: "events", path: "/events" },
    { label: "About us", id: "about-us", path: "/about" },
  ];

  const menuItems = [
    { to: "/tickets", icon: Ticket, label: "My Tickets" },
    { to: "/profile", icon: User, label: "My Profile" },
    { to: "/dashboard", icon: Grid, label: "Dashboard" },
    { to: "/community", label: "Claim your Community" },
  ];

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[95%] md:w-[90%] bg-gradient-to-br from-[rgb(240,236,231)] to-white rounded-xl sm:rounded-2xl shadow-md border border-gray-300">
      <div className="relative h-16 sm:h-20 flex items-center justify-center px-3 sm:px-6">
        
        <Link to="/" className="absolute left-3 sm:left-6 text-lg sm:text-xl md:text-2xl font-bold text-[#1A103D]">
          ThriveCircle
        </Link>

        <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-center absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item) => (
            <Link key={item.id} to={item.path}
              className={`px-2 font-medium transition-colors text-sm xl:text-base ${location.pathname === item.path ? "text-black font-bold" : "text-gray-700 hover:text-gray-900"}`}
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}>
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="absolute right-3 sm:right-6 flex items-center gap-2 sm:gap-4 md:gap-6">
          <div className="flex items-center bg-black px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg w-28 sm:w-40 md:w-56 lg:w-60 xl:w-[280px]">
            <Search size={14} className="text-white mr-1 sm:mr-2 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <input type="text" placeholder="Search for your own ThriveCircle"
              className="bg-transparent focus:outline-none w-full text-white font-medium text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm" />
          </div>

          <div className="hidden sm:block">
            {!isSignedIn ? (
              <Link to="/signin" className="p-2 hover:bg-gray-100 rounded-lg transition-colors" title="Sign In">
                <User size={24} className="text-gray-700 hover:text-black" />
              </Link>
            ) : (
              <Menu as="div" className="relative inline-block text-left">
                {({ open }) => (
                  <>
                    <MenuButton className="flex items-center gap-2 px-3 py-1.5 transition-colors duration-200 focus:outline-none">
                      <div className="w-8 h-8 rounded-full bg-[#1A103D] flex items-center justify-center text-white font-bold text-sm">
                        {user?.firstName?.[0] || user?.username?.[0] || "U"}
                      </div>
                      <ChevronDown size={16} className="text-gray-600" />
                    </MenuButton>

                    <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-lg ring-1 ring-black/5 focus:outline-none p-2">
                      {menuItems.map((item, index) => (
                        <MenuItem key={index}>
                          <Link to={item.to} className="data-[active]:bg-gray-100 flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors duration-150 text-left">
                            {item.icon && <item.icon size={16} />} {item.label}
                          </Link>
                        </MenuItem>
                      ))}
                      
                      <div className="border-t my-2"></div>
                      
                      <MenuItem>
                        <SignOutButton>
                          <button className="data-[active]:bg-gray-100 flex w-full items-center gap-2 px-3 py-2 rounded-md text-sm text-red-500 transition-colors duration-150">
                            → Log Out
                          </button>
                        </SignOutButton>
                      </MenuItem>
                    </MenuItems>
                  </>
                )}
              </Menu>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;