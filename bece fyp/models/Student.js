const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  registration_number: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  middle_name: {
    type: DataTypes.STRING(50)
  },
  dob: {
    type: DataTypes.DATEONLY
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other')
  },
  class_level: {
    type: DataTypes.ENUM('JSS 1', 'JSS 2', 'JSS 3'),
    allowNull: false
  },
  photo: {
    type: DataTypes.STRING(255)
  },
  address: {
    type: DataTypes.TEXT
  },
  parent_contact: {
    type: DataTypes.STRING(20)
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = Student;