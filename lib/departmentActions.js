const inquirer = require('inquirer');
const db = require('../db');


// Function to view all departments
function viewAllDepartments() {
    db.viewAllDepartments((err, departments) => {
        if (err) {
            console.error('Error retrieving departments:', err); 
        } else {
            console.table(departments); 
        }
    }); 
    return; 
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
            }); 
        })
        .catch((error) => {
            console.error('Error:', error);  
        }); 
}

// Export the functions to be used in other files
module.exports = {
  viewAllDepartments,
  addDepartment,
};
