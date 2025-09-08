import CommunityCards from '../../components/CommunityCards';
import DiscoverEvents from './utils/DiscoverEvents';

const DiscoverPage = () => {
  return (
     <div className="min-h-screen bg-white bg-gradient-to-br from-[rgb(240,236,231)] to-white">
      <div className="overflow-y-auto">
        <DiscoverEvents />
        <CommunityCards />
      </div>
    </div>
  );
};

export default DiscoverPage;