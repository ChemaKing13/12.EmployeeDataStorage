const inquirer = require('inquirer');
const db = require('../db');
const { startApp } = require('../app'); 

// Function to view all roles
function viewAllRoles() {
  db.query('SELECT * FROM role', (err, roles) => {
    if (err) {
      console.error('Error retrieving roles:', err); 
    } else {
      console.table(roles); 
    }
    startApp(); 
  }); 
}

// Function to add a role
function addRole() {
  inquirer 
    .prompt([
      {
        type: 'input', 
        name: 'title', 
        message: 'Enter the role title:', 
        validate: (input) => {
          if (input.trim() !== '') {
            return true; 
          } 
          return 'Please enter a valid role title'; 
        },
      },
      {
        type: 'number', 
        name: 'salary', 
        message: 'Enter the role salary', 
        validate: (input) => {
          if (!isNaN(input) && input >= 0) {
            return true; 
          }
          return 'Please enter a valid salary'; 
        },
      },
      {
        type: 'list', 
        name: 'department_id', 
        message: 'Select the department for the role:', 
        choices: () => {
          const departments = db.viewAllDepartments(); 
          return departments.map((department) => ({
            name: department.name, 
            value: department.id,
          }));
        },
      },
    ])
    .then((answers) => {
      const { title, salary, department_id } = answers; 
      db.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
        [title, salary, department_id],
        (err) => {
          if (err) {
            console.error('Error adding role:', err); 
          } else {
            console.log('Role added successfully!'); 
          }
          startApp(); 
        }
      );
    })
    .catch((error) => {
      console.error('Error:', error); 
      startApp(); 
    }); 
}

// Export the functions to be used in other files
module.exports = {
  viewAllRoles,
  addRole,
};
