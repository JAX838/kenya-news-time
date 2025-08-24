import React, { useState, useEffect } from "react";
import NewsCard from "./NewsCard";

const FeaturedPosts = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/news/technology").then((res) =>
        res.json()
      ),
      fetch("http://localhost:5000/api/news/business").then((res) =>
        res.json()
      ),
    ])
      .then(([healthData, businessData]) => {
        const healthArticles = Array.isArray(healthData)
          ? healthData.slice(0, 5)
          : []; // Safe array coercion
        const businessArticles = Array.isArray(businessData)
          ? businessData.slice(0, 3)
          : []; // Safe array coercion
        const combined = [...healthArticles, ...businessArticles].filter(
          (article) => article !== undefined && article !== null
        ); // Filter out any undefined/null
        setNews(combined);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load featured posts");
        setLoading(false);
      });
  }, []);

  if (loading)
    return <p className="p-4 text-center">Loading featured posts...</p>;
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  return (
    <div className="p-4 bg-gray-100">
      <h2 className="bg-red-600 text-white font-bold text-sm px-4 py-1 inline-block rounded-t mb-0">
        Featured Posts
      </h2>
      <div className="flex overflow-x-auto space-x-4 md:grid md:grid-cols-4 md:gap-4 md:overflow-x-hidden">
        {news.map((article, index) => (
          <div key={index} className="min-w-[250px] md:min-w-0 flex-shrink-0">
            <NewsCard article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedPosts;
