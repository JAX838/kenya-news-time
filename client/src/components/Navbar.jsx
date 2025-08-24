import React, { useState, useEffect } from "react";
import { useDocumentMeta } from "../hooks/useDocumentMeta";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTiktok,
  FaYoutube,
  FaEnvelope,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  useDocumentMeta(
    "Home - Newsroom",
    "Learn more about Newsroom, our mission, and our team."
  );
  const [tickerHeadline, setTickerHeadline] = useState(
    "Loading latest headline..."
  );
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery) navigate(`/search/${encodeURIComponent(searchQuery)}`);
  };
  const currentDate = new Date().toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/news/top")
      .then((res) => res.json())
      .then((data) => {
        if (data && data.length > 0) {
          setTickerHeadline(data[0].title);
        }
      })
      .catch(() => console.error("Failed to fetch ticker headline"));
  }, []);

  return (
    <>
      {/* Fixed Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-red-600 text-white text-sm p-2 flex justify-between items-center z-50 shadow-md">
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline">{currentDate}</span>
          <div className="overflow-hidden whitespace-nowrap w-40 sm:w-80">
            <span className="inline-block animate-marquee">
              {tickerHeadline} |{" "}
            </span>
            <span className="inline-block animate-marquee">
              {tickerHeadline} |{" "}
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <FaFacebookF className="cursor-pointer hover:opacity-80" size={16} />
          <FaLinkedinIn className="cursor-pointer hover:opacity-80" size={16} />
          <FaTiktok className="cursor-pointer hover:opacity-80" size={16} />
          <FaYoutube className="cursor-pointer hover:opacity-80" size={16} />
          <FaEnvelope className="cursor-pointer hover:opacity-80" size={16} />
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white text-black pt-12 p-4 flex justify-between items-center shadow-md">
        <div className="text-2xl md:text-3xl font-bold text-red-600">
          <Link to="/">Kenya News Time</Link>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 text-sm md:text-base">
          <li>
            <Link to="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link to="/category/auditing-report" className="hover:underline">
              Auditing Report
            </Link>
          </li>
          <li>
            <Link to="/category/agriculture" className="hover:underline">
              Agriculture
            </Link>
          </li>
          <li>
            <Link to="/category/business" className="hover:underline">
              Business
            </Link>
          </li>
          <li>
            <Link to="/category/education" className="hover:underline">
              Education
            </Link>
          </li>
          <li>
            <Link to="/category/health" className="hover:underline">
              Health
            </Link>
          </li>
          <li>
            <Link to="/category/politics" className="hover:underline">
              Politics
            </Link>
          </li>
          <li>
            <Link to="/category/technology" className="hover:underline">
              Technology
            </Link>
          </li>
        </ul>

        {/* Search (desktop only) */}
        <div className="hidden md:flex items-center space-x-4">
          <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              className="p-2 rounded border border-gray-300 focus:outline-none focus:border-red-600"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-red-600 text-white p-2 rounded">
              Search
            </button>
          </form>
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden flex items-center space-x-2 text-red-600 font-semibold focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={`transform transition-transform duration-300 ${
              menuOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            {menuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <FaBars className="text-xl" />
            )}
          </span>
          <span>MENU</span>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-40">
          <ul className="flex flex-col space-y-4 p-4 text-base">
            <li>
              <Link
                to="/"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/category/auditing-report"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Auditing Report
              </Link>
            </li>
            <li>
              <Link
                to="/category/agriculture"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Agriculture
              </Link>
            </li>
            <li>
              <Link
                to="/category/business"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Business
              </Link>
            </li>
            <li>
              <Link
                to="/category/education"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Education
              </Link>
            </li>
            <li>
              <Link
                to="/category/health"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Health
              </Link>
            </li>
            <li>
              <Link
                to="/category/politics"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Politics
              </Link>
            </li>
            <li>
              <Link
                to="/category/technology"
                className="hover:underline"
                onClick={() => setMenuOpen(false)}
              >
                Technology
              </Link>
            </li>
          </ul>
          <div className="p-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 rounded border border-gray-300 focus:outline-none focus:border-red-600"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
