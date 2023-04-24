const Item = require("../models/item.model")
const db = require("../db")

async function getAllItems() {
    return await Item.findAll();
}

async function getAllWhere(category_startswith) {
    return await Item.findAll({
        where: {
        category: {
            [sequalize.like]: `${category_startswith}%`
        }
        }
    });
}


module.exports = {
    getAllItems,
    getAllWhere
}