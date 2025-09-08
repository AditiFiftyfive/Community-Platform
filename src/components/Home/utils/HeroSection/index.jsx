import { Link } from "react-router-dom";
import { PhoneMockUp, TicketCard, ProfileCard, SocialProofBanner } from '../PhoneMockUp';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="pt-20 sm:pt-24 md:pt-28 pb-8 sm:pb-12 md:pb-16 bg-gradient-to-br from-[rgb(240,236,231)] to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center">
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
              <Link
                to="/create-thrivecircle"
                className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium transition-all flex items-center space-x-2 sm:space-x-3 group shadow-md text-sm sm:text-base"
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center shadow-sm">
                  <ArrowRight size={16} className="sm:w-5 sm:h-5 group-hover:translate-x-0.5 transition-transform" />
                </div>
                <span>Create your ThriveCircle</span>
              </Link>
            </div>
          </div>

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

export default HeroSection;
 