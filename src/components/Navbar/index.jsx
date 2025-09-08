import { Link, useLocation } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Ticket, User, Grid } from "lucide-react";
import { useUser, SignOutButton } from "@clerk/clerk-react";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { isSignedIn, user } = useUser();
  const dropdownRef = useRef(null);

  const navItems = [
    { label: "Discover", path: "/discover" },
    { label: "Events", path: "/events" },
    { label: "About us", path: "/about" },
  ];

  const menuItems = [
  { to: "/tickets", icon: Ticket, label: "My Tickets" },
  { to: "/profile", icon: User, label: "My Profile" },
  { to: "/dashboard", icon: Grid, label: "Dashboard" },
  { to: "/community", label: "My Community" },
];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[95%] md:w-[90%] bg-gradient-to-br from-[rgb(240,236,231)] to-white rounded-xl sm:rounded-2xl shadow-md border border-gray-300">
      <div className="relative h-16 sm:h-20 flex items-center justify-center px-3 sm:px-3">
        
        <Link to="/" className="absolute left-3 sm:left-6 text-lg sm:text-xl md:text-2xl font-bold text-[#1A103D]">
          ThriveCircle
        </Link>

        <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-center absolute left-1/2 transform -translate-x-1/2">
          {navItems.map((item, i) => (
            <Link key={i} to={item.path}
              className={`px-2 font-medium transition-colors text-sm xl:text-base ${
                location.pathname === item.path ? "text-black font-bold" : "text-gray-700 hover:text-gray-900"
              }`}>
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
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 transition-colors duration-200 focus:outline-none hover:bg-gray-100 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-[#1A103D] flex items-center justify-center text-white font-bold text-sm">
                    {user?.firstName?.[0] || user?.username?.[0] || "U"}
                  </div>
                  <ChevronDown size={16} className={`text-gray-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-0' : 'rotate-180'}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white shadow-lg ring-1 ring-black/5 p-2 z-[9999]">
                    {menuItems.map((item, i) => (
                      <Link key={i} to={item.to} onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-gray-100 transition-colors">
                        {item.icon && <item.icon size={16} />} {item.label}
                      </Link>
                    ))}
                    <div className="border-t my-2"></div>
                    <SignOutButton>
                      <button onClick={() => setIsDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-red-500 hover:bg-gray-100 transition-colors w-full text-left">
                        → Log Out
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;