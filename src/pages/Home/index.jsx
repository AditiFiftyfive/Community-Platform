import HeroSlider from "../../components/HeroSlider";
import HeroSection from '../../components/Home/utils/HeroSection';
import FeaturesPreview from '../../components/Home/utils/FeaturesPreview';

const Home = () => {
  return (
    <div className="min-h-screen max-w-full">
      <div className="overflow-y-auto">
        <HeroSection />
        <HeroSlider />
        <FeaturesPreview />
      </div>
    </div>
  );
};

export default Home;
