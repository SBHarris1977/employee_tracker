--creating the database
DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

--Create the department table
CREATE TABLE department (
departmentId INTEGER AUTO_INCREMENT NOT NULL,
name VARCHAR(30) NOT NULL,
PRIMARY KEY(departmentId)

);

--create the role table with the department.departmentId(table.column) as the foreign key
CREATE TABLE role (
    roleId INT AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(8,2) NOT NULL,
    departmentId INT,
    PRIMARY KEY(roleId),
    FOREIGN KEY (departmentId) REFERENCES department(departmentId)
    
);

--create the employees table with the role.roleId(table.column) as the foreign key. managerId is used as a form of
--a foreign key in the employees table. the managerId can be null
CREATE table employees (
    employeeId INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleId INT NOT NULL,
    PRIMARY KEY(employeeId),
    FOREIGN KEY (roleId) REFERENCES role(roleId),
    managerId INT REFERENCES employees(employeeId)
);

---Insert data into tables
INSERT INTO department (name) values ("Marketing");
INSERT INTO department (name) values ("Customer Support");

INSERT INTO role (title, salary, departmentId) values ("Sales Agent", 35000, 1);
INSERT into employees (firstName, lastName, roleId, managerId) values ('Linda', 'Smith', 1, null);
