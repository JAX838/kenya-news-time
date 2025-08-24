import React from "react";
import { Link } from "react-router-dom";
import { FaRegClock } from "react-icons/fa";

const NewsCard = ({ article, compact = false }) => {
  if (!article) return null;

  const slug = article.title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  if (compact) {
    // 🔹 Compact style (used in Headlines)
    return (
      <Link to={`/article/${slug}`} state={{ article }}>
        <div
          className="flex items-center min-w-[280px] sm:min-w-[320px] max-w-sm 
                        p-3 sm:p-4 space-x-3 hover:bg-gray-50 transition cursor-pointer"
        >
          {/* Thumbnail */}
          {article?.image_url && (
            <img
              src={article.image_url}
              alt={article.title}
              className="w-16 h-14 sm:w-20 sm:h-16 object-cover rounded"
            />
          )}

          {/* Text */}
          <div className="flex flex-col">
            <div className="flex items-center text-gray-500 text-[10px]  sm:text-xs mb-1">
              <FaRegClock className="mr-1" />
              {new Date(article.pubDate).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </div>
            <p className="hidden sm:block font-medium text-black text-xs sm:text-sm leading-snug line-clamp-2">
              {article.title}
            </p>
          </div>
        </div>
      </Link>
    );
  }

  // 🔹 Default full card style (responsive)
  return (
    <Link to={`/article/${slug}`} state={{ article }}>
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer 
                      w-full h-full flex flex-col"
      >
        {article?.image_url ? (
          <img
            src={article.image_url}
            alt={article.title}
            className="w-full h-32 sm:h-60 sm:w-30 md:h-48 object-cover rounded-t-lg"
          />
        ) : (
          <div className="w-full h-32 sm:h-40 bg-gray-200 flex items-center justify-center rounded-t-lg">
            <span className="text-gray-500 text-xs sm:text-sm">No Image</span>
          </div>
        )}

        <div className="p-3 sm:p-4 flex flex-col flex-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase text-gray-500 mb-1">
            {article.category?.[0] || "GENERAL"}
          </span>
          <h3 className="font-bold text-sm sm:text-base md:text-lg mb-1 line-clamp-2">
            {article.title}
          </h3>
          <p className="text-[11px] sm:text-sm text-gray-600 mb-2">
            @{article.creator || "Admin KenyanewsTime"} ·{" "}
            {new Date(article.pubDate).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>
          <p className="text-xs sm:text-sm text-gray-700 line-clamp-2 flex-1">
            {article.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default NewsCard;
