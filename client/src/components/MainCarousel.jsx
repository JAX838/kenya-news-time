import { useState, useEffect } from "react";

const MainCarousel = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/technology")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.slice(0, 5));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (news.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === news.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5 seconds

    return () => clearInterval(interval);
  }, [news]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;

  return (
    <div className="relative w-full">
      <div className="overflow-hidden rounded-lg shadow-lg relative h-[650px]">
        {news.map((article, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={article.image_url || article.urlToImage}
              alt={article.title || "News image"}
              className="w-full h-full object-cover"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4">
              <span className="bg-blue-600 text-white px-2 py-1 text-xs rounded">
                {article.category?.[0] || "NEWS"}
              </span>
              <h2 className="text-white font-bold text-xl mt-2">
                {article.title}
              </h2>
              <p className="text-gray-200 text-sm line-clamp-3">
                {article.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {news.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full ${
              idx === currentIndex ? "bg-white" : "bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainCarousel;
