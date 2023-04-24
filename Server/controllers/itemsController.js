const ItemCategory = require("../models/item-category.model")
const Item = require("../models/item.model")
const Category = require("../models/category.model");
const sequelize = require("../db");

async function getAllItems() {
  const result = await sequelize.query(`
  SELECT title, description, datePosted, price, userUsername, category FROM items
  JOIN itemCategories ON items.id = itemCategories.itemId
  JOIN categories ON categories.id = itemCategories.categoryId
  `)

  console.log(result)
  return result
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
