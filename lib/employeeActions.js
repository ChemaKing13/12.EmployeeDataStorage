const inquirer = require('inquirer');
const { startApp } = require('../prompts/app'); 
const roles = []; 
const managers = []; 
const db = require('../db')

// Function to view all employees
function viewAllEmployees() {
  db.query('SELECT * FROM employee', (err, employee) => {
    if (err) {
      console.error('Error retrieving employees:', err); 
    } else {
      console.table(employee); 
    }
    startApp(); 
  }); 
  // Implement the logic to retrieve all employees from the database using the appropriate function from the db.js file
}

// Function to add an employee
function addEmployee() {
  inquirer
    .prompt([
      {
        type: 'input', 
        name: 'first_name', 
        message: "Enteer the employee first name:", 
        validate: (input) => {
          if (input.trim() !== '') {
            return true; 
          }
          return 'Please enter a valid first name'; 
        },
      },
      {
        type: 'input', 
        name: 'last_name', 
        message: 'Enter the employee last name:', 
        validate: (input) => {
          if (input.trim() != '') {
            return true; 
          }
          return 'Please enter a valid last name'; 
        }, 
      },
      {
        type: 'list', 
        name: 'role_id',
        message: "Select the employee's role", 
        choices: roles.map((role) => ({
          name: role.title, 
          value: role.id, 
        })), 
      }, 
      {
        type: 'list', 
        name: 'manager_id', 
        message: "Select the employee's manager", 
        choices: [
          { name: 'None', value: null }, 
          ...managers.map((manager) => ({
            name: `${manager.first_name} ${manager.last_name}`, 
            value: manager.id, 
          })),
        ],
      },
    ])
    .then((answers) => {
      const { first_name, last_name, role_id, manager_id } = answers; 
      db.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        [first_name, last_name, role_id, manager_id], 
        (err) => {
          if (err) {
            console.error('Error adding employee:', err); 
          } else {
            console.log('Employee added successfully!'); 
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

// Function to update an employee's role
function updateEmployeeRole() {
  db.getAllEmployees((err, employees) => {
    if (err) {
      console.error('Error retrieving employees:', err);
      startApp();
      return;
    }

    inquirer
      .prompt([
        {
          type: 'list',
          name: 'employeeId',
          message: 'Select the employee to update:',
          choices: employees.map((employee) => ({
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          })),
        },
      ])
      .then((answers) => {
        const { employeeId } = answers;

        db.getAllRoles((err, roles) => {
          if (err) {
            console.error('Error retrieving roles:', err);
            startApp();
            return;
          }

          inquirer
            .prompt([
              {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role for the employee:',
                choices: roles.map((role) => ({
                  name: role.title,
                  value: role.id,
                })),
              },
            ])
            .then((answers) => {
              const { roleId } = answers;

              db.updateEmployeeRole(employeeId, roleId, (err) => {
                if (err) {
                  console.error('Error updating employee role:', err);
                } else {
                  console.log('Employee role updated successfully!');
                }
                startApp();
              });
            })
            .catch((error) => {
              console.error('Error:', error);
              startApp();
            });
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        startApp();
      });
  });
}


// Export the functions to be used in other files
module.exports = {
  viewAllEmployees,
  addEmployee,
  updateEmployeeRole,
};
