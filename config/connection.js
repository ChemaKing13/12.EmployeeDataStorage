const mysql = require('mysql2');
require('dotenv').config();

const dbConnection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: '12345678',
  database: 'employee_db',
  port: 3306
});

dbConnection.connect((error) => {
  if (error) {
    console.error('Error connecting to database:', error);
  } else {
    console.log('Connected to employee_db.');
  }
});

module.exports = {
  dbConnection
};

