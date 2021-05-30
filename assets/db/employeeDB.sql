drop table if exists employee;
drop table if exists role;
drop table if exists department;
drop table if exists manager;
create table employee(
  id int unsigned primary key auto_increment,
  first_name varchar(30) not null,
  last_name varchar(30) not null,
  role_id int unsigned not null references role(id),
  manager_id int unsigned references manager(id)
);
create table role(
  id int unsigned primary key auto_increment,
  title varchar(30) not null unique,
  salary int unsigned not null,
  department_id int unsigned references department(id)
);
create table department(
  id int unsigned primary key auto_increment,
  department_name varchar(30) not null unique
);
create table manager(
  id int unsigned primary key auto_increment,
  manager_name varchar(30)
);