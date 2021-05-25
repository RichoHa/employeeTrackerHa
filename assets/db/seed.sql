drop database if exists employeeDB;
create database employeeDB;
use employeeDB;
create table employee(
  id integer not null auto_increment,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  title VARCHAR(30) NOT NULL,
  department VARCHAR(30) NOT NULL,
  salary INTEGER(7) NOT NULL,
  manager VARCHAR(30) NULL,
  primary key (id)
);
SELECT
  *
FROM
  employee;
insert into
  employee (
    first_name,
    last_name,
    title,
    department,
    salary,
    manager
  )
values
  (
    "john",
    "Doe",
    "Sales Lead",
    "Sales",
    "100000",
    "Ashley Rodriguez"
  );
insert into
  employee (
    first_name,
    last_name,
    title,
    department,
    salary,
    manager
  )
values
  (
    "Mike",
    "Chan",
    "Salesperson",
    "Sales",
    "80000",
    "John Doe"
  );