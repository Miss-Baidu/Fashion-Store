drop table orders;
drop table customers;
drop table products;

create table customers(
  customer_id int not null AUTO_INCREMENT, 
  name text not null, 
  email text not null, 
  address text not null, 
  phone_number text not null, 
  PRIMARY KEY(customer_id)
);

CREATE TABLE products(
  product_id int not null AUTO_INCREMENT, 
  product_name char(200) not null, 
  price decimal(10, 2) not null, 
  quantity int not null default 0,
  img_src text,
  PRIMARY KEY(product_id)
);

create table orders(
  order_id int not null AUTO_INCREMENT, 
  product_id int not null,
  customer_id int not null,
  PRIMARY KEY(order_id),
  FOREIGN KEY(product_id) REFERENCES products(product_id),
  FOREIGN KEY(customer_id) REFERENCES customers(customer_id)

);
