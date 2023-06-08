-- Insert records into the department table
INSERT INTO department (name) 
VALUES  ('Engineering'),
        ('Product Development'),
        ('Information Technology'),
        ('Quality Assurance');

-- Insert records into the role table
INSERT INTO role (title, salary, department_id) VALUES
('Software Engineer', 80000, 1),
('Product Manager', 90000, 2),
('System Administrator', 70000, 3),
('Quality Assurance Analyst', 60000, 4);

-- Insert records into the employee table
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Michael', 'Jordan', 1, NULL),
('Odell', 'Beckham', 2, 1),
('Mike', 'Wallace', 3, 1),
('Tom', 'Brady', 4, 2);
