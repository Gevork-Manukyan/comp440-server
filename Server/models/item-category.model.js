const Sequelize = require('sequelize');
const sequelize = require('../db');
const Category = require('./category.model')
const Item = require('./item.model')

class ItemCategory extends Sequelize.Model {}

ItemCategory.init({
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Item,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  categoryId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  sequelize,
  modelName: 'itemCategory',
  timestamps: false
});

module.exports = ItemCategory;
