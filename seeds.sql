-- Insert records into the department table
INSERT INTO department (id, name) VALUES
(1, 'Engineering'),
(2, 'Product Development'),
(3, 'Information Technology'),
(4, 'Quality Assurance');

-- Insert records into the role table
INSERT INTO role (id, title, salary, department_id) VALUES
(1, 'Software Engineer', 80000, 1),
(2, 'Product Manager', 90000, 2),
(3, 'System Administrator', 70000, 3),
(4, 'Quality Assurance Analyst', 60000, 4);

-- Insert records into the employee table
INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(1, 'Michael', 'Jordan', 1, NULL),
(2, 'Odell', 'Beckham', 2, 1),
(3, 'Mike', 'Wallace', 3, 1),
(4, 'Tom', 'Brady', 4, 2);
