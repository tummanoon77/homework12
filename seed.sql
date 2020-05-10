DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
 Depid INT PRIMARY KEY AUTO_INCREMENT,  
 name VARCHAR(30) NULL
 
);

CREATE TABLE role(
  Roleid INT PRIMARY KEY AUTO_INCREMENT, 
  title VARCHAR (30) NULL,
  yearly_salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(DepId)
);

CREATE TABLE employee(
  Employee_id INT PRIMARY KEY AUTO_INCREMENT, 
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(RoleId)
  -- FOREIGN KEY (manager_id) REFERANCES role(roleId)

);

INSERT INTO department(name) VALUE ("IT");
INSERT INTO department(name) VALUE ("HR");
INSERT INTO department(name) VALUE ("Accounting");
INSERT INTO department(name) VALUE ("Engineer");
INSERT INTO department(name) VALUE ("Sales");


INSERT INTO role(title, yearly_salary, department_id) VALUES
("Financial Advisor", "65000", "3"),
("Technicial Support", "60000" , "1"),
("Accountant", "75000","3"),
("Software Engineer","85000","4"),
("Management","67000","2"),
("HR Analyst","87500","2"),
("Electric Engineer","99900","4"),
("Sales Director","85000","5"),
("Sales Analyst","75000","5"),
("Sales Trainer","70000","5"),
("Civil Engineer", "105000","4"),
("Mechanic Engineer","110000","4"),
("IT Manager","85000","1"),
("IT programer","98000","1"),
("IT Specialist", "115000","1"),
("Auditor","99900","3"),
("HR Trainer","85000","2"),
("Representative","50000","2"),
("Financial Analyst","75000","3"),
("Sales Person","50000","5");

INSERT INTO employee(first_name, last_name, role_id) VALUES
("John","Doe","2"),
("Asley","Young","1"),
("Tom","Hank","3"),
("Mike","Tyson","4"),
("Marco","Rudy","5"),
("Steven","Chin","6"),
("Taylor","Swift","7"),
("Elizabet", "Taylor","8"),
("Jenifer","Lee","9"),
("Marcus","Roy", "10"),
("Nicole","Kidman","11");
  

