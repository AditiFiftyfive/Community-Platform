import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";
import showTabContent from "./showTabContent";

const CommunityDashboard = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { formData } = location.state || {};
  const [activeTab, setActiveTab] = useState("overview");

  // Show error message if no community data
  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg">
          <p className="text-purple-400 text-lg">
            No community data found. Please create one first.
          </p>
        </div>
      </div>
    );
  }

  const tabs = ["overview", "members", "events", "posts"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navbar />

      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Cover Image */}
          <div className="relative h-64 sm:h-80 rounded-2xl shadow-lg mb-8 overflow-hidden">
            {formData.coverImage ? (
              <img
                src={URL.createObjectURL(formData.coverImage)}
                alt="Cover"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gradient-to-br from-purple-100 to-pink-100">
                <div className="text-center text-purple-400">
                  <div className="text-4xl mb-2">🖼️</div>
                  <p>Cover image coming soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Section */}
          <div className="px-4 sm:px-6 -mt-16 relative space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6">
              <div>
                {formData.profileImage ? (
                  <img
                    src={URL.createObjectURL(formData.profileImage)}
                    alt="Profile"
                    className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-lg"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-200 to-pink-200 border-4 border-white shadow-lg flex items-center justify-center">
                    <span className="text-purple-500 text-3xl">🏘️</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                  {formData.communityName}
                </h1>
                <p className="text-slate-600 text-lg">{formData.description}</p>
              </div>
            </div>

            {/* Categories */}
            {formData.categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.categories.map((category, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-blue-100 rounded-full text-slate-700 border border-blue-200"
                  >
                    #{category}
                  </span>
                ))}
              </div>
            )}

            {/* Community Page Link */}
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="text-2xl">🔗</div>
                <div>
                  <p className="text-sm font-medium text-slate-600">Public Page</p>
                  <a
                    href={`/community/${slug}`}
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Visit community page →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs and Buttons */}
          <div className="mt-12 px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between sm:items-center">
              {/* Tabs */}
              <div className="flex-1 bg-white rounded-xl shadow-md overflow-hidden">
                <nav className="flex">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 px-4 py-3 font-medium text-center transition-colors ${
                        activeTab === tab
                          ? "text-purple-700 bg-purple-50 border-b-2 border-purple-400"
                          : "text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 sm:ml-6">
                <button className="px-4 py-3 bg-[#1A103D] text-white rounded-xl font-medium hover:bg-black transition-colors">
                  + Create Post
                </button>
                <button className="px-4 py-3 bg-orange-300 text-slate-800 rounded-xl font-medium hover:bg-orange-400 transition-colors">
                  + Submit Event
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mt-8 px-4 sm:px-6 mb-12">
            <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
              {showTabContent(activeTab, formData)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
