import React, { useState, useEffect, useRef } from "react";
import NewsCard from "./NewsCard";
import Slider from "react-slick";
import { FaPause, FaPlay } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Headlines = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [autoplay, setAutoplay] = useState(true);

  const sliderRef = useRef(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/top")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.slice(0, 10)); // more headlines for smooth scroll
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load headlines");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-center">Loading headlines...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  // 🔹 Continuous carousel settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 5000, // higher = slower
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: autoplay,
    autoplaySpeed: 0, // continuous
    cssEase: "linear",
    arrows: false,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  // 🔹 Toggle autoplay dynamically
  const toggleAutoplay = () => {
    if (autoplay) {
      sliderRef.current.slickPause();
    } else {
      sliderRef.current.slickPlay();
    }
    setAutoplay(!autoplay);
  };

  return (
    <div className="bg-white shadow-sm border rounded relative overflow-hidden">
      {/* Red Tag */}
      <div className="bg-red-700 text-white px-4 py-1 font-semibold inline-block">
        HEADLINES
      </div>

      {/* Continuous Carousel */}
      <Slider ref={sliderRef} {...settings} className="px-2">
        {news.map((article, index) => (
          <div key={index} className="px-2">
            <NewsCard article={article} compact />
          </div>
        ))}
      </Slider>

      {/* Pause/Play Button */}
      <button
        onClick={toggleAutoplay}
        className="absolute top-2 right-2 bg-red-700 text-white p-2 rounded"
      >
        {autoplay ? <FaPause /> : <FaPlay />}
      </button>
    </div>
  );
};

export default Headlines;
