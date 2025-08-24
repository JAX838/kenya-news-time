import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const PopularNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/news/education") // Or 'top' for popular
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

  if (loading)
    return <p className="p-4 text-center">Loading popular news...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="font-bold text-xl mb-4">Popular News</h2>
      <div className="space-y-4">
        {news.map((article, index) => (
          <NewsCard key={index} article={article} /> // Vertical stack
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
