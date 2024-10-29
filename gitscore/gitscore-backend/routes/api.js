// routes/api.js
const express = require('express');
const {
  getGitHubData,
  getLeaderboardData,
} = require('../controllers/githubController');
const router = express.Router();

// Routes
router.post('/get-github-data', getGitHubData);
router.get('/leaderboard', getLeaderboardData);

module.exports = router;
