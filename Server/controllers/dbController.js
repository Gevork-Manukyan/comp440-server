const sequelize = require("../db");

const initDB = () => {
    sequelize.sync({ force: true })
    .then(() => {
      console.log('Users table created');
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = {
    initDB
}