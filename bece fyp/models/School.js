const { DataTypes } = require('sequelize');
const sequelize = require('./db');

const School = sequelize.define('School', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT
  },
  lga: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  center_number: {
    type: DataTypes.STRING(20)
  },
  principal_name: {
    type: DataTypes.STRING(100)
  },
  principal_phone: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(100)
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    defaultValue: 'active'
  }
}, {
  timestamps: true,
  underscored: true
});

module.exports = School;