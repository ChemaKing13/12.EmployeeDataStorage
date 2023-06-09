const inquirer = require('inquirer');
const db = require('../db');
const { startApp } = require('../app'); 

// Function to view all departments
function viewAllDepartments() {
    db.viewAllDepartments((err, departments) => {
        if (err) {
            console.error('Error retrieving departments:', err); 
        } else {
            console.table(departments); 
        }
        
        startApp(); 
    }); 
}

// Function to add a department
function addDepartment() {
    inquirer
        .prompt([
            {
                type: 'input', 
                name: 'name', 
                message: 'Enter the department name:', 
                validate: (input) => {
                    if (input.trim() !== '') {
                        return true; 
                    }
                    return 'Please enter a valid department name.'; 
                },
            },
        ])
        .then((answers) => {
            const { name } = answers; 
            db.addDepartment(name, (err) => {
                if (err) {
                    console.error('Error adding department:', err); 
                } else {
                    console.log('Department added successfully!'); 
                }
                startApp(); 
            }); 
        })
        .catch((error) => {
            console.error('Error:', error); 
            startApp(); 
        }); 
}

// Export the functions to be used in other files
module.exports = {
  viewAllDepartments,
  addDepartment,
};
