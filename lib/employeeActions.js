const { startApp } = require('../app'); 
const inquirer = require('inquirer');
const role = [];
const managers = []; 
const db = require('../db')

// Function to view all employees
function viewAllEmployees() {
  db.viewAllEmployees((err, employees) => {
    if (err) {
      console.error('Error retrieving employees:', err); 
    } else {
      console.table(employees); 
    }
    startApp(); 
  }); 
}

// Function to add an employee
function addEmployee() {
  
  db.viewAllRoles((err, roles) => {
    if (err) {
      console.error('Error retrieveing roles:', err); 
      startApp(); 
      return;
    }

    db.viewAllManagers((err, managers) => {
      if (err) {
        console.error('Error retrieving managers:', err); 
        startApp();
        return; 
      }
    })

    inquirer
      .prompt([
        {
          type: 'input', 
          name: 'first_name',
          message: "Enter the employee's first name", 
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
          message: "Enter the employee's last name", 
          validate: (input) => {
            if (input.trim() !== '') {
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
          message: "Selecet the employee's manager", 
          choices: [
            { name: 'None', value: null}, 
            ...managers.map((manager) => ({
              name: `${manager.first_name} ${manager.last_name}`, 
              value: manager.id,
            })),
          ],
        },
      ])
      .then((answers) => {
        const { first_name, last_name, role_id, manager_id } = answers; 

        db.addEmployee(first_name, last_name, role_id, manager_id, (err) => {
          if (err) {
            console.error('Error adding employee:', err); 
          } else {
            console.log('Employee added successfully!'); 
          }
          startApp(); 
        }); 
      })
      .catch((error) => {
        console.error('Error:', error); 
        startApp(); 
      }); 
  }); 
}



// Function to update an employee's role
function updateEmployeeRole() {
  db.viewAllEmployees((err, employees) => {
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

        db.viewAllRoles((err, roles) => {
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
