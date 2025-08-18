import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ThriveLandingPage from './components/pages/ThriveLandingPage';
import CommunityCards from "./components/OtherPages/CommunityCards";
import communityEvents from "./components/communityEvents";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        
        <Routes>
          <Route path="/events" element={<communityEvents />} />
          <Route path="/" element={<ThriveLandingPage />} />
          <Route path="/discover" element={<CommunityCards />} />
        </Routes>
      </div>
    </Router>
  );
}