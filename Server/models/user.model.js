const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

class User extends Sequelize.Model {}

User.init({
  username: {
    type: Sequelize.STRING,
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
}, {
  sequelize,
  modelName: 'user'
});

module.exports = User;
