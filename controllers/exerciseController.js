const { Exercise, Course } = require('../models');
const AppError = require('../utils/appError');

exports.getExercisesForCourse = async (req, res, next) => {
    try {
        const exercises = await Exercise.findAll({
            where: { courseId: req.params.courseId },
            include: [{
                model: Course,
                as: 'course',
                attributes: ['id', 'title']
            }]
        });

        res.status(200).json({
            status: 'success',
            results: exercises.length,
            data: { exercises }
        });
    } catch (error) {
        next(error);
    }
};

exports.submitExercise = async (req, res, next) => {
    try {
        const exercise = await Exercise.findByPk(req.params.exerciseId, {
            include: [{
                model: Course,
                as: 'course',
                where: { id: req.params.courseId }
            }]
        });

        if (!exercise) {
            return next(new AppError('No exercise found with that ID', 404));
        }

        const isCorrect = req.body.answer === exercise.correctAnswer;
        const score = isCorrect ? 1 : 0;

        // In a real app, you'd save the user's attempt to a Progress table
        // await Progress.create({
        //   userId: req.user.id,
        //   exerciseId: exercise.id,
        //   score,
        //   attempts: 1
        // });

        res.status(200).json({
            status: 'success',
            data: {
                isCorrect,
                correctAnswer: exercise.correctAnswer,
                explanation: exercise.explanation,
                score
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.createExercise = async (req, res, next) => {
    try {
        const course = await Course.findByPk(req.params.courseId);
        if (!course) {
            return next(new AppError('No course found with that ID', 404));
        }

        const exercise = await Exercise.create({
            ...req.body,
            courseId: req.params.courseId
        });

        res.status(201).json({
            status: 'success',
            data: { exercise }
        });
    } catch (error) {
        next(error);
    }
};
