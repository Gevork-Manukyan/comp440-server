const Sequelize = require('sequelize');
const sequelize = require('../db');
const Item = require("./item.model")
const ItemCategory = require("./item-category.model")

class Category extends Sequelize.Model {}

Category.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'category'
});

Category.belongsToMany(Item, { through: ItemCategory });
Item.belongsToMany(Category, { through: ItemCategory });

Category.beforeValidate((category, options) => {
    category.name = category.name.toLowerCase();
  });

module.exports = Category;
