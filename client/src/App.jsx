import React from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Headlines from "./components/Headlines";
import FeaturedPosts from "./components/FeaturedPosts";
import CategoryPage from "./components/CategoryPage";
import Home from "./components/Home";
import ArticleDetail from "./components/ArticleDetail";
import Footer from "./components/Footer";
import SearchResults from "./components/SearchResults";
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white pt-10 flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Headlines />
                  <Home />
                  <FeaturedPosts />
                </>
              }
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/article/:slug" element={<ArticleDetail />} />
            <Route path="/search/:query" element={<SearchResults />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
