import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CommunityEvents from './pages/CommunityEvents';
import DiscoverPage from './pages/DiscoverPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';

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
        </Routes>
      </div>
    </Router>
  );
}
