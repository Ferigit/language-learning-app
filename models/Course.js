module.exports = (sequelize, DataTypes) => {
    const Course = sequelize.define('Course', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        description: {
            type: DataTypes.TEXT
        },
        language: {
            type: DataTypes.STRING,
            allowNull: false
        },
        level: {
            type: DataTypes.ENUM('beginner', 'intermediate', 'advanced'),
            allowNull: false
        },
        duration: {
            type: DataTypes.INTEGER,
            validate: {
                min: 1
            }
        }
    }, {
        tableName: 'Courses',
        timestamps: true
    });
    Course.associate = function(models) {
        Course.hasMany(models.Exercise, {
          foreignKey: 'courseId',
          as: 'exercises'
        });
      };
    return Course;
};

