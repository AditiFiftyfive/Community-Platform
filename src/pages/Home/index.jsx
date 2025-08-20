import {  Users, Calendar, DollarSign, MessageSquare, ArrowRight } from 'lucide-react';
import { PhoneMockUp, TicketCard, ProfileCard, SocialProofBanner } from '../../components/PhoneMockUp';
import Footer from '../../components/Footer';
import HeroSlider from "../../components/HeroSlider";
import Navbar from "../Navbar/Index.jsx";



// Hero Section
const HeroSection = () => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex justify-center lg:justify-start">
              <SocialProofBanner />
            </div>
            
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight text-center lg:text-left">
                Your community needs a{' '}
                <span className="italic font-bold">home</span>,{' '}
                create one for{' '}
                <span className="italic font-bold">free</span>
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
                Thrive helps you manage, monetise and grow your offline community.
              </p>
            </div>

            <div className="flex justify-center lg:justify-start">
              <button className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all flex items-center space-x-2 sm:space-x-3 group shadow-md text-sm sm:text-base">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>Create your ThriveCircle</span>
              </button>
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
            <PhoneMockUp />
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
      icon: <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Event Management',
      description: 'Create and manage events with smart check-ins and dynamic pricing'
    },
    {
      icon: <Users className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Community Building', 
      description: 'Build engaged communities with powerful member management tools'
    },
    {
      icon: <DollarSign className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'Monetization',
      description: 'Generate revenue through tickets, subscriptions, and merchandise'
    },
    {
      icon: <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />,
      title: 'WhatsApp Integration',
      description: 'Seamlessly manage large WhatsApp groups and communications'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Everything you need to grow your community
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            Powerful tools to help you manage, engage, and monetize your community effectively
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl hover:bg-gray-50 transition-colors">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3 sm:mb-4 text-gray-700">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed px-2">
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
const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="overflow-y-auto">
        <HeroSection />
        <HeroSlider />
        <FeaturesPreview />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
