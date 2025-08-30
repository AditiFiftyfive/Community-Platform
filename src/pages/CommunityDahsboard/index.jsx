// pages/CommunityDashboard.jsx
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Navbar from "../../components/Navbar";

const CommunityDashboard = () => {
  const { slug } = useParams();
  const location = useLocation();
  const { formData } = location.state || {};
  const [activeTab, setActiveTab] = useState("overview");

  if (!formData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">
          No community data found. Please create one first.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(240,236,231)] to-white">
      {/* Navbar */}
      <Navbar />

      <div className="pt-24 max-w-6xl mx-auto px-4">
        {/* Cover Image */}
        <div className="relative h-80 rounded-2xl shadow-2xl mb-8">
          {formData.coverImage ? (
            <img
              src={URL.createObjectURL(formData.coverImage)}
              alt="Cover"
              className="w-full h-full object-cover rounded-2xl"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-500">
              No Cover Image
            </div>
          )}
        </div>

        {/* Profile + Community Info */}
                <div className="px-8 -mt-16 space-y-6">
                {/* Profile Image */}
                <div className="relative">
                    {formData.profileImage ? (
                    <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="Profile"
                        className="w-32 h-32 object-cover rounded-2xl border-4 border-white shadow-xl"
                    />
                    ) : (
                    <div className="w-32 h-32 rounded-2xl bg-gray-300 border-4 border-white shadow-lg flex items-center justify-center text-gray-600">
                        No Image
                    </div>
                    )}
                </div>

                {/* Community Info */}
                <div>
                    <h1 className="text-6xl font-bold text-gray-900">
                    {formData.communityName}
                    </h1>
                    <p className="text-gray-600 mt-2 py-4 text-xl">{formData.description}</p>

                    {/* Page Link */}
                    <div className="mt-4">
                    <a
                        href={`/community/${slug}`}
                        className="text-blue-600 hover:underline"
                    >
                        Visit community page
                    </a>
                    </div>
                </div>

                {/* Categories */}
            {formData.categories?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {formData.categories.map((cat, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 text-sm bg-gray-200 rounded-full text-gray-700"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            )}
                </div>

            

        {/* Tabs Navigation */}
        <div className="mt-10 border-b border-gray-200">
          <nav className="flex gap-6 text-gray-600 font-medium">
            {["overview", "members", "events", "posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 ${
                  activeTab === tab
                    ? "text-black border-b-2 border-black"
                    : "hover:text-black"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-8">
          {activeTab === "overview" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                About this Community
              </h2>
              <p className="text-gray-700">{formData.description}</p>
            </section>
          )}

          {activeTab === "members" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Members
              </h2>
              <p className="text-gray-600">Members list will appear here.</p>
            </section>
          )}

          {activeTab === "events" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Events
              </h2>
              <p className="text-gray-600">Upcoming events will be listed here.</p>
            </section>
          )}

          {activeTab === "posts" && (
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Posts
              </h2>
              <p className="text-gray-600">Community posts will show here.</p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommunityDashboard;
