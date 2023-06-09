const inquirer = require('inquirer');
const { viewAllDepartments, addDepartment } = require('./lib/departmentActions'); 
const { viewAllEmployees, addEmployee, updateEmployeeRole } = require('./lib/employeeActions'); 
const { viewAllRoles, addRole} = require('./lib/roleActions'); 


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
                    'Add role',
                    'Quit', 
                ],
            },
        ])
    .then((answers) => {
        switch (answers.action) {
            case 'View all employees': 
                viewAllEmployees(); 
                break; 
            case 'Add employee':
                addEmployee(); 
                break; 
            case 'Update employee role': 
                updateEmployeeRole();
                break; 
            case 'View all roles': 
                viewAllRoles(); 
                break; 
            case 'Add role':
                addRole(); 
                break; 
            case 'View all departments': 
                viewAllDepartments(); 
                break; 
            case 'Add department': 
                addDepartment(); 
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

module.exports = { startApp }; 