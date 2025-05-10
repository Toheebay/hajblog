
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Import Routes
const listingRoutes = require('./routes/listings');
const blogRoutes = require('./routes/blog');
const donationRoutes = require('./routes/donations');
const userRoutes = require('./routes/users');

// Use Routes
app.use('/api/listings', listingRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/donations', donationRoutes);
app.use('/api/users', userRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('MarketChat API is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
