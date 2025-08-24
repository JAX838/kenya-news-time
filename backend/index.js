const express = require("express");
const cron = require("node-cron");
const NodeCache = require("node-cache");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
const cache = new NodeCache({ stdTTL: 1800 }); // Cache for 30 minutes (1800 seconds)
const API_KEY = process.env.NEWS_API_KEY;
const PORT = process.env.PORT || 5000;

app.use(cors()); // Allows frontend to access backend

// Function to fetch news from NewsData.io API (using native fetch)
async function fetchNews(category = "top") {
  const url = `https://newsdata.io/api/1/latest?country=ke&category=${category}&apikey=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.status === "success") {
    cache.set(`kenya-${category}`, data.results); // Store articles in cache
    return data.results;
  } else {
    throw new Error("API error: " + data.message);
  }
}

// Cron job to refresh cache every 30 minutes for key categories
// This keeps API calls low (e.g., 48/day for 2 refreshes/hour x 24 hours)
cron.schedule("*/30 * * * *", async () => {
  console.log("Refreshing news cache...");
  await fetchNews("top"); // General headlines
  await fetchNews("politics"); // Politics
  await fetchNews("business"); // Business/Auditing
  await fetchNews("health"); // Health
  await fetchNews("technology"); // Technology
  await fetchNews("education"); // Education
  // Add more if needed, e.g., 'environment' for Agriculture
});

// API endpoint: Get news by category (serves from cache if available)
app.get("/api/news/:category", async (req, res) => {
  const category = req.params.category;
  let news = cache.get(`kenya-${category}`);
  if (!news) {
    try {
      news = await fetchNews(category);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to fetch news" });
    }
  }
  res.json(news);
});
app.get("/api/article/content", async (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ error: "URL required" });

  try {
    console.log(`Scraping URL: ${url}`); // Debug log
    const { data: html } = await axios.get(url, { timeout: 10000 });
    const $ = cheerio.load(html);
    let content = "";

    // Site-specific selectors for Kenyan news (test and adjust)
    if (url.includes("nation.africa")) {
      content = $(".story-view .paragraphs p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
    } else if (url.includes("standardmedia.co.ke")) {
      content = $(".article-content p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
    } else if (url.includes("the-star.co.ke")) {
      content = $(".article-body p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
    } else {
      // Generic fallback
      content = $("article, .article-body, .post-content, .story-body, p")
        .map((i, el) => $(el).text().trim())
        .get()
        .join("\n\n");
    }

    if (!content || content === "") {
      console.log(
        "No content extracted; HTML sample:",
        $.html().substring(0, 200)
      ); // Log HTML snippet
      content = "Full content could not be extracted from this source.";
    }
    res.json({ content });
  } catch (err) {
    console.error(`Scraping error for ${url}:`, err.message);
    res.status(500).json({ error: "Failed to fetch content" });
  }
});
app.get("/api/search", async (req, res) => {
  const { q } = req.query;
  if (!q) return res.status(400).json({ error: "Query required" });

  const cached = cache.get(`search-${q}`);
  if (cached) return res.json(cached);

  try {
    const url = `https://newsdata.io/api/1/latest?country=ke&q=${encodeURIComponent(
      q
    )}&full_content=1&apikey=${API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === "success") {
      cache.set(`search-${q}`, data.results);
      res.json(data.results);
    } else {
      res.status(500).json({ error: "API error" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to search" });
  }
});
// Start the server and do initial fetch
app.listen(PORT, async () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  await fetchNews("top"); // Initial cache population
});
