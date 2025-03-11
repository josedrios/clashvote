const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware

app.use(
  cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);
app.use(express.json());

// Connect to MongoDB
connectDB();

// Load Routes
app.use('/api/auth', require('./routes/authRoutes')); // User Authentication related routes
app.use('/api/user', require('./routes/userRoutes')); // General user related routes
app.use('/api/clash', require('./routes/clashRoutes')); // Clash of Clans API related routes

// Middleware (Error Handling)
app.use(require('./middleware/errorHandler'));

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
