const { Course } = require('../models');
const AppError = require('../utils/appError');

exports.getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.findAll();
    res.status(200).json({
      status: 'success',
      results: courses.length,
      data: { courses }
    });
  } catch (error) {
    next(error);
  }
};

exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findByPk(req.params.id);
    
    if (!course) {
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: { course }
    });
  } catch (error) {
    next(error);
  }
};

exports.createCourse = async (req, res, next) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json({
      status: 'success',
      data: { course }
    });
  } catch (error) {
    next(error);
  }
};

exports.updateCourse = async (req, res, next) => {
  try {
    const [updated] = await Course.update(req.body, {
      where: { id: req.params.id },
      returning: true,
      individualHooks: true
    });

    if (!updated) {
      return next(new AppError('No course found with that ID', 404));
    }

    const updatedCourse = await Course.findByPk(req.params.id);
    res.status(200).json({
      status: 'success',
      data: { course: updatedCourse }
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteCourse = async (req, res, next) => {
  try {
    const deleted = await Course.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      return next(new AppError('No course found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  } catch (error) {
    next(error);
  }
};