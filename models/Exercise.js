module.exports = (sequelize, DataTypes) => {
    const Exercise = sequelize.define('Exercise', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        type: {
            type: DataTypes.ENUM(
                'vocabulary',
                'grammar',
                'listening',
                'speaking',
                'reading',
                'writing'
            ),
            allowNull: false
        },
        question: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        options: {
            type: DataTypes.JSONB
        },
        correctAnswer: {
            type: DataTypes.STRING
        },
        explanation: {
            type: DataTypes.TEXT
        },
        difficulty: {
            type: DataTypes.ENUM('easy', 'medium', 'hard'),
            defaultValue: 'medium'
        },
        aiGenerated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, {
        tableName: 'Exercises',
        timestamps: true
    });

    Exercise.associate = function (models) {
        Exercise.belongsTo(models.Course, {
            foreignKey: 'courseId',
            as: 'course'
        });
    };
    return Exercise;
};