const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const Database = require('./queries');

const app = express(); 


const PORT = process.env.PORT || 3001;


require('dotenv').config();

const db = mysql.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the employees_db database.');

  const database = new Database(db);

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
            database
              .getAllEmployees()
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

                database
                  .addEmployee(employee)
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

                database
                  .updateEmployeeRole(employeeId, roleId)
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
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); 
})