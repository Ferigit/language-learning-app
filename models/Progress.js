const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Progress = sequelize.define('Progress', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    exerciseId: {
      type: DataTypes.UUID,
    },
    score: {
      type: DataTypes.FLOAT,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    timeSpent: {
      type: DataTypes.INTEGER, // in seconds
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  }, {
    timestamps: false, // Disable timestamps if not needed
  });

  Progress.associate = (models) => {
    Progress.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
    Progress.belongsTo(models.Course, { foreignKey: 'courseId', as: 'course' });
    Progress.belongsTo(models.Exercise, { foreignKey: 'exerciseId', as: 'exercise' });
  };

  return Progress;
}; 