import React, { useState } from 'react';
import { ChevronRight, Search, Users, Calendar, DollarSign, MessageSquare, BarChart3, Smartphone, ArrowRight } from 'lucide-react';
import SignIn from './SignIn';
import { PhoneMockup, TicketCard, ProfileCard, SocialProofBanner } from './PhoneMockUp';
import Footer from './Footer';
import ThriveHeroSlider from './ThriveHeroSlider';  
import { Link, useLocation  } from "react-router-dom";


// Header Component
export const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const navItems = [
      { label: 'Features', id: 'features', path: '/features' },
      { label: 'Discover', id: 'discover', path: '/discover' },
      { label: 'Events', id: 'events', path: '/events' },
      { label: 'About us', id: 'about-us', path: '/about' }
  ];

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[95%] md:w-[90%] bg-white rounded-2xl shadow-md border border-gray-300">
      <div className="relative h-20 flex items-center justify-center px-6">

        {/* Absolute Left: Logo */}
        <div className="absolute left-6 text-2xl font-bold text-[#1A103D]">
          ThriveCircle
        </div>

        {/* Center: Navigation */}
        <nav className="hidden md:flex space-x-10 text-center absolute left-1/2 transform -translate-x-[80%]">
          {navItems.map((item) => (
            <Link 
              key={item.id}
              to={item.path}
                className={`px-2 font-medium transition-colors ${
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
        <div className="absolute right-6 flex items-center gap-6">
          <div className="flex items-center bg-black px-4 py-2.5 rounded-lg w-[400px]">
            <Search size={18} className="text-white mr-2" />
            <input
              type="text"
              placeholder="Search for your own ThriveCircle"
              className="bg-transparent focus:outline-none w-full text-white font-medium"
            />
          </div>
          <SignIn />
        </div>
      </div>
    </header>

  );
};

// Hero Section
const HeroSection = () => {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex justify-center justify-start">
              <SocialProofBanner />
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Your community needs a{' '}
                <span className="italic font-bold">home</span>,{' '}
                create one for{' '}
                <span className="italic font-bold">free</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Thrive helps you manage, monetise and grow your offline community.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-8 py-4 rounded-full font-medium transition-all flex items-center space-x-3 group shadow-md">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ArrowRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>Create your ThriveCircle</span>
              </button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end">
            <PhoneMockup />
            <TicketCard />
            <ProfileCard />
          </div>
        </div>
      </div>
    </section>
  );
};

// Features Preview Section (for scroll content)
const FeaturesPreview = () => {
  const features = [
    {
      icon: <Calendar className="w-6 h-6" />,
      title: 'Event Management',
      description: 'Create and manage events with smart check-ins and dynamic pricing'
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Community Building', 
      description: 'Build engaged communities with powerful member management tools'
    },
    {
      icon: <DollarSign className="w-6 h-6" />,
      title: 'Monetization',
      description: 'Generate revenue through tickets, subscriptions, and merchandise'
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'WhatsApp Integration',
      description: 'Seamlessly manage large WhatsApp groups and communications'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to grow your community
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful tools to help you manage, engage, and monetize your community effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-4 text-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main App Component
const ThriveLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Scrollable content */}
      <div className="overflow-y-auto">
        <HeroSection />
        <ThriveHeroSlider />
        <FeaturesPreview />
        <Footer />
      </div>
    </div>
  );
};

export default ThriveLandingPage;