import { Search, User } from "lucide-react";
import { useState } from "react";

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setShowSignIn(true)}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <User size={20} className="text-gray-600" />
      </button>

      {/* Sign In Popup */}
      {showSignIn && (
        <div className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-4 z-50 w-64">
          <h2 className="text-lg font-semibold mb-2">Sign In</h2>
          <input
            type="email" 
            placeholder="Email"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          />
          <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800">
            Sign In
          </button>
          <button
            onClick={() => setShowSignIn(false)}
            className="w-full mt-2 text-sm text-gray-500"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default SignIn;
