const express = require('express');
const authRoutes = require('./authRoutes');
const courseRoutes = require('./courseRoutes');
const exerciseRoutes = require('./exerciseRoutes');

const router = express.Router();

// Authentication routes
router.use('/auth', authRoutes);

// API v1 routes
router.use('/api/v1', courseRoutes);  // Handles /api/v1/courses
router.use('/api/v1', exerciseRoutes); // Handles /api/v1/courses/:courseId/exercises

module.exports = router;