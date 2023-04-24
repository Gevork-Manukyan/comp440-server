const Sequelize = require('sequelize');
const sequelize = require('../db');

class Category extends Sequelize.Model {}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'category'
});

Category.beforeValidate((category, options) => {
    category.category = category.category.toLowerCase();
  });

module.exports = Category;
