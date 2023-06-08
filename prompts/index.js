const inquirer = require('inquirer');
const departmentActions = require('../lib/departmentActions'); 
const employeeActions = require('../lib/employeeActions'); 
const roleActions = require('../lib/roleActions'); 

function startApp() {
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'action',
                message: 'What would you like to do?', 
                choices: [
                    'View all employees',
                    'Add employee', 
                    'Update employee role', 
                    'View all roles', 
                    'View all departments', 
                    'Add department', 
                    'Quit', 
                ],
            },
        ])
    .then((answers) => {
        switch (answers.action) {
            case 'View all employers': 
                break; 
            case 'Add employee':
                break; 
            case 'Update employee role': 
                break; 
            case 'View all roles': 
                break; 
            case 'Add role':
                break; 
            case 'View all departments': 
                break; 
            case 'Add department': 
                break; 
            case 'Quit': 
                console.log('Goodbye!'); 
                process.exit(0);  
        }
    })
    .catch((error) => {
        console.error('Error:', error); 
    }); 
}

startApp(); 