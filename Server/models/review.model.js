const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const Item = require("./item.model")

const Reviews = sequelize.define('Review', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
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

Reviews.belongsTo(Item);
Item.hasMany(Reviews);

module.exports = Reviews;
