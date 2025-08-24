import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const Footer = () => {
  const [missedNews, setMissedNews] = useState([]);
  const [mostRead, setMostRead] = useState([]);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/news/top`)
      .then((res) => res.json())
      .then((data) => setMissedNews(data.slice(0, 4)));

    fetch(`${apiUrl}/api/news/politics`)
      .then((res) => res.json())
      .then((data) => setMostRead(data.slice(0, 6)));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <footer className="bg-gray-100">
      {/* Top Bar */}
      <div className="bg-red-600 text-white text-xs sm:text-sm font-bold px-4 py-2">
        You May Have Missed
      </div>

      {/* Carousel */}
      <div className="px-2 sm:px-4 border-b-4 border-red-600">
        <Slider {...settings}>
          {missedNews.map((article, idx) => (
            <div key={idx} className="px-2 flex justify-center">
              {/* Limit card max width so it doesn’t stretch too wide */}
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-md">
                <NewsCard article={article} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Footer Sections */}
      <div className="bg-gray-900 text-white grid grid-cols-1 md:grid-cols-3 gap-6 px-4 sm:px-6 py-6 sm:py-8">
        {/* About Us */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">About Us</h3>
          <p className="text-gray-300 text-sm mb-3 leading-relaxed">
            News Light Kenya is your trusted source for timely, accurate, and
            engaging news. We deliver comprehensive coverage of local and global
            events, empowering readers with insightful reporting and in-depth
            analysis.
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Email: info@kenya news time.co.ke
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            Tel: +254 769399725
          </p>
        </div>

        {/* Most Read */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Most Read</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {mostRead.map((article, idx) => (
              <li key={idx}>
                <Link
                  to={`/article/${article.title
                    .toLowerCase()
                    .replace(/ /g, "-")
                    .replace(/[^\w-]+/g, "")}`}
                  className="hover:text-red-500 block"
                >
                  {article.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-lg sm:text-xl font-semibold mb-3">Categories</h3>
          <ul className="grid grid-cols-2 sm:grid-cols-1 gap-y-2 text-gray-300 text-sm">
            {[
              "health",
              "business",
              "education",
              "Entertainment",
              "Environmental",
              "Fashion",
              "Featured",
              "Health",
              "Innovation",
              "News",
              "Opinion",
              "politics",
            ].map((category) => (
              <li key={category}>
                <Link
                  to={`/category/${category.toLowerCase()}`}
                  className="hover:text-red-500 block"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
