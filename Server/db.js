const mysql = require('mysql2')

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Manukyan11@',
  database: 'comp440-db'
})

db.connect((err) => {
  if (err) throw err
  console.log("Connected to Database!")
})

// db.query('SELECT * FROM course', (err, result, fields) => {
//   if (err) throw err

//   console.log('The solution is: ', result)
// })

// connection.end()

module.exports = db