const Sequelize = require('sequelize');

const sequelize = new Sequelize('comp440', 'root', 'Manukyan11@', {
  host: 'localhost',
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


// const mysql = require('mysql2')

// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Manukyan11@',
//   database: 'comp440'
// })

// db.connect((err) => {
//   if (err) throw err
//   console.log("Connected to Database!")
// })

// db.query('SELECT * FROM course', (err, result, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', result)
// })

// connection.end()

// module.exports = db