const express = require('express');
const path = require('path');
const fs = require('fs'); // Import file system module to handle JSON file
const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// View Counter Endpoint
app.get('/api/views', (req, res) => {
  // Read the current view count from views.json
  fs.readFile('views.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error reading views.json:", err);
      return res.status(500).json({ error: "Could not read view count" });
    }

    // Parse JSON data and increment the count
    const viewsData = JSON.parse(data);
    viewsData.count += 1;

    // Write the updated view count back to views.json
    fs.writeFile('views.json', JSON.stringify(viewsData), (err) => {
      if (err) {
        console.error("Error writing to views.json:", err);
        return res.status(500).json({ error: "Could not update view count" });
      }

      // Send the updated count to the client
      res.json({ count: viewsData.count });
    });
  });
});

// Other API routes can go here
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// Catch-all handler for any request that doesn't match API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
