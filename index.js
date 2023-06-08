const { startApp } = require('./app');
const figlet = require('figlet');

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


