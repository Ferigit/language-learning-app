const { Progress, Course, User } = require('../models');
const AppError = require('../utils/appError');

exports.enrollInCourse = async (req, res, next) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    const course = await Course.findByPk(courseId);
    if (!course) {
      return next(new AppError('Course not found', 404));
    }

    const progress = await Progress.create({
      userId,
      courseId,
      completed: false,
      attempts: 0,
      timeSpent: 0,
    });

    res.status(201).json({
      status: 'success',
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
};

exports.getMyProgress = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const progress = await Progress.findAll({
      where: { userId },
      include: [
        {
          model: Course,
          as: 'course',
          attributes: ['id', 'title'],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      results: progress.length,
      data: { progress },
    });
  } catch (error) {
    next(error);
  }
}; 