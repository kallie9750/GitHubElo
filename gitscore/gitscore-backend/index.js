// index.js
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
app.use(express.json());

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

// Use the API routes
app.use('/api', apiRoutes);

app.get('/', (req, res) => res.send('API is running'));

// Export the Express app as a Firebase Function
exports.app = functions
  .region('us-central1')
  .runWith({ memory: '256MB', timeoutSeconds: 60 })
  .https.onRequest(app);
