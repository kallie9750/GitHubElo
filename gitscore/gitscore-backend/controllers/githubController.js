// controllers/githubController.js
const functions = require('firebase-functions');
const axios = require('axios');
const db = require('../firebase'); // Import Firestore instance

const calculateElo = (repos, followers, following, contributions) => {
 //add calculation for elo
};

async function storeInFirestore(username, eloScore) {
  try {
    const usersRef = db.collection('users');
    const normalizedUsername = username.trim().toLowerCase();

    await usersRef.doc(normalizedUsername).set({
      username: username.trim(),
      eloScore: parseInt(eloScore, 10),
    });

    console.log(`Stored user ${username} with EloScore ${eloScore}`);
    return true;
  } catch (error) {
    console.error('Error in storeInFirestore:', error);
    throw new Error(`Failed to update Firestore: ${error.message}`);
  }
}

// Fetch leaderboard data from Firestore
exports.getLeaderboardData = async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.orderBy('eloScore', 'desc').get();

    console.log('Snapshot size:', snapshot.size);
    console.log('Raw data:', snapshot.docs.map(doc => doc.data()));
    
    const leaderboardData = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        username: data.username,
        eloScore: parseInt(data.eloScore, 10)
      };
    }).filter(entry => entry.username && !isNaN(entry.eloScore));
    
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard data' });
  }
};

// // Fetch leaderboard data from Firestore
exports.getLeaderboardData = async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.orderBy('eloScore', 'desc').get();

    console.log('Snapshot size:', snapshot.size);
    console.log('Raw data:', snapshot.docs.map(doc => doc.data()));
    
    const leaderboardData = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        username: data.username,
        eloScore: parseInt(data.eloScore, 10)
      };
    }).filter(entry => entry.username && !isNaN(entry.eloScore));
    
    res.json(leaderboardData);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ message: 'Error fetching leaderboard data' });
  }
};


// Fetch GitHub data and calculate Elo
exports.getGitHubData = async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ message: 'Username is required' });
  }

  const GITHUB_TOKEN = functions.config().github.token;
  if (!GITHUB_TOKEN) {
    console.error('GitHub token not configured');
    return res.status(500).json({ message: 'GitHub token not configured' });
  }

  try {
    const userResponse = await axios.get(
      `https://api.github.com/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!userResponse.data) {
      return res.status(404).json({ message: 'GitHub user not found' });
    }

    const userData = userResponse.data;

    // Fetch contribution data using GitHub GraphQL
    const contributionsResponse = await axios.post(
      'https://api.github.com/graphql',
      {
        query: `
        query {
          user(login: "${username}") {
            contributionsCollection {
              contributionCalendar {
                totalContributions
              }
            }
          }
        }
      `,
      },
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    if (!contributionsResponse.data?.data?.user) {
      return res
        .status(404)
        .json({ message: 'Unable to fetch contribution data' });
    }

    const contributions =
      contributionsResponse.data.data.user.contributionsCollection
        .contributionCalendar.totalContributions;

    const eloScore = calculateElo(
      userData.public_repos,
      userData.followers,
      userData.following,
      contributions
    );

    try {
      await storeInFirestore(username, eloScore);
    } catch (storeError) {
      console.error('Error storing in Firestore:', storeError);
    }

    res.json({
      username: userData.login,
      repos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
      contributions: contributions,
      eloScore: eloScore,
    });
  } catch (error) {
    console.error('Error in getGitHubData:', error);

    const status = error.response?.status || 500;
    const message =
      error.response?.data?.message || 'Error fetching GitHub data';

    res.status(status).json({
      message,
      error: error.message,
    });
  }
};

module.exports = {
  getGitHubData: exports.getGitHubData,
  getLeaderboardData: exports.getLeaderboardData,
};
