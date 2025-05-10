
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const blogRoutes = require('../routes/blog');

// Configure app to use blog routes
function setupBlogRoutes(app) {
  app.use('/api/blog', blogRoutes);
  console.log("Blog routes registered");
}

module.exports = setupBlogRoutes;
