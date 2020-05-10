DROP DATABASE IF EXISTS employee_tracker;

CREATE DATABASE employee_tracker;
USE employee_tracker;

CREATE TABLE department(
 id INTEGER(11) NOT NULL AUTO_INCREMENT,  
 name VARCHAR(30) NULL,
 PRIMARY KEY (id)
)

CREATE TABLE role(
  id INTEGER(11) NOT NULL AUTO_INCREMENT, 
  title VARCHA(30) NULL,
  yearly_salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) REFERENCES department(DepId)
  PRIMARY KEY (id)
)

CREATE TABLE employee(
  id INTEGER(11) NOT NULL AUTO_INCREMENT, 
  first_name(30) NULL,
  last_name(30) NULL,
  role_id INT NOT NULL,
  manager_id INT,
  FOREIGN KEY (role_id) REFERENCES role(roleId)
  -- FOREIGN KEY (manager_id) REFERANCES role(roleId)
  PRIMARY KEY (id)
)
