const express = require('express');
const authController = require('../controllers/authController');
const authenticate = require('../middleware/authenticate'); // Assume you have an authentication middleware

const router = express.Router();

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authenticate, authController.logout);
router.post('/refresh-token', authController.refreshToken);
router.post('/forgot-password', authController.forgotPassword);
router.post('/reset-password/:token', authController.resetPassword);
router.post('/verify-email', authController.verifyEmail);
router.post('/change-password', authenticate, authController.changePassword);

module.exports = router;