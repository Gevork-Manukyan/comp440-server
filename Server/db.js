const DATABASE_NAME = process.env.DATABASE_NAME
const DATABASE_USERNAME = process.env.DATABASE_USERNAME
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD
const DATABASE_HOST = process.env.DATABASE_HOST

const Sequelize = require('sequelize');

const sequelize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: 'mysql'
});

sequelize.sync()
  .then(() => {
    console.log('Users table created');
  })
  .catch((error) => {
    console.error(error);
  });

module.exports = sequelize;