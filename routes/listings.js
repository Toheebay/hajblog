
const express = require('express');
const router = express.Router();
const Listing = require('../models/Listing');

// Get all listings
router.get('/', async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single listing
router.get('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create listing
router.post('/', async (req, res) => {
  const listing = new Listing({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    image: req.body.image,
    category: req.body.category,
    location: req.body.location,
    seller: req.body.seller
  });

  try {
    const newListing = await listing.save();
    res.status(201).json(newListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update listing
router.patch('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    
    if (req.body.title) listing.title = req.body.title;
    if (req.body.price !== undefined) listing.price = req.body.price;
    if (req.body.description) listing.description = req.body.description;
    if (req.body.image) listing.image = req.body.image;
    if (req.body.category) listing.category = req.body.category;
    if (req.body.location) listing.location = req.body.location;
    
    const updatedListing = await listing.save();
    res.json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete listing
router.delete('/:id', async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: 'Listing not found' });
    
    await listing.remove();
    res.json({ message: 'Listing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
