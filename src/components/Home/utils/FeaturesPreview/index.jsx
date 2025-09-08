import {  Users, Calendar, DollarSign, MessageSquare } from 'lucide-react';

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
    <section className="py-12 sm:py-16 bg-gradient-to-br from-[rgb(240,236,231)] to-white">
      <div className="max-w-full mx-auto px-4 sm:px-6">
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

export default FeaturesPreview;