import React from "react";

export default function showTabContent(activeTab, formData) {
  if (activeTab === "overview") {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            About this Community
          </h2>
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
            <p className="text-slate-700 text-lg">{formData?.description}</p>
          </div>
        </div>

        {/* Simple stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-pink-50 p-6 rounded-xl text-center border border-pink-100">
            <div className="text-3xl mb-2">👥</div>
            <h3 className="font-semibold text-slate-800">Members</h3>
            <p className="text-slate-600 text-sm">Growing community</p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
            <div className="text-3xl mb-2">📅</div>
            <h3 className="font-semibold text-slate-800">Events</h3>
            <p className="text-slate-600 text-sm">Stay connected</p>
          </div>

          <div className="bg-green-50 p-6 rounded-xl text-center border border-green-100">
            <div className="text-3xl mb-2">💬</div>
            <h3 className="font-semibold text-slate-800">Posts</h3>
            <p className="text-slate-600 text-sm">Share stories</p>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "members") {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">👥</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Members</h2>
        <p className="text-slate-600">Members will appear here soon!</p>
      </div>
    );
  }

  if (activeTab === "events") {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">📅</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Events</h2>
        <p className="text-slate-600">Upcoming events will be listed here</p>
      </div>
    );
  }

  if (activeTab === "posts") {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">💬</div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4">Posts</h2>
        <p className="text-slate-600">Community posts will show here</p>
      </div>
    );
  }

  return null;
}
