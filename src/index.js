const express = require("express");
const { Storage } = require("@google-cloud/storage");

// Create an Express app
const app = express();

// Create a Google Cloud Storage client
const storage = new Storage();

// Define the route for listing buckets
app.get("/buckets", async (req, res) => {
  try {
    // Get a list of buckets
    const [buckets] = await storage.getBuckets();

    // Extract bucket names
    const bucketNames = buckets.map((bucket) => bucket.name);

    // Send the bucket names as the response
    res.json(bucketNames);
  } catch (error) {
    console.error("Error listing buckets:", error);
    res.status(500).json({ error: "Unable to list buckets" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
