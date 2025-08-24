// pages/Home.jsx
import LatestNews from "../components/LatestNews";
import PopularNews from "../components/PopularNews";
import MainCarousel from "../components/MainCarousel";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left column: Latest News */}
        <div className="lg:col-span-1">
          <LatestNews />
        </div>

        {/* Middle column: Carousel */}
        <div className="lg:col-span-2">
          <MainCarousel />
        </div>

        {/* Right column: Popular News */}
        <div className="lg:col-span-1">
          <PopularNews />
        </div>
      </div>
    </div>
  );
};

export default Home;
