const ItemCategory = require("../models/item-category.model")
const Item = require("../models/item.model")
const Category = require("../models/category.model");
const sequelize = require("../db");
const Sequelize = require('sequelize');
const userController = require('./userController')
const { Op } = require('sequelize');

async function getAllItems() {
  const items = await Item.findAll({
    attributes: ['id', 'title', 'description', 'datePosted', 'price', 'userUsername'],
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
    itemData.categories = itemData.categories.map(category => category.category).join(", ");
    return itemData;
  });

  return result;
}


async function getAllWhere(categoryName) {
  const items = await Item.findAll({
    attributes: ['id', 'title', 'description', 'datePosted', 'price', 'userUsername'],
    include: [
      {
        model: Category,
        attributes: ['category'],
        through: {
          attributes: []
        },
        where: {
          category: categoryName
        }
      }
    ]
  });

  const result = items.map(item => {
    const itemData = item.toJSON();
    itemData.categories = itemData.categories.map(category => category.category).join(", ");
    return itemData;
  });

  return result 
}

async function postItem(username, itemData) {

  // Create a new item record in the database
  const newItem = await Item.create({
    title: itemData.title,
    description: itemData.description,
    price: itemData.price,
    userUsername: username
  });


  // Find or create the categories for the item
  const categories = await Promise.all(
    itemData.category.map((cat) =>
      Category.findOrCreate({
        where: { category: cat.trim().toLowerCase() }
      })
    )
  );

  // Associate the categories with the new item using the ItemCategory join table
  await newItem.setCategories(categories.map((cat) => cat[0]));

  // Return the newly created item
  return newItem;
}

async function getExpensiveItemsByCategory() {
  const result = await sequelize.query(`
  SELECT c.category, i.title as item, i.price
  FROM categories c
  LEFT JOIN itemCategories ic ON c.id = ic.categoryId
  LEFT JOIN items i ON ic.itemId = i.id
  WHERE i.price = (SELECT MAX(price) FROM items WHERE id IN (SELECT itemId FROM itemCategories WHERE categoryId = c.id));
`)

  return result[0]
}



module.exports = {
  getAllItems,
  getAllWhere,
  postItem,
  getExpensiveItemsByCategory
}
