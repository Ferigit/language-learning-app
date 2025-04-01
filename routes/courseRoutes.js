const express = require('express');
const courseController = require('../controllers/courseController');

const router = express.Router();

// All routes here are relative to /api/v1
router.route('/courses')
  .get(courseController.getAllCourses)
  .post(courseController.createCourse);

router.route('/courses/:id')
  .get(courseController.getCourse)
  .patch(courseController.updateCourse)
  .delete(courseController.deleteCourse);

module.exports = router;