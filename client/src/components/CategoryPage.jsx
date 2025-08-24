import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import NewsCard from "./NewsCard";

const CategoryPage = () => {
  const { category } = useParams(); // Get category from URL (e.g., 'health')
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1); // For pagination
  const articlesPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/news/${category.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load category news");
        setLoading(false);
      });
  }, [category, page]); // Refetch on page change

  const nextPage = () => setPage((prev) => prev + 1);
  const prevPage = () => setPage((prev) => Math.max(prev - 1, 1));

  if (loading)
    return (
      <p className="p-4 text-center animate-pulse">
        Loading {category} news...
      </p>
    );
  if (error) return <p className="p-4 text-center text-red-600">{error}</p>;

  const paginatedNews = news.slice(
    (page - 1) * articlesPerPage,
    page * articlesPerPage
  );

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <Link to="/" className="text-red-600 hover:underline mb-4 inline-block">
        &larr; Back to Home
      </Link>
      <h1 className="text-3xl font-bold text-red-600 mb-6 capitalize">
        {category} News
      </h1>
      {/* Hero/Top Article */}
      {news[0] && (
        <div className="mb-8 p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105">
          <NewsCard article={news[0]} />
        </div>
      )}
      {/* Grid of Articles with Fade-In Animation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {paginatedNews.map((article, index) => (
          <div
            key={index}
            className="opacity-0 animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <NewsCard article={article} />
          </div>
        ))}
      </div>
      {/* Pagination */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={prevPage}
          disabled={page === 1}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={nextPage}
          disabled={paginatedNews.length < articlesPerPage}
          className="bg-red-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryPage;
