DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT,
  PRODUCT_NAME VARCHAR(100) NOT NULL,
  DEPARTMENT_NAME VARCHAR(30),
  PRICE INTEGER(10),
  STOCK_QUANTITY INTEGER(11),
  PRIMARY KEY (id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("John Mayer Stratocaster", "Music", 1700, 30);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Sennheiser HD 100", "Electronics", 89, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ipad", "Electronics", 300, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("MacBook Pro", "Electronics", 2799, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Away Carry On", "Travel", 200, 400);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Vizio SB2920-C6 Sound Bar", "Electronics", 80, 300);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Dyson V8 Animal", "Appliances", 300, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("University of Illinois Hoody", "Clothing", 20, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("SwissGear Backpack", "Travel", 75, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Keurig Classic K50", "Appliances", 89, 500);

CREATE TABLE department (
  department_id INT NOT NULL AUTO_INCREMENT,
  department_name VARCHAR(100) NOT NULL,
  over_head_costs INT(10) NOT NULL,
  PRIMARY KEY (department_id)
);

INSERT INTO department (department_name, over_head_costs)
VALUES ("Music", 2000);

INSERT INTO department (department_name, over_head_costs)
VALUES ("Electronics", 1000);

INSERT INTO department (department_name, over_head_costs)
VALUES ("Travel", 2000);

INSERT INTO department (department_name, over_head_costs)
VALUES ("Appliances", 1500);

INSERT INTO department (department_name, over_head_costs)
VALUES ("Clothing", 1000);

ALTER TABLE products ADD COLUMN product_sales INT;

SELECT a.`department_id`, a.`department_name`, a.`over_head_costs` FROM department AS a, b.`product_sales` FROM products AS b,
LEFT JOIN b ON a;