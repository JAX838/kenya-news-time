import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import NewsCard from "./NewsCard";

const ArticleDetail = () => {
  const { slug } = useParams();
  const location = useLocation();
  const [article, setArticle] = useState(location.state?.article || null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoading, setContentLoading] = useState(false);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
    if (!article) {
      fetch(`${apiUrl}/api/news/top`)
        .then((res) => res.json())
        .then((data) => {
          const found = data.find(
            (a) =>
              a.title
                .toLowerCase()
                .replace(/ /g, "-")
                .replace(/[^\w-]+/g, "") === slug
          );
          setArticle(found);
        });
    }

    if (article && !article.content && article.link) {
      setContentLoading(true);
      fetch(
        `${apiUrl}/api/article/content?url=${encodeURIComponent(article.link)}`
      )
        .then((res) => res.json())
        .then((full) => {
          console.log("Scraped content:", full.content); // Debug
          setArticle({ ...article, content: full.content });
        })
        .catch((err) => console.error("Fetch error:", err))
        .finally(() => setContentLoading(false));
    }

    if (article?.category?.[0]) {
      fetch(`${apiUrl}/api/news/${article.category[0].toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => setRelatedNews(data.slice(0, 3)))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug, article?.category, article?.link]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    console.log("Comment submitted:", { name, email, website, comment });
    setComment("");
    setName("");
    setEmail("");
    setWebsite("");
  };

  if (loading) return <p className="p-4 text-center">Loading article...</p>;
  if (!article)
    return <p className="p-4 text-center text-red-600">Article not found</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-lg rounded-lg">
      <Link to="/" className="text-red-600 hover:underline mb-4 inline-block">
        &larr; Back
      </Link>
      <h1 className="text-3xl font-bold mb-2">{article.title}</h1>
      <p className="text-sm text-gray-600 mb-4">
        {article.creator || "Admin NewsLightKenya"} ·{" "}
        {new Date(article.pubDate).toLocaleDateString()}
      </p>
      {article.image_url && (
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-64 object-cover rounded mb-4"
        />
      )}
      <div className="text-gray-800 mb-6 whitespace-pre-wrap leading-relaxed">
        {contentLoading
          ? "Loading full content..."
          : article.content || article.description || "Content not available"}
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2">Tags</h3>
        <span className="bg-gray-200 px-2 py-1 rounded text-sm">
          {article.category?.join(", ") || "NLK"}
        </span>
      </div>
      <div className="mb-6">
        <h3 className="font-bold mb-2">Related Articles</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {relatedNews.map((rel, idx) => (
            <NewsCard key={idx} article={rel} />
          ))}
        </div>
      </div>
      <div className="bg-gray-100 p-4 rounded">
        <h3 className="font-bold mb-4">Leave a Reply</h3>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Your comment"
            className="w-full p-2 border mb-2"
            rows={4}
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-2">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name *"
              className="p-2 border"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email *"
              className="p-2 border"
              required
            />
            <input
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="Website"
              className="p-2 border"
            />
          </div>
          <button
            type="submit"
            className="bg-black text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default ArticleDetail;
