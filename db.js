const { dbConnection } = require('./config/connection'); 

//function to retrieve all departments
function viewAllDepartments(callback) {
    dbConnection.query('Select * FROM department', callback); 
}

//function to add department
function addDepartment(name, callback) {
    dbConnection.query('INSERT INTO department (name) VALUES (?)', [name], callback)
}

//function to retrieve all employees 
function viewAllEmployees(callback) {
    dbConnection.query('SELECT * FROM employee', callback); 
}

//function to add an employee
function addEmployee(first_name, last_name, role_id, manager_id, callback) {
    dbConnection.query(
        'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', 
        [first_name, last_name, role_id, manager_id], 
        callback
    ); 
}

// Function to update an employee's role
function updateEmployeeRole(employeeId, roleId, callback) {
    dbConnection.query(
      'UPDATE employee SET role_id = ? WHERE id = ?',
      [roleId, employeeId],
      callback
    );
}
  

//function to retrieve all roles 
function viewAllRoles(callback) {
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
// Function to retrieve all managers
function viewAllManagers(callback) {
    dbConnection.query(
      'SELECT id, first_name, last_name FROM employee WHERE manager_id IS NULL',
      callback
    );
}

function getManagersForEmployees(employeeIds, callback) {
    const query = `
      SELECT e.id, e.first_name, e.last_name, m.id AS manager_id, m.first_name AS manager_first_name, m.last_name AS manager_last_name
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      WHERE e.id IN (${employeeIds.map(() => '?').join(',')})
    `;
    const values = [...employeeIds];
  
    dbConnection.query(query, values, (err, results) => {
      if (err) {
        callback(err);
        return;
      }
  
      const managers = results.map((row) => ({
        id: row.manager_id,
        first_name: row.manager_first_name,
        last_name: row.manager_last_name,
      }));
  
      callback(null, managers);
    });
  }
    
module.exports = {
    viewAllDepartments,
    addDepartment,
    viewAllEmployees,
    updateEmployeeRole,
    addEmployee,
    viewAllRoles,
    addRole,
    viewAllManagers,
    getManagersForEmployees,
};