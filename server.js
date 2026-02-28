const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Load environment variables
require('./config/db'); // Initialize DB connection

// Import routes
const userRoutes = require('./routes/UserRoutes'); 

const app = express();
const port = process.env.PORT || 8001; // Use PORT from .env or default to 8001

// Middleware
app.use(cors()); // Allow requests from other origins
app.use(express.json()); // Parse JSON bodies

// // Register route handlers
app.use('/', userRoutes);        

// 404 Not Found handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler (fallback for any server errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
