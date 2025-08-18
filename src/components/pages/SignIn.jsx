import { User } from "lucide-react";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-react";

const SignIn = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const { signIn, isLoaded } = useSignIn();

  // form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    if (!isLoaded) return; // Clerk still loading

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        console.log("✅ Sign-in successful", result);
        setShowSignIn(false); // close popup
        setEmail("");
        setPassword("");
        setError("");
      } else {
        console.log("Further action required:", result);
      }
    } catch (err) {
      console.error("Sign-in failed:", err);
      setError("Invalid credentials. Try again.");
    }
  };

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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
          />

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <button
            onClick={handleSignIn}
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
          >
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
