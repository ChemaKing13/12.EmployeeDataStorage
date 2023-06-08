const dbConnection = require('./config/connection'); 

//function to retrieve all departments
function getAllDepartments(callback) {
    dbConnection.query('Select * FROM department', callback); 
}

//function to add department
function addDepartment(name, callback) {
    dbConnection.query('INSERT INTO department (name) VALUES (?)', [name], callback)
}

//function to retrieve all employees 
function getAllEmployees(callback) {
    dbConnection.query('SELECT * FROM employee', callback); 
}

function addEmployee(first_name, last_name, role_id, manager_id, callback) {
    dbConnection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        [first_name, last_name, role_id, manager_id], 
        callback
    ); 
}

//function to retrieve all roles 
function getAllRoles(callback) {
    dbConnection.query('Select * FROM role', callback); 
}

//function to add a role
function addRole(title, salary, departmentId, callback) {
    dbConnection.query(
        'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', 
        [title, salary, departmentId], 
        callback
    ); 
}

module.exports = {
    getAllDepartments, 
    addDepartment,
    getAllEmployees, 
    addEmployee,
    getAllRoles,
    addRole,
}; 