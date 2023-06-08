const { startApp } = require('./app'); //imports the startApp function from app.js
const figlet = require('figlet'); //imports the figlet module, that will generate the ASCCI art

// Function to display the project name as ASCII art
function displayProjectName() {
  const projectName = 'EmployeeData';

  figlet(projectName, function (err, data) {
    if (err) {
      console.log('Error occurred while generating ASCII art:', err);
      return;
    }
    console.log(data);
    console.log('\n');
    startApp(); // Call the startApp function after displaying the project name
  });
}

// Call the displayProjectName function
displayProjectName();


