const Sequelize = require('sequelize');
const sequelize = require('../db');
const Item = require("./item.model")
const User = require('./user.model');

class Reviews extends Sequelize.Model {}

Reviews.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  rating: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  reviewDescription: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'reviews',
});

User.hasMany(Item);
Reviews.belongsTo(User)
Reviews.belongsTo(Item);
Item.hasMany(Reviews);

module.exports = Reviews;
