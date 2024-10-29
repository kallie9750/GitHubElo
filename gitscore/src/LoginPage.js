import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css"; // Assuming the necessary CSS for loading screen is here
import pixelArtGif from "./pixel-art.gif"; // Import your Pixel Art GIF
import twitterLogo from "./twitter-logo.svg";


function LoginPage() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      alert("Please enter a GitHub username");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "https://us-central1-githubelo.cloudfunctions.net/app/api/get-github-data",
        { username }
      );
      const githubData = response.data;

      setTimeout(() => {
        navigate("/dashboard", { state: { githubData } });
        setLoading(false);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(`Error: ${error.response.data.message}`);
      } else {
        alert("Error fetching GitHub data. Please try again.");
      }
      console.error("Error fetching GitHub data:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-text-container">
          <span className="loading-text">Loading</span>
          <span className="loading-dots">...</span>
        </div>
        <img src={pixelArtGif} alt="Loading animation" className="loading-gif" />
        <p className="loading-quote">
          "In life's labyrinth, we seek ourselves in others, only to discover
          the vast, unexplored universe within."
        </p>
      </div>
    );
  }

  return (
    <div className="login-page">
      <header className="login-header">
        <h1>GitScore</h1>
        <p className="sub-heading">Calculate your GitHub Elo :3</p>
      </header>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter GitHub username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="geteloscore" type="submit">Get Elo Score</button>
      </form>
      
      {/* Add the footer here */}
      <footer className="footer">
        Made by{" "}
        <a href="https://x.com/ammar_tsx/highlights" target="_blank" rel="noopener noreferrer">
        Ammar_tsx
        </a>
      </footer>
    </div>
  );
}

export default LoginPage;
