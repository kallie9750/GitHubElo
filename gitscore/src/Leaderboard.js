import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import './Leaderboard.css';
import twitterLogo from "./twitter-logo.svg";


const Leaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const leaderboardRef = useRef(null);

  // Get the Elo score passed from the Dashboard component
  const location = useLocation();
  const eloScore = location.state?.eloScore;

  const fetchLeaderboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch("https://us-central1-githubelo.cloudfunctions.net/app/api/leaderboard");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      const validData = data.filter(entry => entry && entry.username && typeof entry.eloScore === 'number')
                            .sort((a, b) => b.eloScore - a.eloScore);
      setLeaderboardData(validData);
    } catch (error) {
      setError("Failed to load leaderboard data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  if (loading) {
    return (
      <div className="leaderboard-container">
        <div className="loading">Loading Leaderboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="leaderboard-container">
        <div className="error">
          {error}
          <button onClick={fetchLeaderboardData}>Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div ref={leaderboardRef} className="leaderboard-container">
      <h1>GitHub Elo Leaderboard</h1>
      <div className="table-wrapper">
        <table id="leaderboard">
          <thead>
            <tr>
              <th className='rank'><span>Rank</span></th>
              <th className='username'><span>Username</span></th>
              <th className='eloscore'><span>Elo Score</span></th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((user, index) => (
              <tr key={user.username}>
                <td className={`rank rank-${index < 3 ? index + 1 : 'normal'}`}>
                  #{index + 1}
                </td>
                <td className="username">
                  <a
                    href={`https://github.com/${user.username}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.username}
                  </a>
                </td>
                <td className="score">{user.eloScore.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='leaderscore'> 
        {eloScore ? `Your score is ${eloScore}` : "No score available"}
      </div>
      <footer className="footer">
        Made by{" "}
        <a href="https://x.com/ammar_tsx/highlights" target="_blank" rel="noopener noreferrer">
        Ammar_tsx
        </a>
      </footer>
    </div>
  );
};

export default Leaderboard;

   
  //  {/* <div className="button-container">
  //       <button className="glow-button-twitter" onClick={handleCaptureImage}>
  //         <img
  //           src={twitterLogo}
  //           alt="Twitter logo"
  //           className="twitter-logo"
  //         />
  //         Brag about it!
  //       </button>
  //       <button
  //         className="glow-button-clipboard"
  //         onClick={handleCopyToClipboard}
  //       >
  //         Copy IMG to Clipboard
  //       </button>
  //     </div> */}
