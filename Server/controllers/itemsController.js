const Item = require("../models/item.model")
const ItemCategory = require("../models/item-category.model")
const Category = require("../models/category.model")

async function getAllItems() {
  return await Item.findAll({
    include: [{
      model: ItemCategory,
      include: [Category]
    }]
  });
}

async function getAllWhere(categoryName) {
  return await Item.findAll({
    include: [{
      model: ItemCategory,
      include: [{
        model: Category,
        where: {
          name: categoryName
        }
      }]
    }]
  });
}

module.exports = {
  getAllItems,
  getAllWhere
}
