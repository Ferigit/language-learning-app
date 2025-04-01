const express = require('express');
const exerciseController = require('../controllers/exerciseController');

const router = express.Router();

// All routes here are relative to /api/v1
router.route('/courses/:courseId/exercises')
  .get(exerciseController.getExercisesForCourse)
  .post(exerciseController.createExercise);

router.route('/courses/:courseId/exercises/:exerciseId/submit')
  .post(exerciseController.submitExercise);

module.exports = router;