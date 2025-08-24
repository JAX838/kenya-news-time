import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const PopularNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/news/business`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load popular news");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4 text-center">Loading latest news...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Latest News</h2>
      <div className="space-y-4">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} /> // Vertical stack
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
