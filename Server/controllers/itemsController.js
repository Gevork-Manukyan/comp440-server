const ItemCategory = require("../models/item-category.model")
const Item = require("../models/item.model")
const Category = require("../models/category.model");
const sequelize = require("../db");

async function getAllItems() {
  const items = await Item.findAll({
    attributes: ['id', 'title', 'description', 'datePosted', 'price'],
    include: [
      {
        model: Category,
        attributes: ['category'],
        through: {
          attributes: []
        }
      }
    ]
  });

  const result = items.map(item => {
    const itemData = item.toJSON();
    itemData.categories = itemData.categories.map(category => category.category);
    return itemData;
  });

  return result;
}


async function getAllWhere(categoryName) {
  return await Item.findAll({
    include: [{
      model: ItemCategory,
      include: [{
        model: Category,
        where: {
          category: categoryName
        }
      }]
    }]
  });
}

module.exports = {
  getAllItems,
  getAllWhere
}
