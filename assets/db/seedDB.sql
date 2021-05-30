use employeeDB;
INSERT INTO
  department (department_name)
VALUES
  ('Pharmacy'),
  ('Engineering'),
  ('Finance'),
  ('Bowling');
INSERT INTO
  role (title, salary, department_id)
VALUES
  ('Bowling Manager', 100000, 4),
  ('Bowling Rep', 75000, 4),
  ('Engineering Manager', 160000, 2),
  ('Electrical Engineer', 130000, 2),
  ('Finance Manager', 150000, 3),
  ('Accountant', 110000, 3),
  ('Pharmacist Manager', 190000, 1),
  ('Pharmacist', 140000, 1);
INSERT INTO
  employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Richard', 'Ha', 1, NULL),
  ('Will', 'Grithins', 2, 1),
  ('Tom', 'Shake', 3, NULL),
  ('Daniel', 'Nguyen', 4, 2),
  ('Terry', 'Rainbow', 5, NULL),
  ('Michelle', 'Bottle', 6, 3),
  ('Charizard', 'Orange', 7, NULL),
  ('Pikachu', 'Yellow', 8, 4);
INSERT INTO
  manager (id, manager_name)
VALUES
  ('1', 'Will Grithins'),
  ('2', 'Daniel Nguyen'),
  ('3', 'Michelle Bottle'),
  ('4', 'Pikachu Yellow');