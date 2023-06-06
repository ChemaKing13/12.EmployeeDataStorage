const inquirer = require('inquirer');
const mysql = require('mysql');
const Database = require('./db/queries');

require('dotenv').config(); 

const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

const db = new Database(dbConfig);

function promptUser() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: ['View all employees', 'Add employee', 'Update employee role', 'Exit'],
      },
    ])
    .then((answers) => {
      switch (answers.action) {
        case 'View all employees':
          db.getAllEmployees()
            .then((results) => {
              console.table(results);
              promptUser();
            })
            .catch((error) => {
              console.error(error);
              promptUser();
            });
          break;
        case 'Add employee':
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'firstName',
                message: "Enter the employee's first name:",
              },
              {
                type: 'input',
                name: 'lastName',
                message: "Enter the employee's last name:",
              },
              // Add more prompts for other employee details
            ])
            .then((employeeData) => {
              const employee = {
                first_name: employeeData.firstName,
                last_name: employeeData.lastName,
                // Assign other properties based on prompts
              };

              db.addEmployee(employee)
                .then((result) => {
                  console.log('Employee added successfully!');
                  promptUser();
                })
                .catch((error) => {
                  console.error(error);
                  promptUser();
                });
            });
          break;
        case 'Update employee role':
          // Prompt for employee ID and new role ID
          inquirer
            .prompt([
              {
                type: 'input',
                name: 'employeeId',
                message: "Enter the ID of the employee:",
              },
              {
                type: 'input',
                name: 'roleId',
                message: "Enter the new role ID for the employee:",
              },
            ])
            .then((inputData) => {
              const employeeId = parseInt(inputData.employeeId);
              const roleId = parseInt(inputData.roleId);

              db.updateEmployeeRole(employeeId, roleId)
                .then((result) => {
                  console.log('Employee role updated successfully!');
                  promptUser();
                })
                .catch((error) => {
                  console.error(error);
                  promptUser();
                });
            });
          break;
        case 'Exit':
          console.log('Goodbye!');
          break;
      }
    });
}

promptUser();