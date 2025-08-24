import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "./NewsCard";

const SearchResults = () => {
  const { query } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    fetch(`${apiUrl}/api/search?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      });
  }, [query]);

  if (loading) return <p>Loading search results...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Search Results for "{query}"</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {news.length > 0 ? (
          news.map((article, idx) => <NewsCard key={idx} article={article} />)
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
