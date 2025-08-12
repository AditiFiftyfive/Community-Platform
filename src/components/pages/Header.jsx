import { Link, useLocation  } from "react-router-dom";
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import SignIn from './SignIn';

const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const navItems = [
      // { label: 'Features', id: 'features', path: '/features' },
      { label: 'Discover', id: 'discover', path: '/discover' },
      { label: 'Events', id: 'events', path: '/events' },
      { label: 'About us', id: 'about-us', path: '/about' }
  ];

  return (
    <header className="fixed top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-50 w-[98%] sm:w-[95%] md:w-[90%] bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-300">
      <div className="relative h-16 sm:h-20 flex items-center justify-center px-3 sm:px-6">

        {/* Absolute Left: Logo */}
        <div className="absolute left-3 sm:left-6 text-lg sm:text-xl md:text-2xl font-bold text-[#1A103D]">
          ThriveCircle
        </div>

        {/* Center: Navigation - Hidden on mobile */}
        <nav className="hidden lg:flex space-x-6 xl:space-x-10 text-center absolute left-1/2 transform -translate-x-[80%]">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              to={item.path}
                className={`px-2 font-medium transition-colors text-sm xl:text-base ${
                location.pathname === item.path
                  ? 'text-black font-bold'
                  : 'text-gray-700 hover:text-gray-900'
              }`}
              onMouseEnter={() => setActiveMenu(item.id)}
              onMouseLeave={() => setActiveMenu(null)}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/*  Search + Sign In */}
        <div className="absolute right-3 sm:right-6 flex items-center gap-2 sm:gap-4 md:gap-6">
          {/* Search - Responsive width */}
          <div className="flex items-center bg-black px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 rounded-md sm:rounded-lg w-32 sm:w-48 md:w-64 lg:w-80 xl:w-[400px]">
            <Search size={14} className="text-white mr-1 sm:mr-2 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <input
              type="text"
              placeholder="Search for your own ThriveCircle"
              className="bg-transparent focus:outline-none w-full text-white font-medium text-xs sm:text-sm placeholder:text-xs sm:placeholder:text-sm"
            />
          </div>
          <div className="hidden sm:block">
            <SignIn />
          </div>
        </div>
      </div>
    </header>

  );
};

export default Header;