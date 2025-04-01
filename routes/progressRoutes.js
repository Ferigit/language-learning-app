const express = require('express');
const progressController = require('../controllers/progressController');
const authenticate = require('../middleware/authenticate');

const router = express.Router();

router.post('/enroll', authenticate, progressController.enrollInCourse);
router.get('/my-progress', authenticate, progressController.getMyProgress);

module.exports = router; 