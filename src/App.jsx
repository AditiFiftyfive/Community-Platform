import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CommunityEvents from './pages/CommunityEvents';
import DiscoverPage from './pages/DiscoverPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import CreateCommunityPage from './pages/CreateCommunityPage';
import CommunityDashboard from './pages/CommunityDahsboard';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        
        <Routes>
          <Route path="/events" element={<CommunityEvents />} />
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/create-thrivecircle" element={<CreateCommunityPage />} />
          <Route path="/community/:slug" element={<CommunityDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}
