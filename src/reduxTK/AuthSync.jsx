import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { loginSuccess, logout } from "./features/auth/authSlice";

export default function AuthSync() {
  const dispatch = useDispatch();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    if (isSignedIn && user) {
      // Normalize Clerk user object → store only what you need
      const userData = {
        id: user.id,
        name: user.fullName,
        email: user.primaryEmailAddress?.emailAddress,
        username: user.username,
        imageUrl: user.imageUrl,
      };
      dispatch(loginSuccess(userData));
    } else {
      dispatch(logout());
    }
  }, [isSignedIn, user, dispatch]);

  return null; 
}
