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
  
  PRIMARY KEY (id)
)
