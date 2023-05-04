const Sequelize = require('sequelize');
const sequelize = require('../db');
const User = require('./user.model');

class FavoriteUsers extends Sequelize.Model {}

FavoriteUsers.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    }
  },
  favoritedUser: {
    type: Sequelize.STRING,
    allowNull: false,
    references: {
      model: User,
      key: 'username'
    }
  }
}, {
  sequelize,
  modelName: 'favoriteUsers'
});

module.exports = FavoriteUsers;
