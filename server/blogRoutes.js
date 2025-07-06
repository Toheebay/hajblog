
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('../routes/blog');

// Configure app to use blog routes
function setupBlogRoutes(app) {
  // Enable CORS for blog routes
  app.use('/api/blog', cors());
  app.use('/api/blog', blogRoutes);
  console.log("Blog routes registered at /api/blog");
}

module.exports = setupBlogRoutes;
