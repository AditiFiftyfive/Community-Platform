import './index.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import CommunityEvents from './pages/CommunityEvents';
import DiscoverPage from './pages/DiscoverPage/Index.jsx';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen font-sans">
        
        <Routes>
          <Route path="/events" element={<CommunityEvents />} />
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<DiscoverPage />} />
        </Routes>
      </div>
    </Router>
  );
}
