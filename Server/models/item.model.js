const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user.model');

class Item extends Sequelize.Model {}

Item.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    datePosted: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
}, {
  sequelize,
  modelName: 'items'
});

User.hasMany(Item);
Item.belongsTo(User);

module.exports = Item;
