const mysql = require('mysql2');

//Database class creates the connection with the database and other SQL query functions 
class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }

  //this function retrieves all employees form the employees table, it returns a promise that resolves with the query results 
  //an array of employee objects 
  getAllEmployees() {
    return new Promise((resolve, reject) => {
      this.connection.query('SELECT * FROM employee', (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
    
  }
  
  //this function insterst new employee into the  employee table
  addEmployee(employee) {
    return new Promise((resolve, reject) => {
      this.connection.query('INSERT INTO employee SET ?', employee, (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }
  //this function updates the role id of the employee 
  updateEmployeeRole(employeeId, roleId) {
    return new Promise((resolve, reject) => {
      this.connection.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employeeId], (error, results) => {
        if (error) reject(error);
        resolve(results);
      });
    });
  }
}

//database class is exported, allowing other files to use it 
module.exports = Database;
