const jwt = require('jsonwebtoken');

/**
 * Sign an access token
 * @param {string} userId - The user ID
 * @returns {string} - The signed JWT access token
 */
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_ACCESS_EXPIRATION,
  });
};

/**
 * Sign a refresh token
 * @param {string} userId - The user ID
 * @returns {string} - The signed JWT refresh token
 */
const signRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRATION,
  });
};

module.exports = {
  signToken,
  signRefreshToken,
}; 