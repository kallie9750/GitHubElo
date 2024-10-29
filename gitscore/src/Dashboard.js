import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toPng } from "html-to-image";
import "./Dashboard.css";
import twitterLogo from "./twitter-logo.svg";
import leaderboard from "./leaderboard.svg";

function Dashboard() {
  const location = useLocation();
  const githubData = location.state?.githubData;
  const navigate = useNavigate();
  const dashboardRef = useRef(null);
  

  if (!githubData) {
    return <p>Error: Data not available. Please try logging in again.</p>;
  }

  // Detect if the browser is Safari
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  // Function to handle tweeting with or without image based on browser
  const handleCaptureImage = async () => {
    if (isSafari) {
      // Safari: Tweet without copying image
      const tweetText = `Check out my GitHub Elo: ${githubData.eloScore}! #GitHubElo Try it out: https://githubelo.web.app`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      alert("Safari doesn't support copying images to clipboard. Please take a screenshot to share on Twitter. You will be directed to twitter. Get a better browser lmao Safari sucks.");
      window.open(twitterUrl, "_blank");
      return;
    }

    // Non-Safari: Capture image, copy to clipboard, and tweet
    if (dashboardRef.current === null) return;

    try {
      const dataUrl = await toPng(dashboardRef.current, { cacheBust: true });
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const clipboardItem = new window.ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      alert("Image copied to clipboard! You can now paste it into Twitter.");

      const tweetText = `Check out my GitHub Elo: ${githubData.eloScore}! #GitHubElo Paste the image to share ^_^ Try it out: https://githubelo.web.app`;
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
      window.open(twitterUrl, "_blank");
    } catch (error) {
      console.error("Error capturing or copying image:", error);
    }
  };

  // Function to handle "Copy IMG to Clipboard" button
  const handleCopyToClipboard = async () => {
    if (isSafari) {
      alert("Safari doesn't allow copying images to clipboard. Please take a screenshot to share on Twitter. Get a better browser lmao Safari sucks.");
      return;
    }

    if (dashboardRef.current === null) return;

    try {
      const dataUrl = await toPng(dashboardRef.current, { cacheBust: true });
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      const clipboardItem = new window.ClipboardItem({ "image/png": blob });
      await navigator.clipboard.write([clipboardItem]);

      alert("Image copied to clipboard!");
    } catch (error) {
      console.error("Error copying image to clipboard:", error);
    }
  };

  // Function to navigate to the leaderboard page
  const handleLeaderboardClick = () => {
    navigate("/leaderboard", { state: { eloScore: githubData.eloScore } });
  };
  

  return (
    <>
      <div ref={dashboardRef} className="dashboard-container">
        <h1 className="dashboard-title">GitScore</h1>
        <h2 className="welcome-heading">Hellooooo {githubData.username}!</h2>

        <div className="neon-card">
          <div className="card-content">
            <p><strong>Repositories:</strong> {githubData.repos}</p>
            <p><strong>Followers:</strong> {githubData.followers}</p>
            <p><strong>Following:</strong> {githubData.following}</p>
            <p><strong>Contributions:</strong> {githubData.contributions}</p>
          </div>
        </div>

        <div className="elo-card">
          <div className="card-content">
            <p><strong>ELO SCORE:</strong> {githubData.eloScore}</p>
          </div>
        </div>

        <div className="button-container">
          <button className="glow-button-twitter" onClick={handleCaptureImage}>
            <img src={twitterLogo} alt="Twitter logo" className="twitter-logo" />
            Brag about it!
          </button>
          <button className="glow-button-clipboard" onClick={handleCopyToClipboard}>
            Copy IMG to Clipboard
          </button>
          <button className="glow-button-leaderboard" onClick={handleLeaderboardClick}>
            <img src={leaderboard} alt="Leaderboard logo" className="leaderboard-logo" />
            Leaderboard
          </button>
        </div>
        {/* Add the footer here */}
      <footer className="footer">
        Made by{" "}
        <a href="https://x.com/ammar_tsx/highlights" target="_blank" rel="noopener noreferrer">
            Ammar_tsx
        </a>
      </footer>
      </div>
    </>
  );
}

export default Dashboard;
