import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const NewsCard = ({ article, compact = false }) => {
  if (!article) return null;

  const slug = article.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, ""); // Simple slug

  if (compact) {
    // 🔹 Compact style (used in Headlines)
    return (
      <Link to={`/article/${slug}`} state={{ article }}>
        <div className="flex items-center min-w-[320px] max-w-sm p-4 space-x-3 hover:bg-gray-50 transition cursor-pointer">
          {/* Thumbnail */}
          {article?.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-20 h-16 object-cover rounded"
            />
          )}

          {/* Text */}
          <div className="flex flex-col">
            <div className="flex items-center text-gray-500 text-xs mb-1">
              <FaRegClock className="mr-1" />
              {new Date(article.pubDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <p className="font-medium text-black leading-snug line-clamp-2">
              {article.title}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // 🔹 Default full card style
  return (
    <Link to={`/article/${slug}`} state={{ article }}>
      <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer">
        {article?.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-40 object-cover rounded-t-lg mb-2"
          />
        ) : (
          <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-t-lg mb-2">
            <span>No Image</span>
          </div>
        )}
        <span className="text-xs font-bold uppercase text-gray-500 block mb-1">
          {article.category?.[0] || "GENERAL"}
        </span>
        <h3 className="font-bold text-lg mb-1">{article.title}</h3>
        <p className="text-sm text-gray-600 mb-2">
          @{article.creator || "Admin KenyanewsTime"} ·{" "}
          {new Date(article.pubDate).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>
        <p className="text-sm text-gray-700 line-clamp-2">
          {article.description}
        </p>
      </div>
    </Link>
  );
};

export default NewsCard;
