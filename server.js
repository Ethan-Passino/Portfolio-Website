const express = require('express');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

const loadCounts = () => {
  try {
    const data = fs.readFileSync('views.json', 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error("Could not read views.json:", error);
    return { count: 0, uniqueVisitors: 0 };
  }
};

const saveCounts = (data) => {
  fs.writeFileSync('views.json', JSON.stringify(data), (error) => {
    if (error) console.error("Could not write to views.json:", error);
  });
};

// GET route for fetching current view and unique visitor counts
app.get('/api/views', (req, res) => {
  const counts = loadCounts();

  // Increment total view count
  counts.count += 1;
  saveCounts(counts); // Attempt to save the updated counts

  res.json({ views: counts.count, uniqueVisitors: counts.uniqueVisitors });
});

// POST route for incrementing unique visitor count
app.post('/api/views', (req, res) => {
  const counts = loadCounts();

  // Check if visitor is unique by cookie
  if (!req.cookies.hasVisited) {
    counts.uniqueVisitors += 1;
    res.cookie('hasVisited', 'true', { maxAge: 365 * 24 * 60 * 60 * 1000 }); // 1-year cookie
  }

  // Increment total view count
  counts.count += 1;

  // Save updated counts and check for errors
  try {
    saveCounts(counts);
  } catch (error) {
    console.error("Error saving counts:", error);
    return res.status(500).json({ error: "Could not update view counts" });
  }

  res.json({ views: counts.count, uniqueVisitors: counts.uniqueVisitors });
});

// Catch-all handler for any request that doesn't match API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
