const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Reviews = sequelize.define('Review', {
  // Replace this with the actual primary key column name and data type
  rating: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reviewDescription: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'reviews',
  timestamps: false,
});

module.exports = Reviews;
