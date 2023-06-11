const inquirer = require('inquirer');
const db = require('../db');

// Function to view all roles
function viewAllRoles() {
  return new Promise((resolve, reject) => {
    db.viewAllRoles((err, roles) => {
      if (err) {
        console.error('Error retrieving roles:', err);
        reject(err);
      } else {
        if (roles != undefined && roles.length > 0) {
          console.table(roles);
        } else {
          console.log('No roles found.');
        }
        resolve();
      }
    });
  })
  .then(() => {
  })
  .catch((error) => {
    console.error('Error:', error);
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
        message: 'Enter the role salary:',
        validate: (input) => {
          if (!isNaN(input) && input >= 0) {
            return true;
          }
          return 'Please enter a valid salary';
        },
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'Select the department for the role:',
        choices: () => {
          return new Promise((resolve, reject) => {
            db.viewAllDepartments((err, departments) => {
              if (err) {
                console.error('Error retrieving departments:', err);
                reject(err);
              } else {
                const choices = departments.map((department) => ({
                  name: department.name,
                  value: department.id,
                }));
                resolve(choices);
              }
            });
          });
        },
      },
    ])
    .then((answers) => {
      const { title, salary, departmentId } = answers;
      return new Promise((resolve, reject) => {
        db.addRole(title, salary, departmentId, (err) => {
          if (err) {
            console.error('Error adding role:', err);
            reject(err);
          } else {
            console.log('Role added successfully!');
            resolve();
          }
        });
      });
    })
    .then(() => {
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Export the functions to be used in other files
module.exports = {
  viewAllRoles,
  addRole,
};



